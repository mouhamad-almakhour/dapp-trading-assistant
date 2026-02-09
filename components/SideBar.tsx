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

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-background  z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        {/* Close button for mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={closeSidebar}
          className="absolute top-4 right-4 lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="p-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-sidebar-foreground"
            onClick={closeSidebar}
          >
            <Image
              src="/icons/logo.svg"
              alt="Dapp Trading Assistant"
              width={24}
              height={24}
              priority
            />
            Dapp Assistant
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={closeSidebar}
              className={cn(
                "sidebar-link",
                pathname === route.href && "active",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-sidebar-foreground/50 text-center">
            © 2025 DApp Assistant
          </div>
        </div>
      </aside>
    </>
  );
}
