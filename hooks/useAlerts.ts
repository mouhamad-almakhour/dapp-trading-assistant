// hooks/useAlerts.ts
import { useState, useEffect, useCallback } from "react";

export function useAlerts(gas: GasPriceData | null): UseAlertsReturn {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch alerts on mount
  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        const response = await fetch("/api/alerts");
        if (!response.ok) throw new Error("Failed to fetch alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load alerts");
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  // Check gas prices against alerts
  useEffect(() => {
    if (!gas || alerts.length === 0) return;

    alerts.forEach(async (alert) => {
      if (!alert.active || alert.type !== "gas") return;

      const triggered =
        alert.condition === "below"
          ? gas.standard <= alert.threshold
          : gas.standard >= alert.threshold;

      if (triggered && !alert.triggered) {
        try {
          const response = await fetch(`/api/alerts/${alert.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              triggered: true,
              lastTriggeredAt: Date.now(),
            }),
          });

          if (response.ok) {
            const updated = await response.json();
            setAlerts((prev) =>
              prev.map((a) => (a.id === alert.id ? updated : a)),
            );
          }
        } catch (err) {
          console.error("Failed to update alert:", err);
        }
      }
    });
  }, [gas, alerts]);

  const addAlert = useCallback(
    async (threshold: number, condition: "below" | "above") => {
      try {
        const response = await fetch("/api/alerts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ threshold, condition, type: "gas" }),
        });

        if (!response.ok) throw new Error("Failed to add alert");

        const newAlert = await response.json();
        setAlerts((prev) => [newAlert, ...prev]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add alert");
        throw err;
      }
    },
    [],
  );

  const removeAlert = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove alert");

      setAlerts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove alert");
      throw err;
    }
  }, []);

  const toggleAlert = useCallback(async (id: string, active: boolean) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });

      if (!response.ok) throw new Error("Failed to toggle alert");

      const updated = await response.json();
      setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle alert");
      throw err;
    }
  }, []);

  return {
    alerts,
    activeAlerts: alerts.filter((a) => a.active),
    loading,
    error,
    addAlert,
    removeAlert,
    toggleAlert,
  };
}
