"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, StatCell } from "@/components/ui/Primitives";

/* About / intro stat block — LIGHT */
export function ProblemSection({ onBooking: _onBooking }: { onBooking?: () => void }) {
  return (
    <section className="bg-white text-[#082121] section-py border-t border-[#082121]/8">
      <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-5">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-[#082121]/8">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80')",
              }}
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <Eyebrow>About AK Prime</Eyebrow>
            <h2 className="mt-4 text-[#082121] text-balance max-w-[20ch]">
              A pan-African consulting firm helping organisations move with clarity.
            </h2>
            <p className="mt-5 text-[16px] text-[#3a5a5a] leading-relaxed max-w-2xl">
              AK Prime is a management and technology consulting firm with offices in
              Nairobi and Mombasa. We partner with organisations across East Africa to
              replace fragmented systems, automate critical workflows, and build
              data-driven operations that enable confident, sustainable growth.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6 border-t border-[#082121]/10">
              <StatCell value="120+" label="Engagements delivered" light />
              <StatCell value="16" label="Integrated service lines" light />
              <StatCell value="98%" label="Client satisfaction" light />
              <StatCell value="94%" label="Avg. user adoption" light />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <Link href="/about" className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#082121] text-[14px] font-semibold">
              Learn more about us <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Empty exports for backward compatibility */
export function TickerBand() { return null; }
export function PhotoStrip() { return null; }
