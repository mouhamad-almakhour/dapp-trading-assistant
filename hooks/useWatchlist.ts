import { useCallback, useEffect, useState } from "react";
import { COIN_IDS } from "@/lib/constants";
import { getSimplePrice } from "@/lib/actions/coingecko.actions";

export function useWatchlist(defaultTokens: string[] = []): UseWatchlistReturn {
  const [tokens, setTokens] = useState<WatchlistToken[]>(
    // eslint-disable-next-line react-hooks/purity
    defaultTokens.map((s) => ({ symbol: s, addedAt: Date.now() })),
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pricesMap, setPricesMap] = useState<Record<string, any>>({});

  // fetch prices for all tokens in watchlist
  useEffect(() => {
    async function fetchPrices() {
      const ids = tokens
        .map((t) => COIN_IDS[t.symbol.toUpperCase()])
        .filter(Boolean);

      if (!ids.length) return;

      const data = await getSimplePrice(ids);

      setPricesMap(data); // the data format is: { bitcoin: { usd: 12345, usd_24h_change: 0.5, ... } }
    }

    fetchPrices();
  }, [tokens]);

  const watchlist: WatchlistItem[] = tokens.flatMap((token) => {
    const id = COIN_IDS[token.symbol.toUpperCase()];
    if (!id) return [];
    const priceData = pricesMap[id];
    if (!priceData) return [];

    return [
      {
        id,
        symbol: token.symbol.toUpperCase(),
        name: id.replace("-", " "), // simple fallback, or keep a separate name map
        price: priceData.usd,
        change24h: priceData.usd_24h_change,
        volume24h: priceData.usd_24h_vol,
        marketCap: priceData.usd_market_cap,
        addedAt: token.addedAt,
      },
    ];
  });

  const addToken = useCallback((symbol: string) => {
    const upper = symbol.toUpperCase();
    if (!COIN_IDS[upper]) return;
    setTokens((prev) => {
      if (prev.find((t) => t.symbol === upper)) return prev;
      return [...prev, { symbol: upper, addedAt: Date.now() }];
    });
  }, []);

  const removeToken = useCallback((symbol: string) => {
    const upper = symbol.toUpperCase();
    setTokens((prev) => prev.filter((t) => t.symbol !== upper));
    setPricesMap((prev) => {
      const id = COIN_IDS[upper];
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const isWatched = useCallback(
    (symbol: string) => tokens.some((t) => t.symbol === symbol.toUpperCase()),
    [tokens],
  );

  return { tokens, watchlist, addToken, removeToken, isWatched };
}
