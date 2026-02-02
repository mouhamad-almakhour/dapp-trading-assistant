import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getRouteType, type RouteType } from "@/lib/config/routes";

/**
 * Custom hook to get the current route type
 * Memoized for performance
 */
export function useRouteType(): RouteType {
  const pathname = usePathname();

  return useMemo(() => getRouteType(pathname), [pathname]);
}

/**
 * Hook to check if current route is of specific type
 */
export function useIsRouteType(type: RouteType): boolean {
  const currentType = useRouteType();
  return currentType === type;
}

/**
 * Hook with multiple route type checks
 */
export function useRouteChecks() {
  const routeType = useRouteType();

  return useMemo(
    () => ({
      isPublic: routeType === "public",
      isAuth: routeType === "auth",
      isDashboard: routeType === "dashboard",
      routeType,
    }),
    [routeType],
  );
}
