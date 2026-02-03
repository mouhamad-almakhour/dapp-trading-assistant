import { useState, useCallback } from "react";
import { useCryptoPrices } from "./useCryptoPrices";
import { DEFAULT_WATCHLIST } from "@/lib/constants";

export function useWatchlist(): UseWatchlistReturn {
  const [tokens, setTokens] = useState<WatchlistToken[]>(DEFAULT_WATCHLIST);
  const symbols = tokens.map((t) => t.symbol);

  // Reuse crypto prices hook to get live prices
  const { prices, loading } = useCryptoPrices(symbols);

  // Merge watchlist with live prices
  const watchlist: WatchlistItem[] = tokens
    .map((token) => {
      const price = prices[token.symbol];
      if (!price) return null;
      return { ...price, addedAt: token.addedAt };
    })
    .filter(Boolean) as WatchlistItem[];

  const addToken = useCallback((symbol: string) => {
    const normalized = symbol.toUpperCase();
    setTokens((prev) => {
      if (prev.find((t) => t.symbol === normalized)) return prev;
      return [...prev, { symbol: normalized, addedAt: Date.now() }];
    });
  }, []);

  const removeToken = useCallback((symbol: string) => {
    const normalized = symbol.toUpperCase();
    setTokens((prev) => prev.filter((t) => t.symbol !== normalized));
  }, []);

  const isWatched = useCallback(
    (symbol: string) => !!tokens.find((t) => t.symbol === symbol.toUpperCase()),
    [tokens],
  );

  return { watchlist, loading, addToken, removeToken, isWatched };
}
