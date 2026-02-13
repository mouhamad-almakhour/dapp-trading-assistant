import { ActiveAlerts } from "@/components/ActiveAlerts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { Watchlist } from "@/components/dashboard/Watchlist";
import { TrendingCoinsFallback } from "@/components/market/fallback";
import TrendingCoins from "@/components/TrendingCoins";
import { getMarkets } from "@/lib/actions/coingecko.actions";
import { getGasPrice } from "@/lib/actions/etherscan.actions";
import { Suspense } from "react";

const Dashboard = async () => {
  const [markets, gas] = await Promise.all([
    getMarkets(["BTC", "ETH"]),
    getGasPrice(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Bar */}
      <StatsBar markets={markets.data ?? []} gas={gas} />

      {/* Watchlist + Trending */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Watchlist />
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </div>

      {/* Alerts + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveAlerts gas={gas} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
