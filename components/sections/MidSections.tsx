"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const photos = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
  "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=600&q=80",
];

const serviceNames = [
  "ERP Implementation","AI Integration & Automation","Project Management","Business Analysis",
  "Audit Services","Bookkeeping & Cloud Accounting","System & IT Audits","Financial Management & FP&A",
  "Cashflow Optimisation","Company Restructuring","Digital Marketing","Training Services",
  "Company Secretarial","VC & Fundraising Advisory","Risk & Compliance","M&E / Impact Assessment",
];

export function TickerBand() {
  const items = [...serviceNames, ...serviceNames]; // doubled for seamless loop
  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "rgba(55,180,180,.06)",
        borderTop: "1px solid rgba(55,180,180,.1)",
        borderBottom: "1px solid rgba(55,180,180,.1)",
      }}
    >
      <div className="marquee-track">
        {items.map((name, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-white/70 text-sm font-medium px-6 whitespace-nowrap">{name}</span>
            <span className="text-[#37B4B4] opacity-60 select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PhotoStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 h-[240px] overflow-hidden">
      {photos.map((src, i) => (
        <div key={i} className="relative overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="AK Prime Consulting"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            style={{ filter: "brightness(.72)" }}
            onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(.88)")}
            onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(.72)")}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(8,33,33,.7) 0%, transparent 60%)" }}
          />
        </div>
      ))}
    </div>
  );
}

export function ProblemSection({ onBooking }: { onBooking: () => void }) {
  return (
    <section className="py-24" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <ScrollReveal>
            <span className="section-label-light mb-5 inline-block">THE CHALLENGE</span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6" style={{ color: "#082121" }}>
              Most organisations run on systems that no longer scale.
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#3a5a5a" }}>
              Disconnected software, manual spreadsheets, and fragmented processes make it impossible to see the full picture of your business.
            </p>

            {/* Pain list */}
            <ul className="space-y-3 mb-8">
              {[
                "Financial reports take weeks — not hours",
                "Operations run on outdated, siloed tools",
                "Teams work in isolation instead of shared data",
                "Decisions are based on guesswork, not intelligence",
              ].map((pain) => (
                <li key={pain} className="flex items-start gap-3 text-[15px]" style={{ color: "#3a5a5a" }}>
                  <span className="shrink-0 mt-0.5 font-bold" style={{ color: "#d9534f" }}>✗</span>
                  {pain}
                </li>
              ))}
            </ul>

            {/* Resolution callout */}
            <div
              className="rounded-xl p-5 mb-8"
              style={{
                borderLeft: "3px solid #37B4B4",
                background: "rgba(55,180,180,.06)",
              }}
            >
              <p className="text-[15px] font-medium leading-relaxed" style={{ color: "#082121" }}>
                AK Prime Consulting replaces that complexity with clarity — and delivers measurable results from day one.
              </p>
            </div>

            <button
              onClick={onBooking}
              className="inline-block bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-7 py-3 rounded-xl text-sm transition-colors cta-pulse"
            >
              Start a Free Assessment →
            </button>
          </ScrollReveal>

          {/* Right Before/After */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-4">
              {/* Before */}
              <div className="rounded-2xl p-6" style={{ background: "#fff8f8", border: "1px solid rgba(217,83,79,.18)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#d9534f" }}>Before AK Prime</p>
                <ul className="space-y-2.5">
                  {[
                    "12-day month-end close",
                    "Manual data entry everywhere",
                    "5 disconnected systems",
                    "No real-time visibility",
                    "Finance team overwhelmed",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#3a5a5a" }}>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#d9534f" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-2xl p-6" style={{ background: "#f0fafa", border: "1px solid rgba(55,180,180,.25)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#37B4B4" }}>After AK Prime</p>
                <ul className="space-y-2.5">
                  {[
                    "3-day month-end close",
                    "60%+ processes automated",
                    "One unified ERP platform",
                    "Live dashboards 24/7",
                    "Finance team drives strategy",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#3a5a5a" }}>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#37B4B4" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
