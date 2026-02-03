import { useState, useCallback } from "react";

function generateId(): string {
  return `activity_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Default mock activities
const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: "activity_1",
    type: "swap",
    message: "Swapped 0.5 WETH → 1,200 USDC",
    details: "Uniswap V2",
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: "activity_2",
    type: "alert_triggered",
    message: "Gas alert triggered: below 30 gwei",
    details: "Current: 25 gwei",
    createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
  },
  {
    id: "activity_3",
    type: "swap",
    message: "Swapped 100 USDC → 0.04 WETH",
    details: "Uniswap V2",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "activity_4",
    type: "alert_created",
    message: "New alert set: Gas below 25 gwei",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
  {
    id: "activity_5",
    type: "watchlist_added",
    message: "Added SOL to watchlist",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
];

export function useActivity(): UseActivityReturn {
  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES);

  const addActivity = useCallback(
    (type: ActivityType, message: string, details?: string) => {
      const newActivity: Activity = {
        id: generateId(),
        type,
        message,
        details,
        createdAt: Date.now(),
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 20)); // Keep max 20
    },
    [],
  );

  const clearActivities = useCallback(() => setActivities([]), []);

  return { activities, addActivity, clearActivities };
}
