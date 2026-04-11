"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { 
  AlertTriangle, 
  Rocket, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Cpu, 
  Database, 
  LayoutPanelTop,
  ArrowRight
} from "lucide-react";


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
    <div className="grid grid-cols-2 md:grid-cols-4 h-auto md:h-[180px] overflow-hidden">
      {photos.map((src, i) => (
        <div key={i} className="relative overflow-hidden group aspect-[4/3] md:aspect-auto">
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
    <section className="py-12 lg:py-16 relative overflow-hidden bg-white">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <ScrollReveal>
            <span className="section-overline mb-4 inline-block">The challenge</span>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] mb-4 text-[#082121]">
              Most organisations run on systems that no longer scale.
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-6 font-medium" style={{ color: "#3a5a5a" }}>
              Disconnected software, manual spreadsheets, and fragmented processes make it impossible to see the full picture of your business.
            </p>

            {/* Pain list */}
            <ul className="space-y-3 mb-6">
              {[
                "Financial reports take weeks — not hours",
                "Operations run on outdated, siloed tools",
                "Teams work in isolation instead of shared data",
                "Decisions are based on guesswork, not intelligence",
              ].map((pain) => (
                <li key={pain} className="flex items-start gap-3 text-sm lg:text-base font-semibold" style={{ color: "#3a5a5a" }}>
                  <span className="shrink-0 mt-0.5 font-bold" style={{ color: "#d9534f" }}>✗</span>
                  {pain}
                </li>
              ))}
            </ul>

            <button
              onClick={onBooking}
              className="pill-e shadow-2xl shadow-black/20"
            >
              <div className="pill-e-group">
                Start free assessment
                <div className="pill-e-icon"><ArrowRight /></div>
              </div>
            </button>
          </ScrollReveal>

          {/* Right Comparison Cards */}
          <ScrollReveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 items-stretch">
              {/* Card 1: The status quo */}
              <div 
                className="group relative w-full lg:max-w-[620px] rounded-[20px] overflow-hidden flex flex-col transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default hover:-translate-y-1 h-full"
              >
                {/* Photo Area Scale: Desktop 180px, Tablet 180px, Mobile 180px */}
                <div className="relative h-[180px] sm:h-[180px] lg:h-[180px] w-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
                    alt="Office chaos spreadsheets"
                    className="w-full h-full object-cover object-top transition-transform duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
                  />
                  {/* Progressive blur fade at bottom - 50% height */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, transparent 0%, #4a0a0a 100%)"
                    }}
                  />
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#4a0a0a] px-6 pb-8 pt-0 flex flex-col justify-start">
                  <div className="-mt-[18px] mb-4 relative z-10 self-start">
                    <span 
                      className="inline-flex items-center justify-center h-7 px-4 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase backdrop-blur-[6px]"
                      style={{ 
                        background: "rgba(255,255,255,0.12)", 
                        color: "#fca5a5", 
                        border: "1px solid rgba(255,150,150,0.28)" 
                      }}
                    >
                      The status quo
                    </span>
                  </div>
                  <h4 className="text-[19px] sm:text-[17px] lg:text-[19px] font-medium text-white m-0 leading-[1.25] mb-3">
                    Where most businesses are stuck
                  </h4>
                  <p className="text-[13px] text-white/60 leading-relaxed mb-4">
                    Fragmented systems create invisible costs every single day.
                  </p>
                  <div className="flex flex-wrap gap-y-[7px]">
                    {[
                      "12-day closures",
                      "Siloed software",
                      "Manual entry",
                      "Revenue leakage",
                    ].map((item) => (
                      <div key={item} className="w-1/2 flex items-center gap-[7px] whitespace-nowrap pr-[8px]">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#fca5a5] shrink-0" />
                        <span className="text-[12px] font-medium text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: The AK Prime edge */}
              <div 
                className="group relative w-full lg:max-w-[620px] rounded-[20px] overflow-hidden flex flex-col transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default hover:-translate-y-1 h-full"
              >
                {/* Photo Area Scale: Desktop 180px, Tablet 180px, Mobile 180px */}
                <div className="relative h-[180px] sm:h-[180px] lg:h-[180px] w-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
                    alt="Modern data dashboard"
                    className="w-full h-full object-cover object-top transition-transform duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
                  />
                  {/* Progressive blur fade at bottom - 50% height */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, transparent 0%, #082121 100%)"
                    }}
                  />
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#082121] px-6 pb-8 pt-0 flex flex-col justify-start">
                  <div className="-mt-[18px] mb-4 relative z-10 self-start">
                    <span 
                      className="inline-flex items-center justify-center h-7 px-4 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase backdrop-blur-[6px]"
                      style={{ 
                        background: "rgba(55,180,180,0.18)", 
                        color: "#29E0C8", 
                        border: "1px solid rgba(55,180,180,0.32)" 
                      }}
                    >
                      The AK Prime edge
                    </span>
                  </div>
                  <h4 className="text-[19px] sm:text-[17px] lg:text-[19px] font-medium text-white m-0 leading-[1.25] mb-3">
                    Where we take you
                  </h4>
                  <p className="text-[13px] text-white/60 leading-relaxed mb-4">
                    A unified platform with real-time visibility across all operations.
                  </p>
                  <div className="flex flex-wrap gap-y-[7px]">
                    {[
                      "3-day close",
                      "Unified platform",
                      "60% automation",
                      "Live dashboards",
                    ].map((item) => (
                      <div key={item} className="w-1/2 flex items-center gap-[7px] whitespace-nowrap pr-[8px]">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#29E0C8] shrink-0" />
                        <span className="text-[12px] font-medium text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
