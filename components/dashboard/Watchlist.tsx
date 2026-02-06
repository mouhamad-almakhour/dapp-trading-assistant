"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, X, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/hooks/useWatchlist";
import { COIN_IDS } from "@/lib/constants";

const AVAILABLE_TOKENS = Object.keys(COIN_IDS);

export function Watchlist() {
  const { watchlist, addToken, removeToken, isWatched } = useWatchlist();
  const [open, setOpen] = useState(false);

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3 flex items-center justify-between">
        <CardTitle className="text-base">Watchlist</CardTitle>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <p className="mb-2 px-1 text-xs text-muted-foreground">Add token</p>
            <div className="grid grid-cols-2 gap-1">
              {AVAILABLE_TOKENS.map((symbol) => {
                const disabled = isWatched(symbol);
                return (
                  <button
                    key={symbol}
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) addToken(symbol);
                      setOpen(false);
                    }}
                    className={cn(
                      "rounded px-2 py-1 text-left text-xs hover:bg-muted transition-colors",
                      disabled && "opacity-40 cursor-not-allowed",
                    )}
                  >
                    {symbol}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className="p-2">
        {watchlist.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            No tokens in watchlist. Click + to add.
          </p>
        ) : (
          <div className="max-h-70 overflow-y-auto space-y-0">
            {watchlist.map((token, i) => {
              const positive = token.change24h >= 0;
              return (
                <div
                  key={token.symbol}
                  className={cn(
                    "group flex items-center justify-between px-1 py-2.5",
                    i !== watchlist.length - 1 && "border-b border-border",
                  )}
                >
                  {/* left */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeToken(token.symbol)}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-red-500" />
                    </button>
                    <div>
                      <p className="text-sm font-semibold">{token.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {token.symbol}
                      </p>
                    </div>
                  </div>

                  {/* right */}
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      $
                      {token.price.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <div
                      className={cn(
                        "flex items-center justify-end gap-0.5 text-xs font-medium",
                        positive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400",
                      )}
                    >
                      {positive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {positive && "+"}
                      {token.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
