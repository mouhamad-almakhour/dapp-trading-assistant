import { UserPlus, SlidersHorizontal, Bell, Bot } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up with email and password via Better Auth. Your session is secured and your data is persisted in MongoDB.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Connect to Live Data",
    description:
      "Your dashboard instantly connects to Etherscan for gas data and CoinGecko for market pricing — no manual setup required.",
  },
  {
    number: "03",
    icon: Bell,
    title: "Set Gas Alerts",
    description:
      "Define custom gas thresholds. The alert engine monitors the Ethereum network and notifies you when conditions match.",
  },
  {
    number: "04",
    icon: Bot,
    title: "AI Sends Your Welcome",
    description:
      "On signup, Inngest triggers an async Gemini AI workflow to craft and send you a personalized welcome email — your journey begins.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 overflow-hidden">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-neon/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-neon">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            From sign-up to <span className="text-neon">live intelligence</span>
          </h2>
          <p className="max-w-lg text-muted-foreground leading-relaxed text-pretty">
            Get up and running in minutes. No wallets to connect, no gas to pay
            — just a clean authenticated dashboard ready to work for you.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ number, icon: Icon, title, description }, idx) => (
            <div key={number} className="relative flex flex-col gap-4">
              {/* Connector line (desktop) */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(100%+0.75rem)] w-6 h-px bg-neon/20"
                  aria-hidden="true"
                />
              )}

              {/* Icon + number */}
              <div className="relative flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon/30 bg-neon/10 text-neon">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-2xl font-bold text-neon/20">
                  {number}
                </span>
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
