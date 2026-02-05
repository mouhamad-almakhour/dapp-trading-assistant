"use client";
import { useEffect, useState, useCallback } from "react";

function generateId(): string {
  return `alert_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function useAlerts(gas: GasPriceData | null): UseAlertsReturn {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "alert_default_1",
      type: "gas",
      condition: "below",
      threshold: 30,
      active: true,
      triggered: false,
      createdAt: 113434434,
      lastTriggeredAt: null,
    },
    {
      id: "alert_default_2",
      type: "gas",
      condition: "below",
      threshold: 20,
      active: true,
      triggered: false,
      createdAt: 113434434,
      lastTriggeredAt: null,
    },
  ]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Check alerts when gas price changes
  useEffect(() => {
    if (!gas) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAlerts((prev) =>
      prev.map((alert) => {
        if (!alert.active || alert.type !== "gas") return alert;

        const triggered =
          alert.condition === "below"
            ? gas.standard <= alert.threshold
            : gas.standard >= alert.threshold;

        return {
          ...alert,
          triggered,
          lastTriggeredAt: triggered ? Date.now() : alert.lastTriggeredAt,
        };
      }),
    );
  }, [gas]);

  const addAlert = useCallback(
    (threshold: number, condition: "below" | "above") => {
      const newAlert: Alert = {
        id: generateId(),
        type: "gas",
        condition,
        threshold,
        active: true,
        triggered: false,
        createdAt: Date.now(),
        lastTriggeredAt: null,
      };
      setAlerts((prev) => [...prev, newAlert]);
    },
    [],
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const toggleAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  }, []);

  const activeAlerts = alerts.filter((a) => a.active);

  return {
    alerts,
    activeAlerts,
    loading,
    error,
    addAlert,
    removeAlert,
    toggleAlert,
  };
}
