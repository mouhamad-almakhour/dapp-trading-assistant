import {
  Flame,
  ArrowLeftRight,
  BarChart2,
  Bot,
  Bell,
  Lock,
} from "lucide-react";
import FeatureSlider from "./FeatureSlider";

const features = [
  {
    icon: Flame,
    title: "Gas Tracker",
    description:
      "Monitor live Ethereum gas tiers — Slow, Standard, and Fast — sourced directly from the Etherscan Gas Oracle. Set threshold-based alerts so you never overpay.",
    accent: "neon",
    tag: "Live",
  },
  {
    icon: ArrowLeftRight,
    title: "Uniswap Swap Simulator",
    description:
      "Simulate token-pair swap output using Uniswap V2-style routing before committing. Get precise quote estimates with slippage context — without any on-chain tx.",
    accent: "neon",
    tag: "Simulation",
  },
  {
    icon: BarChart2,
    title: "Market Intelligence",
    description:
      "CoinGecko-powered pricing combined with embeddable TradingView widgets. Stay ahead with real-time charts, volume data, and market cap trends.",
    accent: "neon",
    tag: "Real-Time",
  },
  {
    icon: Bot,
    title: "AI-Powered Emails",
    description:
      "Inngest-driven async workflows trigger Google Gemini AI to generate personalized welcome email intros — crafted from your on-chain activity and preferences.",
    accent: "neon",
    tag: "AI / Gemini",
  },
  {
    icon: Bell,
    title: "Personal Gas Alerts",
    description:
      "Create, manage, and receive gas-price alert notifications stored as MongoDB documents. Get notified the moment gas dips below your custom threshold.",
    accent: "neon",
    tag: "Alerts",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description:
      "Better Auth with email/password and social providers, backed by MongoDB. Secure sessions, environment-validated deployments, and Docker support included.",
    accent: "neon",
    tag: "Auth",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-neon/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-neon">
            Core Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            Everything you need,{" "}
            <span className="text-neon">in one workspace</span>
          </h2>
          <p className="max-w-xl text-muted-foreground leading-relaxed text-pretty">
            A Dapp dashboard built to give crypto traders real-time
            intelligence, simulation tools, and smart automation — all behind
            authenticated routes.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, tag }) => (
            <article
              key={title}
              className="group relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-6 flex flex-col gap-4 hover:border-neon/30 hover:bg-card/80 transition-all"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon/10 border border-neon/20 group-hover:bg-neon/15 transition-colors">
                  <Icon className="h-5 w-5 text-neon" />
                </span>
                <span className="text-xs font-mono text-neon/70 border border-neon/20 rounded-full px-2.5 py-0.5 bg-neon/5">
                  {tag}
                </span>
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {description}
              </p>

              {/* Bottom accent line */}
              <div
                className="h-px w-0 group-hover:w-full bg-neon/30 transition-all duration-500 mt-auto"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        {/* Feature Showcase Slider */}
        <div className="mt-20">
          <div className="text-center mb-4 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-neon">
              Feature Showcase
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-balance text-foreground">
              See it in action
            </h3>
          </div>
          <FeatureSlider />
        </div>
      </div>
    </section>
  );
}
