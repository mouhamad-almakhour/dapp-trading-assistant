import { ActiveAlerts } from "@/components/dashboard/ActiveAlerts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { Watchlist } from "@/components/dashboard/Watchlist";
import { TrendingCoinsFallback } from "@/components/market/fallback";
import TrendingCoins from "@/components/market/TrendingCoins";
import { getGasPrice, getMarkets } from "@/lib/actions/coingecko.actions";
import { Suspense } from "react";

const Dashboard = async () => {
  const [markets, gas] = await Promise.all([
    getMarkets(["BTC", "ETH"]),
    getGasPrice(),
  ]);

  return (
    <div className="space-y-6">
      {/* 1. Stats Bar - top */}
      <StatsBar markets={markets.data ?? []} gas={gas} />
      {/* <GasMiniWidget gas={gas} /> */}

      {/* 2. Gas + Quick Swap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Watchlist />
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </div>

      {/* 4. Watchlist + Active Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveAlerts gas={gas} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
