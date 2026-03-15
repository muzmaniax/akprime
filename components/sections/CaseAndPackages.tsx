"use client";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const metrics = [
  { value: "40%",  label: "Faster Month-End Close" },
  { value: "60%",  label: "Process Automation" },
  { value: "3x",   label: "Warehouse Visibility" },
  { value: "94%",  label: "User Adoption at 60 Days" },
];

const bars = [
  { label: "Month-End Speed",    pct: 72 },
  { label: "Process Automation", pct: 60 },
  { label: "User Adoption",      pct: 94 },
  { label: "Reporting Speed",    pct: 85 },
];

export function CaseStudiesSection({ onBooking }: { onBooking: () => void }) {
  const barsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-block">CASE STUDY</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              From Chaos to Clarity in 6 Months
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left — photo with overlay */}
              <div className="relative min-h-[320px] lg:min-h-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80"
                  alt="Manufacturing ERP case study"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(8,33,33,.7), rgba(8,33,33,.3))" }}
                />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-[#082121]"
                    style={{ background: "#37B4B4" }}>
                    Manufacturing · Nairobi · Odoo ERP
                  </span>
                </div>
              </div>

              {/* Right — content */}
              <div className="p-8 lg:p-10">
                <span className="section-label mb-4 inline-block text-[10px]">ERP Implementation · Odoo · 6 Months</span>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  A mid-size manufacturer was running finance on spreadsheets and production on paper. Month-end took 12 days. Inventory was invisible. AK Prime deployed Odoo ERP across finance, production and warehousing — in 6 months, on budget.
                </p>

                {/* 2×2 metric tiles */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-xl p-4 text-center"
                      style={{ background: "rgba(55,180,180,.08)", border: "1px solid rgba(55,180,180,.15)" }}>
                      <div className="text-2xl font-bold text-[#37B4B4]">{m.value}</div>
                      <div className="text-white/50 text-xs mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Animated bar chart */}
                <div ref={barsRef} className="space-y-3 mb-6">
                  {bars.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/55">{b.label}</span>
                        <span className="text-[#37B4B4] font-semibold">{b.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.06)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: visible ? `${b.pct}%` : "0%",
                            background: "linear-gradient(90deg,#37B4B4,#29E0C8)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onBooking}
                  className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-6 py-3 rounded-xl text-sm transition-colors cta-pulse"
                >
                  Start Your ERP Assessment →
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

