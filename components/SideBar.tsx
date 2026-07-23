"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Fuel,
  RefreshCw,
  TrendingUp,
  Settings,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/config/routes";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: ROUTES.DASHBOARD,
  },
  {
    label: "Gas Tracker",
    icon: Fuel,
    href: ROUTES.GAS_TRACKER,
  },
  {
    label: "Swap Calculator",
    icon: RefreshCw,
    href: ROUTES.SWAP,
  },
  {
    label: "Market",
    icon: TrendingUp,
    href: ROUTES.MARKET,
  },
  {
    label: "Alerts",
    icon: Bell,
    href: ROUTES.ALERTS,
  },
  {
    label: "Settings",
    icon: Settings,
    href: ROUTES.SETTINGS,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/60 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-background z-50 transition-all duration-300",
          // Mobile: full width with slide animation
          "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible, adjustable width
          "lg:translate-x-0",
          isCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        {/* Desktop Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background shadow-md hover:shadow-lg z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={closeMobileSidebar}
          className="absolute top-4 right-4 lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div
          className={cn(
            "p-6",
            isCollapsed && "lg:p-3 lg:flex lg:justify-center",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={closeMobileSidebar}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon/10 border border-neon/30 group-hover:bg-neon/20 transition-colors overflow-hidden flex-shrink-0">
              <Image
                src="/icons/logo.svg"
                alt="MA Solution"
                width={32}
                height={32}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight text-foreground">
                <span className="text-neon">MA </span>Solution
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={closeMobileSidebar}
              className={cn(
                "sidebar-link",
                pathname === route.href && "active",
                isCollapsed && "lg:justify-center lg:px-2",
              )}
              title={isCollapsed ? route.label : undefined}
            >
              <route.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="text-xs text-sidebar-foreground/50 text-center">
              © 2026 MA Solution
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
