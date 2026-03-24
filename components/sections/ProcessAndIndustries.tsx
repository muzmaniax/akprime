"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextEffect } from "@/components/motion-primitives/text-effect";

const steps = [
  { num: "01", emoji: "🔎", title: "Assess",
    desc: "Analyse current systems, processes and data. Map gaps and opportunities." },
  { num: "02", emoji: "🗺️", title: "Design",
    desc: "Build the transformation roadmap — requirements, architecture, vendor selection." },
  { num: "03", emoji: "⚙️", title: "Implement",
    desc: "Configure, migrate and deploy with formal change control and milestone gates." },
  { num: "04", emoji: "🎓", title: "Train",
    desc: "Role-based training, SOPs and knowledge transfer for full team adoption." },
  { num: "05", emoji: "📈", title: "Scale",
    desc: "30/60/90-day reviews, hypercare support and continuous optimisation." },
];

import { industriesData } from "@/data/industries";
import Link from "next/link";

export function ProcessSection() {
  return (
    <section className="py-24 section-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-label-light mb-4 inline-block">HOW WE WORK</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "#082121" }}>
              <TextEffect preset="blur" per="word" as="span">A Proven Delivery Framework</TextEffect>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.1}>
              <div className="light-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
                {/* Background step number */}
                <span
                  className="absolute -top-3 right-3 text-[5.5rem] font-bold italic select-none leading-none pointer-events-none"
                  style={{ color: "#37B4B4", opacity: 0.13 }}
                >
                  {s.num}
                </span>

                <span className="text-2xl mb-3">{s.emoji}</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#37B4B4" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#3a5a5a" }}>{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


export function IndustriesSection() {
  return (
    <section className="py-24 section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-label-light mb-4 inline-block">SECTORS WE SERVE</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: "#082121" }}>
              <TextEffect preset="blur" per="word" as="span">Solutions Built For Your Industry</TextEffect>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industriesData.map((ind, i) => (
            <ScrollReveal key={ind.slug} delay={i * 0.07}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group block relative rounded-[32px] overflow-hidden cursor-pointer"
                style={{ aspectRatio: "10 / 11" }}
              >
                {/* Full-bleed background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.photo}
                  alt={ind.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Layer 1: Base dark gradient from bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(4,20,20,0.97) 0%, rgba(4,20,20,0.75) 35%, rgba(4,20,20,0.2) 60%, transparent 100%)",
                  }}
                />

                {/* Layer 2: Progressive blur — masked to bottom half only */}
                <div
                  className="absolute inset-0 backdrop-blur-[6px]"
                  style={{
                    maskImage:
                      "linear-gradient(to top, black 0%, black 30%, transparent 60%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, black 0%, black 30%, transparent 60%)",
                  }}
                />

                {/* Layer 3: Subtle teal tint at the very bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(55,180,180,0.18) 0%, transparent 40%)",
                  }}
                />

                {/* Content — bottom-left aligned */}
                <div className="absolute inset-x-0 bottom-0 p-7 z-10">
                  {/* Category label */}
                  <p className="text-[#37B4B4] text-[11px] font-bold uppercase tracking-[0.18em] mb-2 opacity-90">
                    {ind.shortDescription}
                  </p>

                  {/* Industry name */}
                  <h3 className="text-white font-bold text-xl leading-tight mb-2 group-hover:text-[#29E0C8] transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {ind.name}
                  </h3>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-white/70 text-xs font-semibold group-hover:text-white transition-colors duration-300">
                    Explore Capabilities
                    <svg
                      className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-[32px] border-2 border-transparent group-hover:border-[#37B4B4]/40 transition-all duration-400 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 0 rgba(55,180,180,0)",
                  }}
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

