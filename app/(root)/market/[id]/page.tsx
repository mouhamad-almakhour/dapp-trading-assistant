import TradingViewWidget from "@/components/alert/TradingViewWidget";
import { Button } from "@/components/ui/button";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  COIN_CHART_WIDGET_CONFIG,
  COIN_TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COIN_PROFILE_WIDGET_CONFIG,
} from "@/lib/constants";

async function StockDetails({ params }: StockDetailsProps) {
  const { id } = await params;
  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-6">
          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(id)}
            height={170}
          />

          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={COIN_CHART_WIDGET_CONFIG(id)}
            className="custom-chart"
            height={600}
          />
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Button className="yellow-btn w-full mt-5">
              add to Watch list
            </Button>
          </div>

          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={COIN_TECHNICAL_ANALYSIS_WIDGET_CONFIG(id)}
            height={400}
          />

          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}symbol-profile.js`}
            config={COIN_PROFILE_WIDGET_CONFIG(id)}
            height={464}
          />
        </div>
      </section>
    </div>
  );
}

export default StockDetails;
