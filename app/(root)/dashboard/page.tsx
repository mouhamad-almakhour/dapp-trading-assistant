import { ActiveAlerts } from "@/components/dashboard/ActiveAlerts";
import { GasMiniWidget } from "@/components/dashboard/GasMiniWidget";
import { QuickSwapCard } from "@/components/dashboard/QuickSwapCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { Watchlist } from "@/components/dashboard/Watchlist";

const Dashboard = async () => {
  return (
    <div className="space-y-6">
      {/* 1. Stats Bar - top */}
      <StatsBar />

      {/* 2. Gas + Quick Swap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Watchlist />
        <QuickSwapCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GasMiniWidget />
      </div>

      {/* 3. YOUR EXISTING TradingView widgets go here */}
      {/* 
        <section className="grid w-full gap-8 home-section">
          ... your existing TradingView code ...
        </section>
      */}

      {/* 4. Watchlist + Active Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveAlerts />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
