"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
              A Proven Delivery Framework
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
              Solutions Built For Your Industry
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industriesData.map((ind, i) => (
            <ScrollReveal key={ind.slug} delay={i * 0.07}>
              <Link
                href={`/industries/${ind.slug}`}
                className="block light-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-[#37B4B4]/40"
                style={{ boxShadow: "0 2px 16px rgba(8,33,33,.06)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.photo}
                  alt={ind.name}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ height: "120px", filter: "brightness(.82)" }}
                />
                <div className="p-5 bg-white relative z-10 transition-colors group-hover:bg-[#F4FAFA]">
                  <h3 className="font-bold text-lg mb-1.5 text-[#082121] group-hover:text-[#37B4B4] transition-colors line-clamp-1">{ind.name}</h3>
                  <p className="text-sm leading-relaxed text-[#3a5a5a] mb-3 line-clamp-2">{ind.shortDescription}</p>
                  <span className="text-sm font-bold text-[#37B4B4] uppercase tracking-wider">Explore Capabilities →</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
