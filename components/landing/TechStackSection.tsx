const stack = [
  { label: "Next.js 16", category: "Framework", color: "neon" },
  { label: "TypeScript", category: "Language", color: "neon" },
  { label: "React 19", category: "UI", color: "neon" },
  { label: "Tailwind CSS 4", category: "Styling", color: "neon" },
  { label: "Better Auth", category: "Auth", color: "neon" },
  { label: "MongoDB", category: "Database", color: "neon" },
  { label: "CoinGecko API", category: "Market Data", color: "neon" },
  { label: "Etherscan API", category: "Gas Data", color: "neon" },
  { label: "TradingView", category: "Charts", color: "neon" },
  { label: "Uniswap V2", category: "Swap Router", color: "neon" },
  { label: "Google Gemini", category: "AI", color: "neon" },
  { label: "Inngest", category: "Background Jobs", color: "neon" },
  { label: "Resend", category: "Email", color: "neon" },
  { label: "Recharts", category: "Visualization", color: "neon" },
  { label: "Radix UI", category: "Components", color: "neon" },
  { label: "Docker", category: "DevOps", color: "neon" },
];

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="relative py-24 px-4 overflow-hidden">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-neon/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-neon">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            Built with the{" "}
            <span className="text-neon">best tools in the game</span>
          </h2>
          <p className="max-w-lg text-muted-foreground leading-relaxed text-pretty">
            Production-grade technologies from framework to AI, ensuring
            reliability, developer experience, and speed.
          </p>
        </div>

        {/* Stack grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {stack.map(({ label, category }) => (
            <div
              key={label}
              className="group flex flex-col gap-1 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm px-4 py-3.5 hover:border-neon/30 hover:bg-card/80 transition-all"
            >
              <span className="text-xs text-muted-foreground">{category}</span>
              <span className="text-sm font-semibold text-foreground group-hover:text-neon transition-colors">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
