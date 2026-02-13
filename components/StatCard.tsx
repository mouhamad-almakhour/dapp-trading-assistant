import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  change,
  icon,
  suffix,
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className="stats-card">
      <CardContent className="px-4 py-0.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </span>
          <div>{icon}</div>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-foreground">{value}</span>
          {suffix && (
            <span className="text-xs text-muted-foreground mb-0.5">
              {suffix}
            </span>
          )}
        </div>

        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 mt-1 text-xs font-medium",
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400",
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </span>
            <span className="text-muted-foreground font-normal ml-1">24h</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
