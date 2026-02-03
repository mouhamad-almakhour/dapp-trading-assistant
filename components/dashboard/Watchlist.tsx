"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Plus, X, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const AVAILABLE_TOKENS = [
  "BTC",
  "ETH",
  "SOL",
  "LINK",
  "USDC",
  "USDT",
  "WBTC",
  "DOGE",
  "ADA",
  "DOT",
];

export function Watchlist() {
  const { watchlist, loading, addToken, removeToken, isWatched } =
    useWatchlist();
  const [open, setOpen] = useState(false);

  const formatPrice = (num: number) =>
    num.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Watchlist</CardTitle>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="end">
              <p className="text-xs text-muted-foreground mb-2 px-1">
                Add token
              </p>
              <div className="grid grid-cols-2 gap-1">
                {AVAILABLE_TOKENS.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => {
                      if (!isWatched(symbol)) addToken(symbol);
                      setOpen(false);
                    }}
                    disabled={isWatched(symbol)}
                    className={cn(
                      "text-left text-xs px-2 py-1 rounded hover:bg-muted transition-colors",
                      isWatched(symbol) && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="spinner h-5 w-5" />
          </div>
        ) : (
          <div className="space-y-0">
            {watchlist.map((token, i) => {
              const isPositive = token.change24h >= 0;
              return (
                <div
                  key={token.symbol}
                  className={cn(
                    "group flex items-center justify-between py-2.5 px-1",
                    i !== watchlist.length - 1 && "border-b border-border",
                  )}
                >
                  {/* Symbol + Name */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeToken(token.symbol)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-red-500" />
                    </button>
                    <div>
                      <p className="text-sm font-semibold">{token.symbol}</p>
                      <p className="text-xs text-muted-foreground">
                        {token.name}
                      </p>
                    </div>
                  </div>

                  {/* Price + Change */}
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ${formatPrice(token.price)}
                    </p>
                    <div
                      className={cn(
                        "flex items-center justify-end gap-0.5 text-xs font-medium",
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400",
                      )}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {isPositive ? "+" : ""}
                      {token.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}

            {watchlist.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">
                No tokens in watchlist. Click + to add.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
