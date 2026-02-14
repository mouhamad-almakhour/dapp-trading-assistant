"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchCommand from "@/components/SearchCommand";
import { NAV_ITEMS } from "@/lib/constants";
type NavVariant = "landing" | "dashboard";

const NavItems = ({
  variant,
  initialCoins,
}: {
  variant: NavVariant;
  initialCoins: StockAsset[];
}) => {
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
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 p-2 font-medium">
      <div className="sm:ml-auto mt-2 sm:mt-0">
        <SearchCommand initialCoins={initialCoins} />
      </div>
    </div>
  );
};

export default NavItems;
