import { useEffect, useState, useCallback } from "react";

function calculateGasLevel(standard: number): GasLevel {
  if (standard <= 20) return "low";
  if (standard <= 50) return "medium";
  return "high";
}
type GasOracleResponse = {
  status: string;
  message: string;
  result: {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  };
};

async function fetchGasOracle(apiKey: string) {
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Etherscan error: ${res.status}`);
  }

  const data = (await res.json()) as GasOracleResponse;

  if (data.status !== "1") {
    throw new Error(`Etherscan API error: ${data.message}`);
  }

  return data.result;
}

export function useGasPrice(): UseGasPriceReturn {
  const [gas, setGas] = useState<GasPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGas = useCallback(async () => {
    try {
      setLoading(true);

      const gas = await fetchGasOracle(process.env.ETHERSACN_API_KEY!);

      const standard = Number(gas.ProposeGasPrice);
      const data: GasPriceData = {
        slow: Number(gas.SafeGasPrice),
        standard,
        fast: Number(gas.FastGasPrice),
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
  }, [fetchGas]);

  const gasLevel: GasLevel = gas ? calculateGasLevel(gas.standard) : "medium";

  return {
    gas,
    gasLevel,
    loading,
    error,
  };
}
