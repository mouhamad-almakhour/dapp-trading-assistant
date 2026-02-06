"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RefreshCw, Bell, Eye, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActivities } from "@/hooks/useActivities";

const ACTIVITY_STYLES: Record<
  ActivityType,
  { icon: React.ReactNode; bg: string; label: string }
> = {
  swap: {
    icon: <RefreshCw className="h-3.5 w-3.5" />,
    bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    label: "Swap",
  },
  alert_triggered: {
    icon: <Bell className="h-3.5 w-3.5" />,
    bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    label: "Alert",
  },
  alert_created: {
    icon: <Bell className="h-3.5 w-3.5" />,
    bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    label: "Alert",
  },
  alert_deleted: {
    icon: <BellOff className="h-3.5 w-3.5" />,
    bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    label: "Alert",
  },
  watchlist_added: {
    icon: <Eye className="h-3.5 w-3.5" />,
    bg: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    label: "Watch",
  },
};

export function RecentActivity() {
  const { activities, loading, error } = useActivities(5);

  if (loading) {
    return (
      <Card className="trading-card h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="spinner h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="trading-card h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="trading-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-0">
          {activities.map((activity, i) => {
            const style = ACTIVITY_STYLES[activity.type];
            return (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start gap-3 py-2.5 px-1",
                  i !== activities.length - 1 && "border-b border-border",
                )}
              >
                {/* Icon */}
                <div className={cn("mt-0.5 p-1.5 rounded-md", style.bg)}>
                  {style.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">
                      {activity.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {activity.details && (
                      <span className="text-xs text-muted-foreground">
                        {activity.details}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      • {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <span
                  className={cn(
                    "text-xs font-semibold px-1.5 py-0.5 rounded whitespace-nowrap",
                    style.bg,
                  )}
                >
                  {style.label}
                </span>
              </div>
            );
          })}

          {activities.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">
              No recent activity yet.
            </p>
          )}
        </div>
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
