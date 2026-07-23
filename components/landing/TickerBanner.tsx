import { DEFAULT_TICKER_TAPE_SYMBOLS } from "@/lib/constants";
import TickerTape from "../market/TickerTape";

const tickers = [
  { symbol: "ETH/USDT", price: "$3,421.58", change: "+2.34%", up: true },
  { symbol: "BTC/USDT", price: "$67,832.10", change: "+1.12%", up: true },
  { symbol: "UNI/USDT", price: "$8.74", change: "-0.87%", up: false },
  { symbol: "LINK/USDT", price: "$18.32", change: "+3.41%", up: true },
  { symbol: "MATIC/USDT", price: "$0.9124", change: "-1.23%", up: false },
  { symbol: "ARB/USDT", price: "$1.07", change: "+4.82%", up: true },
  { symbol: "OP/USDT", price: "$2.31", change: "+0.55%", up: true },
  { symbol: "AAVE/USDT", price: "$104.20", change: "-2.10%", up: false },
  { symbol: "GAS", price: "18 Gwei", change: "SAFE", up: true },
];

export default function TickerBanner() {
  const doubled = [...tickers, ...tickers];

  return (
    <div
      className="w-full overflow-hidden border-y border-border/40 bg-card/60 backdrop-blur-sm py-2.5"
      aria-label="Live crypto price ticker"
    >
      <TickerTape symbols={DEFAULT_TICKER_TAPE_SYMBOLS} theme="dark" />
    </div>
  );
}
