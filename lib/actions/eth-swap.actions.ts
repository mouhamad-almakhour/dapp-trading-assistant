"use server";

import { POPULAR_TOKENS } from "../constants";

/**
 * Swap API service
 * Handles all swap-related API calls to backend
 */

const BACKEND_URL = "https://eth-gas-swap-api.vercel.app/v1/api";

/**
 * Calculate swap quote from backend
 * Calls your NestJS backend /swap-change endpoint
 */
export async function getSwapQuote(
  request: SwapRequest,
): Promise<SwapResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/swap-change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return {
        success: false,
        error: error.message || "Failed to get swap quote",
      };
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

/**
 * Get token by address
 */
export async function getTokenByAddress(
  address: string,
): Promise<Token | undefined> {
  return POPULAR_TOKENS.find(
    (t) => t.address.toLowerCase() === address.toLowerCase(),
  );
}

/**
 * Get token by symbol
 */
export async function getTokenBySymbol(
  symbol: string,
): Promise<Token | undefined> {
  return POPULAR_TOKENS.find(
    (t) => t.symbol.toUpperCase() === symbol.toUpperCase(),
  );
}
