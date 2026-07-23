import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-neon/30 to-transparent"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-64 w-96 rounded-full bg-neon/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-neon">
          Ready to start?
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
          Trade smarter with{" "}
          <span className="text-neon">real-time intelligence</span>
        </h2>

        <p className="max-w-lg text-muted-foreground leading-relaxed text-pretty">
          Create your free account and get instant access to gas tracking, swap
          simulation, live market data, and your AI-powered personalized
          dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-neon text-background font-semibold rounded-xl px-7 py-3.5 text-sm hover:bg-neon/90 transition-all shadow-lg shadow-neon/20"
          >
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border/60 text-foreground rounded-xl px-7 py-3.5 text-sm hover:bg-card/60 transition-all backdrop-blur-sm"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </Link>
        </div>

        {/* Trust line */}
        <p className="text-xs text-muted-foreground">
          &nbsp;·&nbsp; Free to use
        </p>
      </div>
    </section>
  );
}
