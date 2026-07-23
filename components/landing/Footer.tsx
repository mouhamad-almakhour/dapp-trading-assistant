import Link from "next/link";
import Image from "next/image";

const links = {
  Product: [
    { label: "Gas Tracker", href: "#features" },
    { label: "Swap Simulator", href: "#features" },
    { label: "Market Intelligence", href: "#features" },
    { label: "AI Emails", href: "#features" },
  ],
  Platform: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "FAQ", href: "#faq" },
  ],
  Account: [
    { label: "Sign In", href: "/sign-in" },
    { label: "Get Started", href: "/sign-up" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
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
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A crypto dashboard for gas tracking, swap simulation, and live
              market intelligence.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60">
                {section}
              </span>
              <ul className="flex flex-col gap-2.5" role="list">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MA Solution.
          </p>
        </div>
      </div>
    </footer>
  );
}
