"use client";
import { ArrowDownUp, Loader2, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TokenSelector } from "@/components/swap/TokenSelector";
import { SwapQuoteDisplay } from "@/components/swap/SwapQuoteDisplay";
import { POPULAR_TOKENS } from "@/lib/constants";
import { useSwap } from "@/hooks/useSwap";

export default function SwapPage() {
  const {
    fromToken,
    toToken,
    setFromToken,
    setToToken,
    handleFlipTokens,
    inputAmount,
    handleAmountChange,
    quote,
    isLoadingQuote,
    quoteError,
    handleSwap,
    getPriceImpact,
  } = useSwap();

  const priceImpact = getPriceImpact();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">swap</h1>
        <p className="text-muted-foreground mt-1">
          exchange tokens using uniswap v2 liquidity pools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="trading-card-dark">
            <CardHeader>
              <CardTitle>swap tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* from token */}
              <div className="space-y-2">
                <Label>from</Label>
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
                    balance: 0.00 {fromToken.symbol}
                  </p>
                )}
              </div>

              {/* flip button */}
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

              {/* to token */}
              <div className="space-y-2">
                <Label>to</Label>
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
                    balance: 0.00 {toToken.symbol}
                  </p>
                )}
              </div>

              {/* error */}
              {quoteError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{quoteError}</AlertDescription>
                </Alert>
              )}

              {/* swap button */}
              <Button
                onClick={handleSwap}
                disabled={!quote || isLoadingQuote}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {isLoadingQuote ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    getting quote...
                  </>
                ) : !fromToken || !toToken ? (
                  "select tokens"
                ) : !inputAmount || parseFloat(inputAmount) <= 0 ? (
                  "enter amount"
                ) : !quote ? (
                  "enter amount to see quote"
                ) : (
                  "review swap"
                )}
              </Button>

              {/* simulator notice */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>simulator mode:</strong> this is a swap simulator. no
                  wallet connection required. actual swaps would require wallet
                  approval and gas fees.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* sidebar */}
        <div className="space-y-6">
          {quote && (
            <div className="space-y-4">
              <h3 className="font-semibold">swap details</h3>
              <SwapQuoteDisplay quote={quote} priceImpact={priceImpact} />
            </div>
          )}

          {priceImpact >= 3 && (
            <Alert variant="destructive">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>high price impact!</strong>
                <br />
                this swap will significantly move the market price. consider
                splitting into smaller trades.
              </AlertDescription>
            </Alert>
          )}

          <Card className="trading-card">
            <CardHeader>
              <CardTitle className="text-base">how it works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                swaps are executed using uniswap v2 decentralized liquidity
                pools.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>0.3% fee goes to liquidity providers</li>
                <li>slippage tolerance: 0.5%</li>
                <li>route optimized for best price</li>
                <li>gas fees paid in eth</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
