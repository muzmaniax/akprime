"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, StatCell } from "@/components/ui/Primitives";
import { useSiteImage } from "@/lib/use-site-images";

/* ── Animated counter — counts from 0 to target when scrolled into view ── */
function CountUp({ raw }: { raw: string }) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return <>{raw}</>;
  const target = parseInt(match[1], 10);
  const suffix = match[2]; // "+", "%", or ""

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        let startTime: number | null = null;
        const step = (ts: number) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setCount(Math.floor(eased * target));
          if (progress < 1) raf = requestAnimationFrame(step);
          else setCount(target);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── About / Stats block ── */
export function ProblemSection({ onBooking: _onBooking }: { onBooking?: () => void }) {
  const aboutPhoto = useSiteImage("home.about_photo");
  return (
    <section className="bg-white section-py">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center lg:items-stretch">

          {/* LEFT — text + stats */}
          <Reveal>
            <Eyebrow>About AK Prime</Eyebrow>
            <h2 className="mt-3 text-[#082121] text-balance">
              A consulting firm helping organisations move with clarity.
            </h2>
            <p className="mt-3 text-[13px] font-light text-[#5a7a7a] leading-[1.65] tracking-[0.01em] max-w-[42ch]">
              Headquartered in Mombasa with offices in Nairobi and Dubai, we help
              organisations build the systems, structure, and financial discipline
              that growth demands.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#082121] text-[13px] font-semibold transition-colors"
            >
              Learn more about us <ArrowUpRight size={13} />
            </Link>

            {/* Stats row */}
            <dl className="mt-7 lg:mt-5 grid grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-4 border-t border-[#082121]/10 pt-7 lg:pt-5">
              {[
                { value: "20+", label: "Engagements delivered" },
                { value: "23",  label: "Integrated service lines" },
                { value: "98%", label: "Client satisfaction" },
                { value: "94%", label: "Avg. user adoption" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-[11px] text-[#3a5a5a] leading-tight">{s.label}</dt>
                  <dd className="mt-0.5 text-[28px] lg:text-[26px] font-semibold tracking-tight text-[#082121] leading-none">
                    <CountUp raw={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* RIGHT — photo */}
          <Reveal delay={120} className="lg:h-full">
            <div className="aspect-[4/5] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-2xl">
              <img
                src={aboutPhoto || "/images/team-collaboration.jpg"}
                alt="AK Prime consulting team"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

        </div>
        </div>
      </div>
    </section>
  );
}

export function TickerBand() { return null; }
export function PhotoStrip() { return null; }
