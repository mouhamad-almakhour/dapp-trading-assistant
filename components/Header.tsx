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

const Logo = memo(() => (
  <Link
    href={ROUTES.LANDING}
    className="flex items-center gap-2 group"
    aria-label="MA Solution home"
  >
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon/10 border border-neon/30 group-hover:bg-neon/20 transition-colors overflow-hidden">
      <Image
        src="/icons/logo.svg"
        alt="MA Solution"
        width={32}
        height={32}
        priority
        className="w-full h-full object-contain"
      />
    </div>
    <span className="font-bold text-lg tracking-tight text-foreground">
      <span className="text-neon">MA </span>Solution
    </span>
  </Link>
));
Logo.displayName = "Logo";

const Header = () => {
  const pathname = usePathname();
  const routeType = getRouteType(pathname);
  const isDashboard = routeType === "dashboard";
  return (
    <header
      className={cn(
        "header",
        "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
      )}
    >
      <div className="container h-16 header-wrapper">
        {!isDashboard && <Logo />}

        {isDashboard && <div className="flex-1 lg:ml-0 ml-12" />}

        <nav className="flex items-center gap-4">
          {routeType === "auth" && <AuthNav />}
          {routeType === "dashboard" && <DashboardNav />}
        </nav>
      </div>
    </header>
  );
};
const AuthNav = memo(() => <ModeToggle />);
AuthNav.displayName = "AuthNav";

const DashboardNav = memo(() => (
  <>
    <div className="hidden sm:block">
      <NavItems />
    </div>
    <ModeToggle />
    <UserDropdown />
  </>
));
DashboardNav.displayName = "DashboardNav";

export default memo(Header);
