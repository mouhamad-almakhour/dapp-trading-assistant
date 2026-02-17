export const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Real-Time Gas Tracking",
    description:
      "Monitor Ethereum gas prices in real-time and set custom alerts",
    image: "/images/gas-tracking.png",
  },
  {
    id: 2,
    title: "Token Swap Calculator",
    description: "Calculate Uniswap V2 swaps before connecting your wallet",
    image: "/images/swap-calculator.png",
  },
  {
    id: 3,
    title: "Market Dashboard",
    description: "Live crypto prices and charts powered by TradingView",
    image: "/images/market-dashboard.png",
  },
  {
    id: 4,
    title: "AI Daily Summaries",
    description: "Get personalized market insights delivered to your inbox",
    image: "/images/ai-summaries.png",
  },
];

export const NAV_ITEMS = [{ href: "/search", label: "Search" }];

export const DEFAULT_TICKER_TAPE_SYMBOLS: string[] = [
  "CMCMARKETS:GOLD",
  "BINANCE:LINKUSDT",
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
];

export const COIN_TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  displayMode: "single",
  isTransparent: false,
  disableInterval: false,
  locale: "en",
  width: "100%",
  height: 450,
  interval: "1h",
  largeChartUrl: "",
  showIntervalTabs: true,
});

export const COIN_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: false,
  locale: "en",
  width: "100%",
  height: 464,
  displayMode: "regular",
  largeChartUrl: "",
});

export const COIN_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: false,
  locale: "en",
  width: "100%",
  height: 464,
  displayMode: "regular",
});

export const INITIAL_COINS: Coin[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "tether", symbol: "usdt", name: "Tether" },
  { id: "binancecoin", symbol: "bnb", name: "BNB" },
  { id: "solana", symbol: "sol", name: "Solana" },
  { id: "usd-coin", symbol: "usdc", name: "USDC" },
  { id: "ripple", symbol: "xrp", name: "XRP" },
  { id: "staked-ether", symbol: "steth", name: "Lido Staked Ether" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin" },
  { id: "cardano", symbol: "ada", name: "Cardano" },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche" },
  { id: "tron", symbol: "trx", name: "TRON" },
  { id: "chainlink", symbol: "link", name: "Chainlink" },
  { id: "polkadot", symbol: "dot", name: "Polkadot" },
  { id: "polygon", symbol: "matic", name: "Polygon" },
  { id: "litecoin", symbol: "ltc", name: "Litecoin" },
  { id: "shiba-inu", symbol: "shib", name: "Shiba Inu" },
  { id: "dai", symbol: "dai", name: "Dai" },
  { id: "uniswap", symbol: "uni", name: "Uniswap" },
  { id: "cosmos", symbol: "atom", name: "Cosmos" },
];

export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: false,
  locale: "en",
  width: "100%",
  height: 170,
});

export const MARKET_CRYPTO_WIDGET_CONFIG = {
  defaultColumn: "overview",
  screener_type: "crypto_mkt",
  displayCurrency: "USD",
  colorTheme: "dark",
  isTransparent: false,
  locale: "en",
  width: "100%",
  height: 600,
};

export const HEATMAP_WIDGET_CONFIG = {
  dataSource: "Crypto",
  blockSize: "market_cap_calc",
  blockColor: "24h_close_change|5",
  locale: "en",
  symbolUrl: "",
  colorTheme: "dark",
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: "100%",
  height: "600",
};

export const TOP_STORIES_WIDGET_CONFIG = {
  displayMode: "regular",
  feedMode: "market",
  colorTheme: "dark",
  isTransparent: false,
  locale: "en",
  market: "stock",
  width: "100%",
  height: "600",
};

