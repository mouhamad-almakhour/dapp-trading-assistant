/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useCallback } from "react";
import { POPULAR_TOKENS } from "@/lib/constants";
import { getSwapQuote } from "@/lib/actions/eth-swap.actions";

export function useSwap() {
  // token selection
  const [fromToken, setFromToken] = useState<Token | null>(POPULAR_TOKENS[0]);
  const [toToken, setToToken] = useState<Token | null>(POPULAR_TOKENS[1]);

  // input amount
  const [inputAmount, setInputAmount] = useState("");

  // quote state
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  // memoize fetch function
  const fetchQuote = useCallback(async () => {
    if (
      !fromToken ||
      !toToken ||
      !inputAmount ||
      parseFloat(inputAmount) <= 0
    ) {
      return;
    }

    setIsLoadingQuote(true);
    setQuoteError(null);

    const response = await getSwapQuote({
      fromTokenAddress: fromToken.address,
      toTokenAddress: toToken.address,
      amountIn: inputAmount,
    });

    if (response.success && response.data) {
      setQuote(response.data);
    } else {
      setQuoteError(response.error || "failed to get quote");
      setQuote(null);
    }

    setIsLoadingQuote(false);
  }, [fromToken, toToken, inputAmount]);

  // auto-fetch quote when inputs change (debounced)
  useEffect(() => {
    // clear quote immediately if inputs invalid
    if (
      !fromToken ||
      !toToken ||
      !inputAmount ||
      parseFloat(inputAmount) <= 0
    ) {
      setQuote(null);
      setQuoteError(null);
      return;
    }

    const timeout = setTimeout(() => {
      fetchQuote();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fetchQuote, fromToken, inputAmount, toToken]);

  // swap tokens
  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  // handle input change
  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };

  // simulate swap
  const handleSwap = () => {
    if (!quote) return;

    alert(
      `swap simulated successfully!\n\nyou would receive approximately ${quote.amountOutFormatted} ${quote.toToken.symbol}`,
    );
  };

  // calculate price impact
  const getPriceImpact = () => {
    if (!quote) return 0;

    const reserve0 = parseFloat(quote.reserves.reserve0);
    const reserve1 = parseFloat(quote.reserves.reserve1);
    const amountIn = parseFloat(quote.amountIn);
    const currentPrice = reserve1 / reserve0;
    const newReserve0 = reserve0 + amountIn;
    const newReserve1 = reserve1 - parseFloat(quote.amountOut);
    const newPrice = newReserve1 / newReserve0;

    return Math.abs(((newPrice - currentPrice) / currentPrice) * 100);
  };

  return {
    // tokens
    fromToken,
    toToken,
    setFromToken,
    setToToken,
    handleFlipTokens,

    // amount
    inputAmount,
    handleAmountChange,

    // quote
    quote,
    isLoadingQuote,
    quoteError,

    // actions
    handleSwap,
    getPriceImpact,
  };
}
