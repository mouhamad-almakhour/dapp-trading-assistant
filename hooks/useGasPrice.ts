import { useEffect, useState, useCallback } from "react";

function calculateGasLevel(standard: number): GasLevel {
  if (standard <= 20) return "low";
  if (standard <= 50) return "medium";
  return "high";
}

export const fakeGasData: GasPriceData = {
  slow: 18,
  standard: 26,
  fast: 38,
  level: 2, // numeric level (1 = low, 2 = medium, 3 = high)
  updatedAt: Date.now(),
};

export function useGasPrice(interval = 60000): UseGasPriceReturn {
  const [gas, setGas] = useState<GasPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGas = useCallback(() => {
    try {
      setLoading(true);

      // fake dynamic values (feels real)
      const base = 20 + Math.floor(Math.random() * 20);

      const data: GasPriceData = {
        slow: base - 6,
        standard: base,
        fast: base + 10,
        level: base <= 20 ? 1 : base <= 50 ? 2 : 3,
        updatedAt: Date.now(),
      };

      setGas(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "failed to fetch gas price",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGas();
    const id = setInterval(fetchGas, interval);
    return () => clearInterval(id);
  }, []);

  const gasLevel: GasLevel = gas ? calculateGasLevel(gas.standard) : "medium";

  return {
    gas,
    gasLevel,
    loading,
    error,
    refetch: fetchGas,
  };
}
