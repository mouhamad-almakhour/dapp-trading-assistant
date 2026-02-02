"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import NavItems from "@/components/Navitems";
import { ModeToggle } from "@/components/ModeToggle";
import UserDropdown from "@/components/UserDropdown";
import { getRouteType, ROUTES } from "@/lib/config/routes";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const routeType = getRouteType(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full ",
        "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={ROUTES.LANDING}
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label="Go to home"
        >
          <Image
            src="/icons/logo.svg"
            alt="Dapp Trading Assistant"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Navigation based on route type */}
        <nav className="flex items-center gap-4">
          {routeType === "public" && <PublicNav />}
          {routeType === "auth" && <AuthNav />}
          {routeType === "dashboard" && <DashboardNav />}
        </nav>
      </div>
    </header>
  );
};

// Memoized navigation components for better performance
const PublicNav = memo(() => (
  <>
    <NavItems variant="landing" />
    <ModeToggle />
  </>
));
PublicNav.displayName = "PublicNav";

const AuthNav = memo(() => <ModeToggle />);
AuthNav.displayName = "AuthNav";

const DashboardNav = memo(() => (
  <>
    <div className="hidden sm:block">
      <NavItems variant="dashboard" />
    </div>
    <ModeToggle />
    <UserDropdown />
  </>
));
DashboardNav.displayName = "DashboardNav";

export default memo(Header);
