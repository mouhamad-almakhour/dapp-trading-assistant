"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
const NavItems = () => {
  const pathname: string = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const NavItem = ({
    href,
    label,
    isActive,
  }: {
    href: string;
    label: string;
    isActive: boolean;
  }) => (
    <li className="relative group">
      <Link
        href={href}
        className={`
          transition-colors duration-200
          ${isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-yellow-500"}
        `}
      >
        {label}
        {/* Animated underline - appears on hover and stays on active items */}
        <span
          className={`
            absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500
            transition-transform duration-300 ease-in-out
            origin-left
            ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
          `}
          aria-hidden="true"
        />
      </Link>
    </li>
  );

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {isActive("/") ? (
        <li key="home">
          <div className="flex flex-col lg:flex-row gap-2 items-center justify-center">
            <Button asChild variant="ghost" size="lg" className="btn-auth">
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="btn-auth">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <ModeToggle />
          </div>
        </li>
      ) : isAuthPage ? (
        <li key="mode-toggle">
          <ModeToggle />
        </li>
      ) : (
        NAV_ITEMS.map(({ href, label }) => (
          <NavItem
            key={href}
            href={href}
            label={label}
            isActive={isActive(href)}
          />
        ))
      )}
    </ul>
  );
};

export default NavItems;
