import TickerTape from "@/components/market/TickerTape";
import TradingViewWidget from "@/components/market/TradingViewWidget";
import {
  DEFAULT_TICKER_TAPE_SYMBOLS,
  HEATMAP_WIDGET_CONFIG,
  MARKET_CRYPTO_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
const Market = () => {
  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className=" min-h-screen home-wrapper py-6">
      {/* Ticker */}
      <div className="mx-auto w-[90%] mb-6">
        <TickerTape symbols={DEFAULT_TICKER_TAPE_SYMBOLS} theme="dark" />
      </div>

      {/* Section 1 */}
      <section className="home-section">
        <div className="col-span-3 md:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
          />
        </div>
        <div className="col-span-3 md:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="home-section">
        <div className="col-span-3 md:col-span-1">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="w-full min-h-125"
            height={600}
            title={""}
          />
        </div>
        <div className="col-span-3 md:col-span-2">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}screener.js`}
            config={MARKET_CRYPTO_WIDGET_CONFIG}
            height={600}
            className="w-full min-h-125"
            title={"Crypto Market"}
          />
        </div>
      </section>
    </div>
  );
};

export default Market;
