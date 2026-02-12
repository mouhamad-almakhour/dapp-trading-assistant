/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { ArrowDownUp, Loader2, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TokenSelector } from "@/components/swap/TokenSelector";
import { SwapQuoteDisplay } from "@/components/swap/SwapQuoteDisplay";
import { POPULAR_TOKENS } from "@/lib/constants";
import { getSwapQuote } from "@/lib/actions/eth-swap.actions";

/**
 * Professional Swap Page
 * Allows users to simulate token swaps using Uniswap V2
 * Shows real quotes with fees, price impact, and routing
 */
export default function SwapPage() {
  // Token selection state
  const [fromToken, setFromToken] = useState<Token | null>(POPULAR_TOKENS[0]); // Default: ETH
  const [toToken, setToToken] = useState<Token | null>(POPULAR_TOKENS[1]); // Default: USDC

  // Input amount state
  const [inputAmount, setInputAmount] = useState("");

  // Quote state
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  /**
   * Fetch swap quote from backend
   */
  const fetchQuote = async () => {
    if (!fromToken || !toToken || !inputAmount) return;

    setIsLoadingQuote(true);
    setQuoteError(null);

    const response = await getSwapQuote({
      fromTokenAddress: fromToken.address,
      toTokenAddress: toToken.address,
      amountIn: inputAmount,
    });

    if (response.success && response.data) {
      setQuote(response.data);
      console.log(response.data);
    } else {
      setQuoteError(response.error || "Failed to get quote");
      setQuote(null);
    }

    setIsLoadingQuote(false);
  };

  // Auto-fetch quote when inputs change (debounced)
  useEffect(() => {
    // Don't fetch if missing required data
    if (
      !fromToken ||
      !toToken ||
      !inputAmount ||
      parseFloat(inputAmount) <= 0
    ) {
      setQuote(null);
      return;
    }

    // Debounce quote fetching (wait 500ms after user stops typing)
    const timeout = setTimeout(() => {
      fetchQuote();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fromToken, toToken, inputAmount]);

  /**
   * Swap from and to tokens
   */
  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  /**
   * Handle input amount change
   */
  const handleAmountChange = (value: string) => {
    // Allow only numbers and single decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };

  /**
   * Simulate swap (visual only - no actual transaction)
   */
  const handleSwap = () => {
    if (!quote) return;

    // In a real app, this would trigger wallet connection and transaction
    // For simulator, just show success message
    alert(
      `Swap simulated successfully!\n\nYou would receive approximately ${quote.amountOutFormatted} ${quote.toToken.symbol}`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Swap</h1>
        <p className="text-muted-foreground mt-1">
          Exchange tokens using Uniswap V2 liquidity pools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Swap Card */}
        <div className="lg:col-span-2">
          <Card className="trading-card-dark">
            <CardHeader>
              <CardTitle>Swap Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From Token Section */}
              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="0.0"
                      value={inputAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="text-2xl font-bold h-14"
                    />
                  </div>
                  <TokenSelector
                    selectedToken={fromToken}
                    tokens={POPULAR_TOKENS}
                    onSelect={setFromToken}
                    disabledToken={toToken}
                  />
                </div>
                {fromToken && (
                  <p className="text-xs text-muted-foreground">
                    Balance: 0.00 {fromToken.symbol}
                  </p>
                )}
              </div>

              {/* Flip Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFlipTokens}
                  className="rounded-full border border-border hover:bg-muted"
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>

              {/* To Token Section */}
              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="0.0"
                      value={quote?.amountOutFormatted || ""}
                      readOnly
                      className="text-2xl font-bold h-14 bg-muted/50"
                    />
                    {isLoadingQuote && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <TokenSelector
                    selectedToken={toToken}
                    tokens={POPULAR_TOKENS}
                    onSelect={setToToken}
                    disabledToken={fromToken}
                  />
                </div>
                {toToken && quote && (
                  <p className="text-xs text-muted-foreground">
                    Balance: 0.00 {toToken.symbol}
                  </p>
                )}
              </div>

              {/* Error Alert */}
              {quoteError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{quoteError}</AlertDescription>
                </Alert>
              )}

              {/* Swap Button */}
              <Button
                onClick={handleSwap}
                disabled={!quote || isLoadingQuote}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {isLoadingQuote ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Getting quote...
                  </>
                ) : !fromToken || !toToken ? (
                  "Select tokens"
                ) : !inputAmount || parseFloat(inputAmount) <= 0 ? (
                  "Enter amount"
                ) : !quote ? (
                  "Enter amount to see quote"
                ) : (
                  "Review Swap"
                )}
              </Button>

              {/* Simulator Notice */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Simulator Mode:</strong> This is a swap simulator. No
                  wallet connection required. Actual swaps would require wallet
                  approval and gas fees.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Quote Details Sidebar */}
        <div className="space-y-6">
          {/* Quote Details */}
          {quote && (
            <div className="space-y-4">
              <h3 className="font-semibold">Swap Details</h3>
              <SwapQuoteDisplay quote={quote} />
            </div>
          )}

          {/* Price Impact Warning */}
          {quote &&
            (() => {
              const reserve0 = parseFloat(quote.reserves.reserve0);
              const reserve1 = parseFloat(quote.reserves.reserve1);
              const amountIn = parseFloat(quote.amountIn);
              const currentPrice = reserve1 / reserve0;
              const newReserve0 = reserve0 + amountIn;
              const newReserve1 = reserve1 - parseFloat(quote.amountOut);
              const newPrice = newReserve1 / newReserve0;
              const priceImpact = Math.abs(
                ((newPrice - currentPrice) / currentPrice) * 100,
              );

              return (
                priceImpact >= 3 && (
                  <Alert variant="destructive">
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>High price impact!</strong>
                      <br />
                      This swap will significantly move the market price.
                      Consider splitting into smaller trades.
                    </AlertDescription>
                  </Alert>
                )
              );
            })()}

          {/* Info Card */}
          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-base">How it works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Swaps are executed using Uniswap V2 decentralized liquidity
                pools.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>0.3% fee goes to liquidity providers</li>
                <li>Slippage tolerance: 0.5%</li>
                <li>Route optimized for best price</li>
                <li>Gas fees paid in ETH</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
