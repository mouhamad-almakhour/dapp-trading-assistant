"use server";

import qs from "query-string";
import { COIN_IDS } from "../constants";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url");
if (!COINGECKO_API_KEY) throw new Error("Could not get api key");

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": COINGECKO_API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText} `,
    );
  }

  return response.json();
}

// ─── CoinGecko ID Mapping ─────────────────────────────────

// Helper: symbol → coingecko id
export async function getCoinId(symbol: string): Promise<string | undefined> {
  return COIN_IDS[symbol.toUpperCase()];
}

// Helper: multiple symbols → coingecko ids string "bitcoin,ethereum"
export async function getCoinIdsCSV(_symbols: string[]): Promise<string> {
  const results = await Promise.all(_symbols.map((s) => getCoinId(s)));

  // filter out undefined and join with comma
  return results.filter(Boolean).join(",");
}

// ─── API Calls ────────────────────────────────────────────

/**
 * Get market prices for multiple coins
 * @example getMarkets(["BTC", "ETH", "SOL"])
 */
export async function getMarkets(
  symbols: string[],
  currency = "usd",
  perPage = 10,
) {
  const ids = await getCoinIdsCSV(symbols);
  if (!ids) return { data: null, error: "No valid coin IDs", status: 0 };
  const coinsData = await fetcher<CoinMarketData[]>(
    "/coins/markets",
    {
      vs_currency: currency,
      ids,
      order: "market_cap_desc",
      per_page: perPage,
      sparkline: false,
    },
    300,
  );
  return { data: coinsData, error: "", status: 1 };
}

/**
 * Get detailed info for a single coin
 * @example getCoinDetails("bitcoin")
 */
export async function getCoinDetails(coinId: string) {
  return await fetcher<CoinDetailsData>(
    `/coins/${coinId}`,
    {
      localization: false,
      tickers: false,
      community_data: false,
      developer_data: false,
      dex_pair_format: "symbol",
    },
    300,
  );
}

/**
 *
 * This endpoint allows you to query all the coins categories on CoinGecko
 */
export async function getCategoriesWithMarketData() {
  return await fetcher<Category[]>("/coins/categories", undefined, 300);
}
/**
 * Get price chart history
 * @example getMarketChart("bitcoin", 7)  // last 7 days
 */
export async function getMarketChart(coinId: string, days: number | "max" = 7) {
  return await fetcher<MarketChartData>(
    `/coins/${coinId}/market_chart`,
    {
      vs_currency: "usd",
      days,
      interval: days === 1 ? "minutes" : "hourly",
    },
    300,
  );
}

export async function fetchCoinsList(): Promise<Coin[]> {
  return fetcher<Coin[]>("/coins/list", undefined, 3600);
}

/**
 * Get trending coins (top 50 last 24h)
 */
export async function getTrendingCoins() {
  const coinsList = await fetcher<TrendingResponse>(
    "/search/trending",
    undefined,
    300,
  );
  return coinsList.coins;
}

export async function getSupportedCurrenciesList() {
  const coinList: string[] = await fetcher<string[]>(
    "/simple/supported_vs_currencies",
    undefined,
    86400,
  );

  return coinList;
}

/**
 * Get global crypto market data
 */
export async function getGlobalMarket() {
  return await fetcher<GlobalMarket>("/global", undefined, 300);
}

/**
 * Get simple price for one or more coins
 * @example getSimplePrice(["bitcoin", "ethereum"])
 */
export async function getSimplePrice(coinIds: string[], currency = "usd") {
  return await fetcher<SimplePriceResponse>("/simple/price", {
    ids: coinIds.join(","),
    vs_currencies: currency,
    include_24hr_change: true,
    include_market_cap: true,
    include_24hr_vol: true,
    include_last_updated_at: true,
  });
}
