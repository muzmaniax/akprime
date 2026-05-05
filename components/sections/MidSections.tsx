"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, StatCell } from "@/components/ui/Primitives";

/* ── About / Stats block — Tailwind UI "Split with image" stats pattern ── */
export function ProblemSection({ onBooking: _onBooking }: { onBooking?: () => void }) {
  return (
    <section className="bg-white section-py">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT — text + stats */}
          <Reveal>
            <Eyebrow>About AK Prime</Eyebrow>
            <h2 className="mt-4 text-[#082121] text-balance">
              A pan-African consulting firm helping organisations move with clarity.
            </h2>
            <p className="mt-5 text-[15px] text-[#3a5a5a] leading-relaxed">
              AK Prime is a management and technology consulting firm with offices in
              Nairobi and Mombasa. We partner with organisations across East Africa to
              replace fragmented systems, automate critical workflows, and build
              data-driven operations that enable confident, sustainable growth.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#082121] text-[14px] font-semibold transition-colors"
            >
              Learn more about us <ArrowUpRight size={14} />
            </Link>

            {/* Stats row */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#082121]/10 pt-10">
              {[
                { value: "20+",  label: "Engagements delivered" },
                { value: "23",   label: "Integrated service lines" },
                { value: "98%",  label: "Client satisfaction" },
                { value: "94%",  label: "Avg. user adoption" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-[13px] text-[#3a5a5a] leading-tight">{s.label}</dt>
                  <dd className="mt-1 text-[40px] font-semibold tracking-tight text-[#082121] leading-none">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* RIGHT — photo */}
          <Reveal delay={120}>
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80"
                  alt="AK Prime consulting team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block bg-white rounded-2xl shadow-xl border border-[#082121]/8 px-6 py-5">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#37B4B4]">East Africa</p>
                <p className="mt-1 text-[22px] font-semibold text-[#082121] leading-none">Nairobi & Mombasa</p>
                <p className="mt-1 text-[12px] text-[#3a5a5a]">Two offices, one team</p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export function TickerBand() { return null; }
export function PhotoStrip() { return null; }
