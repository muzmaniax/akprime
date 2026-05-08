"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, SectionHeader } from "@/components/ui/Primitives";
import { industriesData, type Industry } from "@/data/industries";

/* ─── PROCESS — Tailwind UI "numbered steps with dividers" ─── */
const PROCESS = [
  { num: "01", title: "Assess", desc: "Structured discovery — stakeholder interviews, current-state mapping, and gap analysis before a single recommendation is made." },
  { num: "02", title: "Design", desc: "Solution architecture, requirement specs, risk register and agreed KPIs. Nothing moves to implementation without sign-off." },
  { num: "03", title: "Implement", desc: "Deploy with formal change control and milestone governance. Payments tied to accepted deliverables." },
  { num: "04", title: "Train", desc: "Role-based training, SOPs, and competency assessment completed before go-live. No surprises on day one." },
  { num: "05", title: "Scale", desc: "30/60/90-day hypercare reviews, optimisation cycles, and a lessons-learned session as the business grows." },
];

export function ProcessSection() {
  return (
    <section className="bg-[#F4FAFA] section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left — sticky label */}
          <Reveal className="lg:col-span-4">
            <Eyebrow>How we deliver</Eyebrow>
            <h2 className="mt-4 text-[#082121] text-balance max-w-[18ch]">
              A proven 5-phase framework.
            </h2>
            <p className="mt-5 text-[14px] text-[#3a5a5a] leading-relaxed">
              Every engagement. Every service line. Every time. No shortcuts, no junior shuffle — just structured delivery from discovery to scale.
            </p>
          </Reveal>

          {/* Right — steps list */}
          <div className="lg:col-span-8">
            <dl className="space-y-0 divide-y divide-[#082121]/8">
              {PROCESS.map((p, i) => (
                <Reveal key={p.num} delay={i * 60}>
                  <div className="grid sm:grid-cols-12 gap-4 py-7">
                    <dt className="sm:col-span-3 flex items-start gap-3">
                      <span className="text-[12px] font-semibold tracking-widest text-[#37B4B4] mt-0.5">{p.num}</span>
                      <span className="text-[17px] font-medium text-[#082121]">{p.title}</span>
                    </dt>
                    <dd className="sm:col-span-9 text-[14px] text-[#3a5a5a] leading-relaxed">
                      {p.desc}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── INDUSTRIES — photo cards, dark background ─── */
export function IndustriesSection() {
  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <Reveal>
            <Eyebrow>Sectors we serve</Eyebrow>
            <h2 className="mt-4 text-white text-balance max-w-[22ch]">Built for your industry.</h2>
            <p className="mt-4 text-[14px] text-white/60 leading-relaxed max-w-xl">
              We don't apply generic templates. Every engagement draws on deep sector knowledge built across years of East African delivery.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-[#37B4B4] hover:text-[#29E0C8] text-[14px] font-semibold transition-colors">
              All industries <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industriesData.slice(0, 6).map((ind: Industry, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 60}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative block aspect-[4/5] sm:aspect-[7/8] rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-[#37B4B4]/40 transition-all duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Index */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[22px] font-medium leading-snug">{ind.name}</h3>
                    <p className="mt-1.5 text-[13px] text-white/70 leading-snug line-clamp-2">{ind.shortDescription}</p>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-[#37B4B4] text-white inline-flex items-center justify-center shrink-0 group-hover:bg-[#29E0C8] transition-colors shadow-md">
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {industriesData.length > 6 && (
          <Reveal delay={200}>
            <div className="mt-8 flex justify-center">
              <Link href="/industries" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[#37B4B4] hover:text-[#29E0C8] text-[13px] sm:text-[14px] font-semibold transition-colors whitespace-nowrap sm:whitespace-normal">
                View all {industriesData.length} industries <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
