"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { ROUTES } from "@/lib/config/routes";
import Image from "next/image";
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/sign-in"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-neon text-background rounded-lg px-4 py-1.5 hover:bg-neon/90 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <ModeToggle />
          <button
            className="text-muted-foreground hover:text-foreground p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
            <Link
              href="/sign-in"
              className="text-sm text-center text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium bg-neon text-background rounded-lg px-4 py-2 text-center hover:bg-neon/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
