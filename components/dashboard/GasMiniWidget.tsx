"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel, ArrowRight } from "lucide-react";
import { calculateGasLevel, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/config/routes";
import { GAS_LEVEL_STYLES, GAS_TYPE_STYLES, GAS_TYPES } from "@/lib/constants";

interface GasMiniWidgetProps {
  gas: GasPriceData | null;
}

export function GasMiniWidget({ gas }: GasMiniWidgetProps) {
  const gasLevel = gas ? calculateGasLevel(Number(gas?.standard)) : "medium";
  const levelStyle = GAS_LEVEL_STYLES[gasLevel];

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Fuel className="h-4 w-4 text-primary" />
            Gas Prices (ETH)
          </CardTitle>

          <div className="flex items-center gap-1.5">
            <span
              aria-label="live"
              className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
            />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Gas Level Badge */}
        <span
          className={cn(
            "inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full",
            levelStyle.badge,
          )}
        >
          {gas ? levelStyle.label : "—"}
        </span>

        {/* Gas Prices */}
        <div className="grid grid-cols-3 gap-2">
          {GAS_TYPES.map((type) => (
            <div key={type} className="text-center">
              <p className="text-xs text-muted-foreground capitalize mb-1">
                {type}
              </p>
              <p className={cn("text-lg font-bold", GAS_TYPE_STYLES[type])}>
                {gas ? gas[type] : "—"}
              </p>
              <p className="text-xs text-muted-foreground">gwei</p>
            </div>
          ))}
        </div>

        {/* Link */}
        <Link
          href={ROUTES.SWAP}
          className="flex items-center justify-center gap-1 text-xs text-primary hover:underline pt-1"
        >
          Go to Swap Calculator
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
