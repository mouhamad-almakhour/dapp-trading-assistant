// components/SidebarWrapper.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/SideBar";
import { cn } from "@/lib/utils";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isCollapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        <main className="flex-1 overflow-y-auto">
          <div className="w-full py-6 px-4 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
