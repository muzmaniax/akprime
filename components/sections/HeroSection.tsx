"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";

export function HeroSection({ onBooking }: { onBooking?: () => void }) {
  return (
    <section className="relative section-dark overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082121]/70 via-[#082121]/85 to-[#082121]" />
      </div>

      <div className="relative container-x pt-28 lg:pt-36 pb-24 lg:pb-28">
        <Reveal>
          <Eyebrow>Strategic Consulting</Eyebrow>
        </Reveal>

        <div className="mt-6 grid lg:grid-cols-12 gap-10 items-end">
          <Reveal delay={80} className="lg:col-span-8">
            <h1 className="text-balance text-white max-w-[18ch]">
              Strategic consulting for businesses ready to scale.
            </h1>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-4 lg:pb-3">
            <p className="text-[15px] md:text-[16px] text-white/65 leading-relaxed max-w-md">
              We help organisations navigate complexity. Make informed decisions, and
              build systems that scale — through clarity, structure, and disciplined execution.
            </p>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button type="button" onClick={onBooking} className="btn-cta">
              Book a consultation <ArrowUpRight size={16} strokeWidth={2.25} />
            </button>
            <Link href="/services" className="btn-ghost">
              Explore services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
