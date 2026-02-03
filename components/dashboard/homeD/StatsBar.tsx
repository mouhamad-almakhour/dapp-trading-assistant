"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useGasPrice } from "@/hooks/useGasPrice";
import { TrendingUp, Fuel, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/StatCard";

export function StatsBar() {
  const { prices, loading: priceLoading } = useCryptoPrices(["BTC", "ETH"]);
  const { gas, gasLevel, loading: gasLoading } = useGasPrice();

  const formatPrice = (num: number) =>
    num.toLocaleString("en-US", { maximumFractionDigits: 2 });

  const gasLevelColor = {
    low: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* BTC */}
      <StatCard
        title="Bitcoin"
        value={
          priceLoading ? "—" : `$${formatPrice(prices["BTC"]?.price ?? 0)}`
        }
        change={prices["BTC"]?.change24h}
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* ETH */}
      <StatCard
        title="Ethereum"
        value={
          priceLoading ? "—" : `$${formatPrice(prices["ETH"]?.price ?? 0)}`
        }
        change={prices["ETH"]?.change24h}
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* Gas Price */}
      <Card className="trading-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Gas Price
            </span>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-foreground">
              {gasLoading ? "—" : (gas?.standard ?? "—")}
            </span>
            <span className="text-xs text-muted-foreground mb-0.5">Gwei</span>
          </div>
          <div
            className={cn(
              "text-xs font-semibold mt-1 capitalize",
              gasLevelColor[gasLevel],
            )}
          >
            {gasLoading ? "—" : gasLevel}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio placeholder */}
      <StatCard
        title="Portfolio"
        value="$12,450"
        change={3.2}
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
}
