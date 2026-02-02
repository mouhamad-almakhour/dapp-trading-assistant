/**
 * Route configuration for the application
 * Centralized route management for better maintainability
 */

export const ROUTES = {
  // Public routes
  LANDING: "/",

  // Auth routes
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Dashboard routes
  DASHBOARD: "/dashboard",
  GAS_TRACKER: "/gas-tracker",
  SWAP: "/swap",
  MARKET: "/market",
  ALERTS: "/alerts",
  SETTINGS: "/settings",
  PROFILE: "/profile",
} as const;

export type RouteType = "public" | "auth" | "dashboard";

/**
 * Route patterns for matching
 */
export const ROUTE_PATTERNS = {
  auth: [
    ROUTES.SIGN_IN,
    ROUTES.SIGN_UP,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ],
  dashboard: [
    ROUTES.DASHBOARD,
    ROUTES.GAS_TRACKER,
    ROUTES.SWAP,
    ROUTES.MARKET,
    ROUTES.ALERTS,
    ROUTES.SETTINGS,
    ROUTES.PROFILE,
  ],
  public: [ROUTES.LANDING],
} as const;

/**
 * Determines the route type based on pathname
 * @param pathname - Current pathname from usePathname()
 * @returns Route type: "public" | "auth" | "dashboard"
 */
export function getRouteType(pathname: string): RouteType {
  // Check exact match for landing
  if (pathname === ROUTES.LANDING) {
    return "public";
  }

  // Check if pathname starts with any auth route
  if (ROUTE_PATTERNS.auth.some((route) => pathname.startsWith(route))) {
    return "auth";
  }

  // Check if pathname starts with any dashboard route
  if (ROUTE_PATTERNS.dashboard.some((route) => pathname.startsWith(route))) {
    return "dashboard";
  }

  // Default to dashboard for authenticated pages
  return "dashboard";
}

/**
 * Check if route requires authentication
 */
export function requiresAuth(pathname: string): boolean {
  const type = getRouteType(pathname);
  return type === "dashboard";
}

/**
 * Check if route is public
 */
export function isPublicRoute(pathname: string): boolean {
  const type = getRouteType(pathname);
  return type === "public" || type === "auth";
}
