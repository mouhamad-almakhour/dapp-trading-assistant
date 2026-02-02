import TickerTape from "@/components/TickerTape";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  COIN_TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  MARKET_CRYPTO_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  DEFAULT_TICKER_TAPE_SYMBOLS,
} from "@/lib/constants";

const Dashboard = () => {
  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={COIN_TECHNICAL_ANALYSIS_WIDGET_CONFIG("BINANCE:ETHUSD")}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Bitcoin Price"
            scriptUrl={`${scriptUrl}single-quote.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG("COINBASE:BTCUSD")}
            height={600}
          />
          <div className="h-full md:col-span-1 xl:col-span-2 mt-10">
            <TickerTape symbols={DEFAULT_TICKER_TAPE_SYMBOLS} theme="dark" />
          </div>
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
            title={""}
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}screener.js`}
            config={MARKET_CRYPTO_WIDGET_CONFIG}
            height={600}
            title={"Crypto Market"}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
