"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need a crypto wallet to use MA Solution?",
    a: "No. MA Solution is a read-and-simulate platform. You sign in with an email and password — no wallet connection, MetaMask, or on-chain transactions required.",
  },
  {
    q: "How accurate is the Uniswap Swap Simulator?",
    a: "The simulator uses Uniswap V2-style routing via an external swap backend to produce quote estimates. Results are highly accurate for current pool states, but real swaps may vary due to slippage and liquidity shifts at execution time.",
  },
  {
    q: "How do gas alerts work?",
    a: "You define a gas price threshold (e.g., alert me when gas is below 20 Gwei). The platform stores your alert as a MongoDB document and checks it against live Etherscan Gas Oracle data, notifying you when conditions match.",
  },
  {
    q: "What is the AI-powered email feature?",
    a: "On signup, an Inngest background event is triggered. Google Gemini AI then generates a personalized welcome email based on your account context, sent via Resend. It's a fully automated, zero-cost-to-you workflow.",
  },
  {
    q: "Can I run this locally with Docker?",
    a: "Yes. The project ships with a Dockerfile and docker-compose configuration for a complete local development workflow, including MongoDB and the Next.js app in isolated containers.",
  },
  {
    q: "What data sources power the market intelligence?",
    a: "Market pricing and coin metadata come from the CoinGecko API. Advanced charting is powered by embeddable TradingView widgets, giving you professional-grade technical analysis tools.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 px-4 overflow-hidden">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-neon/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-neon">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            Frequently asked <span className="text-neon">questions</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-border/40 border border-border/40 rounded-2xl overflow-hidden bg-card/40 backdrop-blur-sm">
          {faqs.map(({ q, a }, idx) => (
            <div key={idx}>
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-card/60 transition-colors"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <span className="text-sm font-medium text-foreground">{q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-neon shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
