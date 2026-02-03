declare global {
  interface Feature {
    id: number;
    title: string;
    description: string;
    image: string;
  }

  interface TradingViewWidgetProps {
    title: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
  }

  interface TickerTapeProps {
    symbols: string[]; // Array of TradingView symbol strings (required)
    className?: string;
    theme?: "light" | "dark";
  }

  interface CoinGeckoErrorBody {
    error?: string;
  }

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    accept?: string;
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  type SignInFormData = {
    email: string;
    password: string;
    rememberMe?: boolean;
  };

  type SignUpFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    image?: FileList;
  };
  type ForgetPasswordFormValues = {
    email: string;
    hostname?: string;
  };
  type ResetPasswordFormValues = {
    password: string;
    passwordConfirmation: string;
  };
  type SendEmailValues = {
    name: string;
    email: string;
    subject: string;
    url: string;
    htmlTemplate: string;
  };

  type SignUpServerData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: string; // base64 string
  };

  type SignInServerData = {
    email: string;
    password: string;
    rememberMe?: boolean;
  };
  type ForgetPasswordServerData = {
    email: string;
    hostname?: string;
  };

  type ResetPasswordServerData = {
    token?: string;
    password: string;
  };

  // Stock/Crypto asset interface and test data
  type StockAsset = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
    isInWatchlist: boolean;
  };

  type QueryParams = Record<string, string | number | boolean | undefined>;

  type ISODateString = string;
  type Nullable<T> = T | null;

  interface CoinMarketData {
    id: string;
    symbol: string;
    name: string;
    image: string;

    current_price: number;
    market_cap: number;
    market_cap_rank: number;

    fully_diluted_valuation: number;
    total_volume: number;

    high_24h: number;
    low_24h: number;

    price_change_24h: number;
    price_change_percentage_24h: number;

    circulating_supply: number;
    total_supply: Nullable<number>;
    max_supply: Nullable<number>;

    ath: number;
    ath_change_percentage: number;

    last_updated: ISODateString;
  }

  interface MarketChartData {
    prices: [timestamp: number, price: number][];
    market_caps: [timestamp: number, marketCap: number][];
    total_volumes: [timestamp: number, volume: number][];
  }

  interface CoinDetailsData {
    id: string;
    symbol: string;
    name: string;

    description: {
      en: string;
    };

    image: {
      thumb: string;
      small: string;
      large: string;
    };

    market_cap_rank: number;

    market_data: {
      current_price: Record<string, number>;
      market_cap: Record<string, number>;
      total_volume: Record<string, number>;

      high_24h: Record<string, number>;
      low_24h: Record<string, number>;

      price_change_percentage_24h: number;
      price_change_percentage_7d: number;
      price_change_percentage_30d: number;

      circulating_supply: number;
      total_supply: Nullable<number>;
      max_supply: Nullable<number>;

      ath: Record<string, number>;
      ath_change_percentage: Record<string, number>;
      ath_date: Record<string, ISODateString>;

      atl: Record<string, number>;
      atl_change_percentage: Record<string, number>;
      atl_date: Record<string, ISODateString>;
    };

    last_updated: ISODateString;
  }

  interface TrendingResponse {
    coins: {
      item: TrendingCoin;
    }[];
  }

  interface TrendingCoin {
    item: {
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      large: string;
      data: {
        price: number;
        price_change_percentage_24h: {
          usd: number;
        };
      };
    };
  }
  interface GlobalMarketResponse {
    data: GlobalMarketData;
  }

  interface GlobalMarketData {
    active_cryptocurrencies: number;
    markets: number;

    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;

    market_cap_percentage: {
      btc: number;
      eth: number;
      [key: string]: number;
    };

    market_cap_change_percentage_24h_usd: number;

    updated_at: number;
  }

  interface SimplePriceResponse {
    [coinId: string]: {
      usd: number;
      usd_24h_change?: number;
    };
  }

  interface CryptoPrice {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
  }

  interface UseCryptoPricesReturn {
    prices: Record<string, CryptoPrice>;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }

  interface StatsBarItem {
    label: string;
    value: number | string;
    change?: number;
    icon?: string;
  }

  interface GasData {
    slow: number;
    standard: number;
    fast: number;
    level: "low" | "medium" | "high";
  }
  interface WatchlistItem {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
  }
  interface Alert {
    id: string;
    type: "gas";
    condition: "below" | "above";
    threshold: number;
    active: boolean;
    triggered: boolean;
    createdAt: number;
    lastTriggeredAt: number | null;
  }
  interface UseAlertsReturn {
    alerts: Alert[];
    activeAlerts: Alert[];
    loading: boolean;
    error: string | null;
    addAlert: (threshold: number, condition: "below" | "above") => void;
    removeAlert: (id: string) => void;
    toggleAlert: (id: string) => void;
  }

  type ActivityType =
    | "swap"
    | "alert_triggered"
    | "alert_created"
    | "watchlist_added";

  interface Activity {
    id: string;
    type: ActivityType;
    message: string;
    details?: string;
    createdAt: number;
  }

  interface UseActivityReturn {
    activities: Activity[];
    addActivity: (
      type: ActivityType,
      message: string,
      details?: string,
    ) => void;
    clearActivities: () => void;
  }

  interface DataTableColumn<T> {
    header: React.ReactNode;
    cell: (row: T, index: number) => React.ReactNode;
    headClassName?: string;
    cellClassName?: string;
  }
  interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    rowKey: (row: T, index: number) => React.Key;
    tableClassName?: string;
    headerClassName?: string;
    headerRowClassName?: string;
    headerCellClassName?: string;
    bodyRowClassName?: string;
    bodyCellClassName?: string;
  }

  interface Category {
    name: string;
    top_3_coins: string[];
    market_cap_change_24h: number;
    market_cap: number;
    volume_24h: number;
  }
  interface GasPriceData {
    slow: number;
    standard: number;
    fast: number;
    level: number;
    updatedAt: number;
  }

  type GasLevel = "low" | "medium" | "high";

  interface UseGasPriceReturn {
    gas: GasPriceData | null;
    gasLevel: GasLevel;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }

  interface GlobalMarket {
    data: {
      active_cryptocurrencies: number;
      btc_dominance: number;
      eth_dominance: number;
      total_market_cap: { usd: number };
      total_24hr_volume: { usd: number };
      market_cap_change_percentage_24hr: number;
    };
  }

  interface WatchlistToken {
    symbol: string;
    addedAt: number;
  }

  interface WatchlistItem extends CryptoPrice {
    addedAt: number;
  }

  interface UseWatchlistReturn {
    watchlist: WatchlistItem[];
    loading: boolean;
    addToken: (symbol: string) => void;
    removeToken: (symbol: string) => void;
    isWatched: (symbol: string) => boolean;
  }

  interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    icon: React.ReactNode;
    suffix?: string;
  }
}
export {};