export const MARKET_OVERVIEW_WIDGET_CONFIG = {
  title: "Crypto Market",
  colorTheme: "dark",
  dateRange: "12M",
  locale: "en",
  largeChartUrl: "",
  isTransparent: false,
  showFloatingTooltip: false,
  plotLineColorGrowing: "rgba(41, 98, 255, 1)",
  plotLineColorFalling: "rgba(41, 98, 255, 1)",
  gridLineColor: "rgba(240, 243, 250, 0)",
  scaleFontColor: "#DBDBDB",
  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
  symbolActiveColor: "rgba(41, 98, 255, 0.12)",
  tabs: [
    {
      title: "Top Market Cap",
      symbols: [
        {
          s: "BINANCE:BTCUSDT",
          d: "Bitcoin",
          "base-currency-logoid": "crypto/XTVCBTC",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:ETHUSDT",
          d: "Ethereum",
          "base-currency-logoid": "crypto/XTVCETH",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:BNBUSDT",
          d: "BNB",
          "base-currency-logoid": "crypto/XTVCBNB",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:SOLUSDT",
          d: "Solana",
          "base-currency-logoid": "crypto/XTVCSOL",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:XRPUSDT",
          d: "XRP",
          "base-currency-logoid": "crypto/XTVCXRP",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:ADAUSDT",
          d: "Cardano",
          "base-currency-logoid": "crypto/XTVCADA",
          "currency-logoid": "crypto/XTVCUSDT",
        },
      ],
      originalTitle: "Crypto",
    },
    {
      title: "Layer 1",
      symbols: [
        {
          s: "BINANCE:AVAXUSDT",
          d: "Avalanche",
          "base-currency-logoid": "crypto/XTVCAVAX",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:DOTUSDT",
          d: "Polkadot",
          "base-currency-logoid": "crypto/XTVCDOT",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:ATOMUSDT",
          d: "Cosmos",
          "base-currency-logoid": "crypto/XTVCATOM",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:NEARUSDT",
          d: "Near",
          "base-currency-logoid": "crypto/XTVCNEAR",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:APTUSDT",
          d: "Aptos",
          "base-currency-logoid": "crypto/XTVCAPTO",
          "currency-logoid": "crypto/XTVCUSDT",
        },
      ],
    },
    {
      title: "DeFi",
      symbols: [
        {
          s: "BINANCE:LINKUSDT",
          d: "Chainlink",
          "base-currency-logoid": "crypto/XTVCLINK",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:UNIUSDT",
          d: "Uniswap",
          "base-currency-logoid": "crypto/XTVCUNI",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:AAVEUSDT",
          d: "Aave",
          "base-currency-logoid": "crypto/XTVCAAVE",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:MKRUSDT_PREMIUM",
          d: "Maker",
          "base-currency-logoid": "crypto/XTVCMKR",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:SNXUSDT",
          d: "Synthetix",
          "base-currency-logoid": "crypto/XTVCSNX",
          "currency-logoid": "crypto/XTVCUSDT",
        },
      ],
    },
    {
      title: "Meme / High Volatility",
      symbols: [
        {
          s: "BINANCE:DOGEUSDT",
          d: "Dogecoin",
          "base-currency-logoid": "crypto/XTVCDOGE",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:SHIBUSDT",
          d: "Shiba Inu",
          "base-currency-logoid": "crypto/XTVCSHIB",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:PEPEUSDT",
          d: "Pepe",
          "base-currency-logoid": "crypto/XTVCPEPE",
          "currency-logoid": "crypto/XTVCUSDT",
        },
        {
          s: "BINANCE:FLOKIUSDT",
          d: "Floki",
          "base-currency-logoid": "crypto/XTVCFLOKI",
          "currency-logoid": "crypto/XTVCUSDT",
        },
      ],
    },
  ],
  support_host: "https://www.tradingview.com",
  width: "100%",
  height: "550",
  showSymbolLogo: true,
  showChart: true,
};

export const GAS_LEVEL_STYLES = {
  low: {
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    label: "Low - Good time to transact",
  },
  medium: {
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    label: "Medium - Normal activity",
  },
  high: {
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    label: "High - Consider waiting",
  },
} as const;

export const GAS_TYPES: GasValueKey[] = ["slow", "standard", "fast"];

export const GAS_TYPE_STYLES: Record<string, string> = {
  slow: "text-green-600 dark:text-green-400",
  standard: "text-yellow-600 dark:text-yellow-400",
  fast: "text-red-600 dark:text-red-400",
};

export const ACTIVITY_TYPES = [
  "swap",
  "alert_triggered",
  "alert_created",
  "alert_deleted",
  "watchlist_added",
] as const;

export const COIN_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  LINK: "chainlink",
  USDC: "usd-coin",
  USDT: "tether",
  DOGE: "dogecoin",
  ADA: "cardano",
  DOT: "polkadot",
  AVAX: "avalanche-2",
  UNI: "uniswap",
};

export const COIN_CHART_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: false,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 10,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const POPULAR_TOKENS: Token[] = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    decimals: 18,
    logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    logoUrl:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
    logoUrl: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  },
  {
    id: "wrapped-bitcoin",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    decimals: 8,
    logoUrl:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "Dai",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    logoUrl: "https://assets.coingecko.com/coins/images/9956/small/4943.png",
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    decimals: 18,
    logoUrl:
      "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    decimals: 18,
    logoUrl:
      "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  },
];
