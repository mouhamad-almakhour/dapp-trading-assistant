import { useState, useCallback } from "react";

export interface SwapToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export interface SwapResult {
  inputToken: SwapToken;
  outputToken: SwapToken;
  inputAmount: string;
  outputAmount: string;
  priceImpact: number;
  estimatedGas: number;
}

export interface UseSwapReturn {
  inputToken: SwapToken | null;
  outputToken: SwapToken | null;
  inputAmount: string;
  outputAmount: string;
  result: SwapResult | null;
  loading: boolean;
  error: string | null;
  setInputToken: (token: SwapToken) => void;
  setOutputToken: (token: SwapToken) => void;
  setInputAmount: (amount: string) => void;
  swapTokens: () => void;
  calculate: () => Promise<void>;
  reset: () => void;
}

// Popular tokens for quick selection
export const POPULAR_TOKENS: SwapToken[] = [
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
  },
  {
    address: "0x2260FAC8A66351360556866AB5Bb8b724513Ba0d",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 8,
  },
  {
    address: "0x514910ffD3D7D764F1196a3DBA4f5c4a3supp776",
    symbol: "LINK",
    name: "ChainLink",
    decimals: 18,
  },
];

export function useSwap(): UseSwapReturn {
  const [inputToken, setInputToken] = useState<SwapToken | null>(
    POPULAR_TOKENS[0],
  );
  const [outputToken, setOutputToken] = useState<SwapToken | null>(
    POPULAR_TOKENS[1],
  );
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [result, setResult] = useState<SwapResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async () => {
    if (!inputToken || !outputToken || !inputAmount) return;
    if (parseFloat(inputAmount) <= 0) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/swap/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenA: inputToken.address,
          tokenB: outputToken.address,
          amountIn: inputAmount,
        }),
      });

      if (!res.ok) throw new Error("Swap calculation failed");

      const data: SwapResult = await res.json();
      setResult(data);
      setOutputAmount(data.outputAmount);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed");
      setOutputAmount("");
    } finally {
      setLoading(false);
    }
  }, [inputToken, outputToken, inputAmount]);

  // Swap input and output tokens
  const swapTokens = useCallback(() => {
    setInputToken(outputToken);
    setOutputToken(inputToken);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  }, [inputToken, outputToken, inputAmount, outputAmount]);

  const reset = useCallback(() => {
    setInputAmount("");
    setOutputAmount("");
    setResult(null);
    setError(null);
  }, []);

  return {
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    result,
    loading,
    error,
    setInputToken,
    setOutputToken,
    setInputAmount,
    swapTokens,
    calculate,
    reset,
  };
}
