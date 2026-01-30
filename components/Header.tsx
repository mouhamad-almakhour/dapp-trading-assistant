"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItems from "@/components/Navitems";
import { ModeToggle } from "@/components/ModeToggle";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            alt="Dapp logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>

        {isLanding && (
          <div className="flex items-center gap-3">
            <NavItems variant="landing" />
            <ModeToggle />
          </div>
        )}

        {isAuthPage && <ModeToggle />}

        {isDashboard && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <NavItems variant="dashboard" />
            </div>
            <ModeToggle />
            <UserDropdown />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
