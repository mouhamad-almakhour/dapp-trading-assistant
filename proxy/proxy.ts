import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { getRouteType, ROUTES } from "@/lib/config/routes";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const routeType = getRouteType(pathname);

  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = !!sessionCookie;

  // Allow public routes (landing page)
  if (routeType === "public") {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (routeType === "auth" && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users to sign in
  if (routeType === "dashboard" && !isAuthenticated) {
    const signInUrl = new URL(ROUTES.SIGN_IN, request.url);
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
