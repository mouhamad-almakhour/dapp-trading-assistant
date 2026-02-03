"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSwap, POPULAR_TOKENS } from "@/hooks/useSwap";
import { ArrowDown, ArrowRight, Loader2 } from "lucide-react";
import { ROUTES } from "@/lib/config/routes";

function TokenSelector({
  token,
  onSelect,
}: {
  token: { symbol: string } | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (token: any) => void;
}) {
  return (
    <select
      className="bg-muted text-foreground text-sm font-semibold rounded-md px-2 py-1 border-0 cursor-pointer focus:outline-none"
      value={token?.symbol ?? ""}
      onChange={(e) => {
        const selected = POPULAR_TOKENS.find(
          (t) => t.symbol === e.target.value,
        );
        if (selected) onSelect(selected);
      }}
    >
      {POPULAR_TOKENS.map((t) => (
        <option key={t.symbol} value={t.symbol}>
          {t.symbol}
        </option>
      ))}
    </select>
  );
}

export function QuickSwapCard() {
  const {
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    loading,
    error,
    setInputToken,
    setOutputToken,
    setInputAmount,
    swapTokens,
    calculate,
  } = useSwap();

  // Auto-calculate on input change
  useEffect(() => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return;
    const timeout = setTimeout(() => calculate(), 600);
    return () => clearTimeout(timeout);
  }, [inputAmount, inputToken, outputToken, calculate]);

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Swap</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Input Token */}
        <div className="bg-muted rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">You Pay</span>
            <TokenSelector token={inputToken} onSelect={setInputToken} />
          </div>
          <Input
            type="number"
            placeholder="0.0"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="bg-transparent border-0 text-lg font-bold p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapTokens}
            className="bg-card border border-border rounded-full p-1.5 hover:bg-muted transition-colors"
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Output Token */}
        <div className="bg-muted rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">You Get</span>
            <TokenSelector token={outputToken} onSelect={setOutputToken} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {loading ? "..." : outputAmount || "0.0"}
            </span>
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-500">{error}</p>}

        {/* Links */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={calculate}
            disabled={loading || !inputAmount}
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
            Calculate
          </Button>
          <Link
            href={ROUTES.SWAP}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Full Swap
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
