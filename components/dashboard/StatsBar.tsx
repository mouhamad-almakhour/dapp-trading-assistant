"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Fuel, ArrowRight } from "lucide-react";
import { calculateGasLevel, cn } from "@/lib/utils";
import { StatCard } from "@/components/StatCard";
import { ROUTES } from "@/lib/config/routes";
import Link from "next/link";
import Image from "next/image";
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
        icon={
          <Image
            src={priceMap.bitcoin.image}
            alt={priceMap.bitcoin.name}
            width={32}
            height={32}
          />
        }
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
        icon={
          <Image
            src={priceMap.ethereum.image}
            alt={priceMap.ethereum.name}
            width={32}
            height={32}
          />
        }
      />

      {/* Gas */}
      <Card className="stats-card">
        <CardContent className="p-4 py-0.5">
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
              "mt-1 flex items-center justify-between text-xs font-semibold capitalize",
              gasLevelColor[gasLevel],
            )}
          >
            {gas ? gasLevel : "—"}

            {/* Link */}
            <Link
              href={ROUTES.GAS_TRACKER}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Gas Tracker
              <ArrowRight className="h-3 w-3" />
            </Link>
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
