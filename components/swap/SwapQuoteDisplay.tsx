"use client";

import { Info, TrendingDown, Database, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SwapQuoteDisplayProps {
  /** Swap quote data from backend */
  quote: SwapQuote;
  priceImpact: number;
}

/**
 * Displays detailed swap quote information
 * Shows exchange rate, reserves, and pair details
 */
export function SwapQuoteDisplay({
  quote,
  priceImpact,
}: SwapQuoteDisplayProps) {
  // Calculate exchange rate
  const exchangeRate =
    parseFloat(quote.amountOutFormatted) / parseFloat(quote.amountInFormatted);

  // Determine price impact severity
  const getPriceImpactColor = (impact: number) => {
    if (impact < 1) return "text-green-600 dark:text-green-400";
    if (impact < 3) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  // Calculate LP fee (0.3% of input)
  const lpFee = (parseFloat(quote.amountInFormatted) * 0.003).toFixed(6);

  // Format reserves for display
  const formatReserve = (reserve: string, decimals: number) => {
    const value = parseFloat(reserve) / Math.pow(10, decimals);
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <Card className="trading-card">
      <CardContent className="p-4 space-y-3">
        {/* Exchange Rate */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Rate</span>
          <span className="font-medium">
            1 {quote.fromToken.symbol} = {exchangeRate.toFixed(6)}{" "}
            {quote.toToken.symbol}
          </span>
        </div>

        {/* Output Amount */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">You receive</span>
          <span className="font-semibold text-base">
            {quote.amountOutFormatted} {quote.toToken.symbol}
          </span>
        </div>

        {/* Price Impact */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Price impact</span>
          </div>
          <span
            className={cn("font-semibold", getPriceImpactColor(priceImpact))}
          >
            ~{priceImpact.toFixed(2)}%
          </span>
        </div>

        {/* Liquidity Provider Fee */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">LP fee (0.3%)</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Uniswap V2 charges a 0.3% fee on all swaps. This fee goes to
                    liquidity providers.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="font-medium">
            {lpFee} {quote.fromToken.symbol}
          </span>
        </div>

        {/* Pair Address */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-start gap-2 text-sm">
            <Package className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <div className="text-muted-foreground mb-1">Pair contract</div>
              <div className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                {quote.pairAddress}
              </div>
            </div>
          </div>
        </div>

        {/* Reserves */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-start gap-2 text-sm">
            <Database className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="text-muted-foreground mb-1">Pool reserves</div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {quote.fromToken.symbol}:
                </span>
                <span className="font-medium">
                  {formatReserve(
                    quote.reserves.reserve0,
                    quote.fromToken.decimals,
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {quote.toToken.symbol}:
                </span>
                <span className="font-medium">
                  {formatReserve(
                    quote.reserves.reserve1,
                    quote.toToken.decimals,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
