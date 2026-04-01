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
  LayoutPanelTop 
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
    <div className="grid grid-cols-2 md:grid-cols-4 h-[180px] overflow-hidden">
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
    <section className="py-12 lg:py-20 relative overflow-hidden section-tint">
      {/* Background architectural texture for scale */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#37B4B4]/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <ScrollReveal>
            <span className="section-label-light mb-4 inline-block">THE CHALLENGE</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "#082121", lineHeight: 1.15 }}>
              Most organisations run on systems that no longer scale.
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "#3a5a5a" }}>
              Disconnected software, manual spreadsheets, and fragmented processes make it impossible to see the full picture of your business.
            </p>

            {/* Pain list */}
            <ul className="space-y-2 mb-6">
              {[
                "Financial reports take weeks — not hours",
                "Operations run on outdated, siloed tools",
                "Teams work in isolation instead of shared data",
                "Decisions are based on guesswork, not intelligence",
              ].map((pain) => (
                <li key={pain} className="flex items-start gap-3 text-sm md:text-base" style={{ color: "#3a5a5a" }}>
                  <span className="shrink-0 mt-0.5 font-bold" style={{ color: "#d9534f" }}>✗</span>
                  {pain}
                </li>
              ))}
            </ul>

            {/* Resolution callout */}
            <div
              className="rounded-[10px] p-4 mb-6 border-l-[3px]"
              style={{
                borderColor: "#37B4B4",
                background: "rgba(55,180,180,.08)",
              }}
            >
              <p className="text-sm md:text-base font-medium leading-relaxed" style={{ color: "#082121" }}>
                AK Prime Consulting replaces that complexity with clarity — and delivers measurable results from day one.
              </p>
            </div>

            <button
              onClick={onBooking}
              className="inline-block bg-[#082121] hover:bg-[#0E3E3E] text-white font-bold px-6 py-3 rounded-[10px] text-sm transition-all shadow-lg shadow-black/10 group"
            >
              Start a Free Assessment <span className="inline-block group-hover:translate-x-1 transition-transform ml-1">→</span>
            </button>
          </ScrollReveal>

          {/* Right Before/After Comparison */}
          <ScrollReveal delay={0.15}>
            <div className="relative space-y-8">
              {/* Transition Indicator Line */}
              <div className="absolute left-[2.4rem] top-24 bottom-24 w-1 bg-gradient-to-b from-red-500/10 via-[#37B4B4]/20 to-[#37B4B4]/10 hidden sm:block" />

              {/* Status Quo Card */}
              <div 
                className="relative rounded-[16px] p-5 sm:p-7 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5 group" 
                style={{ background: "#FFFDFD", border: "1px solid rgba(217,83,79,.15)" }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-[10px] bg-red-50 flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-100 transition-colors">
                    <AlertTriangle className="text-red-500" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-red-500/60">THE STATUS QUO (CHAOS)</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <XCircle className="text-red-400 shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-bold text-[#4a6a6a]">12-Day Closures</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <XCircle className="text-red-400 shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-bold text-[#4a6a6a]">Manual Data Entry</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <XCircle className="text-red-400 shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-bold text-[#4a6a6a]">Siloed Software</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <XCircle className="text-red-400 shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-bold text-[#4a6a6a]">Revenue Leakage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Transformation Badge */}
              <div className="flex justify-center -my-4 relative z-30">
                <div className="bg-[#37B4B4] text-white px-6 py-2 rounded-full font-black text-xs tracking-widest shadow-xl shadow-[#37B4B4]/40 border-2 border-white transform hover:scale-105 transition-transform cursor-default">
                  AK PRIME TRANSFORMATION
                </div>
              </div>

              {/* AK Prime Edge Card */}
              <div 
                className="relative rounded-[16px] p-5 sm:p-7 transition-all duration-500 hover:shadow-xl hover:shadow-[#37B4B4]/20 group overflow-hidden" 
                style={{ background: "#F2FCFC", border: "2px solid #37B4B4" }}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#37B4B4]/5 rounded-bl-[60px] pointer-events-none" />
                
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-[10px] bg-[#37B4B4] flex items-center justify-center shrink-0 shadow-md shadow-[#37B4B4]/30 group-hover:scale-110 transition-transform">
                    <Rocket className="text-white" size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#37B4B4]">THE AK PRIME EDGE (CLARITY)</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="text-[#37B4B4] shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-extrabold text-[#082121]">3-Day Month End</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Cpu className="text-[#37B4B4] shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-extrabold text-[#082121]">60% Automation</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Database className="text-[#37B4B4] shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-extrabold text-[#082121]">Unified Platform</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <TrendingUp className="text-[#37B4B4] shrink-0" size={16} />
                          <span className="text-sm sm:text-base font-extrabold text-[#082121]">Live Dashboards</span>
                        </div>
                      </div>
                    </div>
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
