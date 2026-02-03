"use client";

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
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Gas Tracker",
    icon: Fuel,
    href: "/gas-tracker",
  },
  {
    label: "Swap Calculator",
    icon: RefreshCw,
    href: "/swap-calculator",
  },
  {
    label: "Market",
    icon: TrendingUp,
    href: "/market",
  },
  {
    label: "Alerts",
    icon: Bell,
    href: "/alerts",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="p-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-sidebar-foreground"
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

      <nav className="flex-1 px-2 py-4 space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn("sidebar-link", pathname === route.href && "active")}
          >
            <route.icon className="h-5 w-5" />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
