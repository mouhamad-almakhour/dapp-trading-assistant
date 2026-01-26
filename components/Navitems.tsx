"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";

type NavVariant = "landing" | "dashboard";

const NavItems = ({ variant }: { variant: NavVariant }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  if (variant === "landing") {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="lg" className="btn-auth">
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="btn-auth">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href} className="relative group">
          <Link
            href={href}
            className={`
              transition-colors duration-200
              ${
                isActive(href)
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-yellow-500"
              }
            `}
          >
            {label}
            <span
              className={`
                absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500
                transition-transform duration-300 ease-in-out
                origin-left
                ${
                  isActive(href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }
              `}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
