"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGasPrice } from "@/hooks/useGasPrice";
import { Fuel, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/config/routes";
import { GAS_LEVEL_STYLES, GAS_TYPE_STYLES, GAS_TYPES } from "@/lib/constants";

export function GasMiniWidget() {
  const { gas, gasLevel, loading, error } = useGasPrice();
  const levelStyle = GAS_LEVEL_STYLES[gasLevel];

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Fuel className="h-4 w-4 text-primary" />
            Gas Prices
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-16">
            <div className="spinner h-5 w-5" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <>
            {/* Gas Level Badge */}
            <span
              className={cn(
                "inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full",
                levelStyle.badge,
              )}
            >
              {levelStyle.label}
            </span>

            {/* Gas Prices Row */}
            <div className="grid grid-cols-3 gap-2">
              {GAS_TYPES.map((type) => (
                <div key={type} className="text-center">
                  <p className="text-xs text-muted-foreground capitalize mb-1">
                    {type}
                  </p>
                  <p className={cn("text-lg font-bold", GAS_TYPE_STYLES[type])}>
                    {gas?.[type] ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">gwei</p>
                </div>
              ))}
            </div>
            {/* Link to Full Page */}
            <Link
              href={ROUTES.GAS_TRACKER}
              className="flex items-center justify-center gap-1 text-xs text-primary hover:underline pt-1"
            >
              View Full Gas Tracker
              <ArrowRight className="h-3 w-3" />
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
