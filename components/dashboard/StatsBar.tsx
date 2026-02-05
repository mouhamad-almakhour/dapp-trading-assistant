"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Fuel, DollarSign } from "lucide-react";
import { calculateGasLevel, cn } from "@/lib/utils";
import { StatCard } from "@/components/StatCard";

type StatsBarProps = {
  markets: CoinMarketData[]; // already an array, not wrapped in data
  gas: GasPriceData | null;
};

export function StatsBar({ markets, gas }: StatsBarProps) {
  const formatPrice = (num: number) =>
    num.toLocaleString("en-US", { maximumFractionDigits: 2 });

  // map prices once
  const priceMap: Record<string, CoinMarketData> = {};
  markets.forEach((coin) => {
    priceMap[coin.id] = coin;
  });

  const gasLevel = gas ? calculateGasLevel(gas.standard) : "medium";

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
          priceMap.bitcoin
            ? `$${formatPrice(priceMap.bitcoin.current_price)}`
            : "—"
        }
        change={priceMap.bitcoin?.price_change_percentage_24h}
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* ETH */}
      <StatCard
        title="Ethereum"
        value={
          priceMap.ethereum
            ? `$${formatPrice(priceMap.ethereum.current_price)}`
            : "—"
        }
        change={priceMap.ethereum?.price_change_percentage_24h}
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* Gas */}
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
              {gas ? gas.standard : "—"}
            </span>
            <span className="text-xs text-muted-foreground mb-0.5">Gwei</span>
          </div>

          <div
            className={cn(
              "text-xs font-semibold mt-1 capitalize",
              gasLevelColor[gasLevel],
            )}
          >
            {gas ? gasLevel : "—"}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio */}
      <StatCard
        title="Portfolio"
        value="$12,450"
        change={3.2}
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
}
