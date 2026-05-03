"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/Primitives";
import { industriesData, type Industry } from "@/data/industries";

/* PROCESS — 5-phase framework, LIGHT background */
const PROCESS = [
  { num: "01", title: "Assess", desc: "Structured discovery — interviews, current-state mapping and gap analysis. Understand the business before proposing a solution." },
  { num: "02", title: "Design", desc: "Solution architecture, requirement specs, risk register and agreed KPIs. Nothing moves to implementation without sign-off." },
  { num: "03", title: "Implement", desc: "Deploy with formal change control and milestone governance. Payments tied to accepted deliverables." },
  { num: "04", title: "Train", desc: "Role-based training, SOPs, e-learning modules and competency assessment before go-live." },
  { num: "05", title: "Scale", desc: "30 / 60 / 90-day hypercare reviews, support log and lessons-learned session. Optimise as the business grows." },
];

export function ProcessSection() {
  return (
    <section className="bg-[#F4FAFA] text-[#082121] section-py border-t border-[#082121]/8">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="How we deliver"
            title="A proven 5-phase framework"
            sub="Every engagement. Every service line. Every time."
            align="center"
            light
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.num} delay={i * 60}>
              <div className="h-full p-5 lg:p-6 rounded-2xl bg-white border border-[#082121]/8 hover:border-[#37B4B4]/30 transition-colors">
                <div className="text-[#37B4B4] text-[11px] font-semibold tracking-[0.18em] mb-3">{p.num}</div>
                <h3 className="text-[#082121] text-[17px] mb-2.5">{p.title}</h3>
                <p className="text-[12.5px] text-[#3a5a5a] leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* INDUSTRIES — photo cards, DARK background */
export function IndustriesSection() {
  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <Reveal>
            <SectionHeader
              eyebrow="Sectors we serve"
              title="Built for your industry"
              sub="We don't apply generic templates. Every engagement draws on deep sector knowledge built across years of East African delivery."
            />
          </Reveal>
          <Reveal delay={100}>
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-[#37B4B4] hover:text-[#29E0C8] text-[14px] font-semibold">
              All industries <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industriesData.slice(0, 6).map((ind: Industry, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 60}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden ring-1 ring-white/10 hover:ring-[#37B4B4]/40 transition-all duration-300 shadow-lg shadow-black/25"
              >
                <Image
                  src={ind.photo}
                  alt={ind.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: "center 30%" }}
                  unoptimized
                />
                {/* Gradient: strong dark vignette at bottom, subtle at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
                {/* Top: industry index */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Bottom: title + description + arrow */}
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[21px] font-semibold tracking-tight leading-[1.15]">
                      {ind.name}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] text-white/65 leading-snug line-clamp-2">
                      {ind.shortDescription}
                    </p>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-[#37B4B4] text-white inline-flex items-center justify-center shrink-0 group-hover:bg-[#29E0C8] transition-colors duration-200 shadow-md">
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {industriesData.length > 6 && (
          <Reveal delay={200}>
            <div className="mt-6 text-center">
              <Link href="/industries" className="btn-ghost">
                View all {industriesData.length} industries <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
