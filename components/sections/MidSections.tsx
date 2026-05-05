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
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-[#082121]/8 bg-gradient-to-br from-[#F4FAFA] to-[#E8F7F7] flex items-center justify-center">
            <svg viewBox="0 0 300 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Background grid pattern */}
              {[0, 1, 2, 3, 4].map((i) =>
                [0, 1, 2, 3, 4].map((j) => (
                  <rect key={`${i}-${j}`} x={i * 60} y={j * 80} width="60" height="80" fill="none" stroke="#082121" strokeWidth="0.5" opacity="0.1" />
                ))
              )}

              {/* Data visualization - abstract business metrics */}
              {/* Left column - ascending bars */}
              {[1, 2, 3, 4, 5].map((i) => (
                <rect key={`bar-${i}`} x="40" y={360 - i * 55} width="30" height={i * 55} fill="#37B4B4" opacity={0.2 + i * 0.12} />
              ))}

              {/* Center - network nodes */}
              <circle cx="150" cy="80" r="12" fill="#37B4B4" opacity="0.3" />
              <circle cx="150" cy="80" r="8" fill="#37B4B4" />
              {[0, 1, 2, 3].map((i) => {
                const angle = (i / 4) * Math.PI * 2;
                const x = 150 + Math.cos(angle) * 60;
                const y = 80 + Math.sin(angle) * 60;
                return (
                  <g key={`node-${i}`}>
                    <line x1="150" y1="80" x2={x} y2={y} stroke="#082121" strokeWidth="1" opacity="0.15" />
                    <circle cx={x} cy={y} r="6" fill="white" stroke="#082121" strokeWidth="1" opacity="0.4" />
                  </g>
                );
              })}

              {/* Right column - growth curve */}
              <path
                d="M 220 320 Q 240 260, 250 180 T 270 80"
                stroke="#37B4B4"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 220 320 L 270 80 L 280 320 Z"
                fill="#37B4B4"
                opacity="0.08"
              />

              {/* Accent circles at bottom */}
              <circle cx="80" cy="340" r="4" fill="#37B4B4" opacity="0.4" />
              <circle cx="150" cy="360" r="4" fill="#37B4B4" opacity="0.6" />
              <circle cx="220" cy="340" r="4" fill="#37B4B4" opacity="0.4" />
            </svg>
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
              <StatCell value="20+" label="Engagements delivered" light />
              <StatCell value="23" label="Integrated service lines" light />
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
