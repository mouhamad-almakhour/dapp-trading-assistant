import Link from "next/link";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";

const badges = [
  { icon: Zap, label: "Live Gas Tracking" },
  { icon: TrendingUp, label: "Real-Time Markets" },
  { icon: Shield, label: "Better Auth" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 overflow-hidden hero-grid">
      {/* Radial glow center */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[500px] w-[700px] rounded-full bg-neon/5 blur-3xl" />
      </div>

      {/* Corner glow accents */}
      <div
        className="pointer-events-none absolute top-32 left-0 h-64 w-64 bg-neon/8 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-32 right-0 h-64 w-64 bg-neon-green/6 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 border border-neon/30 bg-neon/10 rounded-full px-4 py-1.5 text-sm text-neon">
          <span className="glow-dot h-1.5 w-1.5 rounded-full bg-neon inline-block" />
          Now live — AI-powered welcome emails with Gemini
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance text-foreground">
          Your <span className="text-neon">On-Chain Edge</span>
          <br />
          Starts Here
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          MA solution is a unified crypto dashboard — track live Ethereum gas,
          simulate Uniswap V2 swaps, monitor market intelligence, and manage
          personal alerts, all behind a secure, authenticated workspace.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border/60 bg-card/60 rounded-full px-3 py-1.5 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-neon" />
              {label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-neon text-background font-semibold rounded-xl px-6 py-3 text-sm hover:bg-neon/90 transition-all shadow-lg shadow-neon/20"
          >
            Launch Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 border border-border/60 text-foreground rounded-xl px-6 py-3 text-sm hover:bg-card/60 transition-all backdrop-blur-sm"
          >
            Explore Features
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-3 divide-x divide-border/40 border border-border/40 rounded-2xl bg-card/40 backdrop-blur-sm overflow-hidden">
          {[
            { value: "5+", label: "Core Modules" },
            { value: "Real-time", label: "Gas & Market Data" },
            { value: "AI", label: "Gemini-Powered Emails" },
          ].map(({ value, label }) => (
            <div key={label} className="px-6 py-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-neon">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 text-pretty">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard preview card */}
      <div className="relative z-10 mt-16 w-full max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-background/80">
          {/* Fake window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/80">
            <div className="h-3 w-3 rounded-full bg-destructive/70" />
            <div className="h-3 w-3 rounded-full bg-chart-5/70" />
            <div className="h-3 w-3 rounded-full bg-neon-green/70" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              ma-solution / dashboard
            </span>
          </div>

          {/* Mock dashboard grid */}
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Gas (Safe)",
                value: "18 Gwei",
                sub: "↓ Optimal window",
                up: true,
              },
              {
                label: "ETH Price",
                value: "$3,421.58",
                sub: "+2.34% 24h",
                up: true,
              },
              {
                label: "Swap Quote",
                value: "1 ETH → 3,418 USDT",
                sub: "via Uniswap V2",
                up: null,
              },
              {
                label: "Active Alerts",
                value: "3",
                sub: "Threshold triggers",
                up: null,
              },
            ].map(({ label, value, sub, up }) => (
              <div
                key={label}
                className="rounded-xl border border-border/40 bg-background/60 p-4 flex flex-col gap-1"
              >
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm md:text-base font-semibold text-foreground leading-tight">
                  {value}
                </span>
                <span
                  className={`text-xs mt-auto ${
                    up === true
                      ? "text-neon-green"
                      : up === false
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                >
                  {sub}
                </span>
              </div>
            ))}
          </div>

          {/* Fake chart bar */}
          <div className="px-4 pb-4">
            <div className="rounded-xl border border-border/40 bg-background/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">
                  Gas price history (24h)
                </span>
                <span className="text-xs text-neon font-mono">ETH Mainnet</span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[
                  22, 18, 35, 28, 15, 20, 18, 32, 24, 18, 22, 16, 14, 18, 22,
                  30, 25, 18, 16, 14,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all"
                    style={{
                      height: `${(h / 35) * 100}%`,
                      backgroundColor:
                        h < 20
                          ? "oklch(0.74 0.2 150 / 0.7)"
                          : h < 28
                            ? "oklch(0.78 0.18 198 / 0.5)"
                            : "oklch(0.65 0.22 25 / 0.6)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
