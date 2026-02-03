"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAlerts } from "@/hooks/useAlerts";
import { Bell, ArrowRight, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/config/routes";

export function ActiveAlerts() {
  const { activeAlerts, loading } = useAlerts();

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            Active Alerts
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {activeAlerts.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="spinner h-5 w-5" />
          </div>
        ) : (
          <div className="space-y-0">
            {activeAlerts.map((alert, i) => (
              <div
                key={alert.id}
                className={cn(
                  "flex items-center justify-between py-2.5 px-1",
                  i !== activeAlerts.length - 1 && "border-b border-border",
                )}
              >
                {/* Icon + Info */}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded-md",
                      alert.triggered
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-muted",
                    )}
                  >
                    <Fuel
                      className={cn(
                        "h-4 w-4",
                        alert.triggered
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Gas {alert.condition} {alert.threshold} gwei
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert.lastTriggeredAt
                        ? `Last triggered ${formatTimeAgo(alert.lastTriggeredAt)}`
                        : "Not triggered yet"}
                    </p>
                  </div>
                </div>

                {/* Status badge */}
                <Badge
                  variant={alert.triggered ? "default" : "secondary"}
                  className={cn(
                    "text-xs",
                    alert.triggered &&
                      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                  )}
                >
                  {alert.triggered ? "Triggered" : "Watching"}
                </Badge>
              </div>
            ))}

            {activeAlerts.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">
                No active alerts. Go to alerts page to create one.
              </p>
            )}

            {/* Link to full alerts page */}
            <Link
              href={ROUTES.ALERTS}
              className="flex items-center justify-center gap-1 text-xs text-primary hover:underline pt-3 border-t border-border mt-2"
            >
              Manage Alerts
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
