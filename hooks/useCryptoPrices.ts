import { useEffect, useState, useCallback } from "react";
import { getMarkets } from "@/lib/actions/coingecko.actions";
import { COIN_IDS } from "@/lib/constants";

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export interface UseCryptoPricesReturn {
  prices: Record<string, CryptoPrice>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCryptoPrices(
  symbols: string[] = ["BTC", "ETH"],
  interval = 60000,
): UseCryptoPricesReturn {
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await getMarkets(symbols);

      if (!data) {
        setError(error);
        setLoading(false);
        return;
      }

      const mapped: Record<string, CryptoPrice> = {};
      data.forEach((coin) => {
        const symbol = Object.keys(COIN_IDS).find(
          (k) => COIN_IDS[k] === coin.id,
        );
        if (symbol) {
          mapped[symbol] = {
            symbol,
            name: coin.name,
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            volume24h: coin.total_volume,
            marketCap: coin.market_cap,
          };
        }
      });

      setPrices(mapped);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "failed to fetch gas price",
      );
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchPrices();
    const timer = setInterval(fetchPrices, interval);
    return () => clearInterval(timer);
  }, []);

  return { prices, loading, error, refetch: fetchPrices };
}
