import { POPULAR_TOKENS } from "@/lib/constants";
import { useState, useCallback } from "react";

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
