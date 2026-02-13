"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * TickerTape renders the TradingView Ticker Tape widget.
 * - Accepts symbols array directly (required prop).
 * - Supports optional theme and className.
 * - Dynamically updates when symbols change.
 */
const TickerTape = ({
  symbols,
  className,
  theme = "dark",
}: TickerTapeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !symbols || symbols.length === 0) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    // Create the ticker tape element with dynamic symbols
    const ticker = document.createElement("tv-ticker-tape");
    ticker.setAttribute("symbols", symbols.join(","));
    ticker.setAttribute("theme", theme);
    containerRef.current.appendChild(ticker);

    // Load the TradingView script if not already loaded globally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).TVScriptLoaded) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
      script.async = true;

      script.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).TVScriptLoaded = true;
        setIsInitialized(true);
      };

      containerRef.current.appendChild(script);
    } else {
      setIsInitialized(true);
    }

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbols, theme]);

  return (
    <div
      ref={containerRef}
      className={cn("tradingview-ticker-tape-container", className)}
      aria-label="TradingView Ticker Tape"
      data-initialized={isInitialized}
    />
  );
};

export default TickerTape;
