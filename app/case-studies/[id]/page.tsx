"use client";

import { use, useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Zap, Quote, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button-cva";
import { caseStudies } from "@/data/case-studies";
import { BookingModal } from "@/components/ui/BookingModal";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { useSiteImage } from "@/lib/use-site-images";

/* ══════════════════════════════════════════════════════════════════
   AnimatedStat — counts from 0 to target when scrolled into view
══════════════════════════════════════════════════════════════════ */
function AnimatedStat({
  value,
  label,
  index = 0,
}: {
  value: string;
  label: string;
  index?: number;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [count,   setCount]   = useState(0);
  const [started, setStarted] = useState(false);

  /* Parse: "KSh 8.5M" → prefix="KSh ", num=8.5, suffix="M" */
  const match   = value.match(/^([^0-9]*)([\d,.]+)(.*)$/);
  const prefix  = match ? match[1] : "";
  const numStr  = match ? match[2].replace(/,/g, "") : null;
  const suffix  = match ? match[3] : null;
  const target  = numStr ? parseFloat(numStr) : null;
  const decs    = numStr?.includes(".") ? numStr.split(".")[1].length : 0;
  const isText  = target === null; // non-numeric value like "Audit-Ready"

  useEffect(() => {
    if (!inView || started || target === null) {
      if (inView && target !== null) setCount(target);
      return;
    }
    if (reduced) { setCount(target); return; }
    setStarted(true);
    let raf: number;
    const duration   = 1800;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(parseFloat((eased * target).toFixed(decs)));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, started, target, decs, reduced]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col gap-3"
    >
      {/* Value */}
      <div
        className={`font-semibold tracking-tight leading-none tabular-nums ${
          isText
            ? "text-3xl sm:text-4xl lg:text-5xl text-white"
            : "text-[2.2rem] sm:text-5xl lg:text-[4rem] text-[#37B4B4]"
        }`}
      >
        {isText
          ? value
          : `${prefix}${count.toFixed(decs)}${suffix}`}
      </div>

      {/* Label */}
      <div className="text-[11px] text-white/50 font-medium uppercase tracking-[0.12em]">
        {label}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Smart inline highlight — for body text paragraphs
══════════════════════════════════════════════════════════════════ */
const PROBLEM_KEYWORDS = new Set([
  "manual","fragmented","reconciliation","visibility","inefficiency","siloed",
  "risk","errors","unreconciled","exposure","outstanding","growing","inaccurate",
  "missed","duplicate","overpaying","spreadsheets","lacking",
]);

const APPROACH_KEYWORDS = new Set([
  "automated","streamlined","integrated","unified","cleansing","real-time",
  "visibility","compliance","reconciled","migrated","structured","cloud",
  "accurate","clean","verified","resolved",
]);

function HighlightText({
  text,
  keywords,
}: {
  text: string;
  keywords: Set<string>;
}) {
  const words = text.split(/(\s+)/);
  return (
    <>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return " ";
        const base = w.replace(/[.,;:!?"'']+$/, "").toLowerCase();
        const hit  = keywords.has(base) || [...keywords].some(k => base.startsWith(k));
        return (
          <span key={i} className={hit ? "text-[#082121] font-medium" : ""}>
            {w}
          </span>
        );
      })}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Page
══════════════════════════════════════════════════════════════════ */
export default function CaseStudyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const baseStudy = caseStudies.find(s => s.id === resolvedParams.id);
  const [bookingOpen,  setBookingOpen]  = useState(false);
  const [cmsOverrides, setCmsOverrides] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/cms/content")
      .then(r => r.json())
      .then(d => setCmsOverrides(d?.["case-studies"]?.[resolvedParams.id] ?? null))
      .catch(() => {/* silently ignore */});
  }, [resolvedParams.id]);

  if (!baseStudy) return notFound();

  const overrides = (cmsOverrides ?? {}) as {
    title?: string; tagline?: string; summary?: string; duration?: string;
    metrics?: { value: string; label: string }[];
    narrative_problem?: string; narrative_outcome?: string;
    testimonial_quote?: string; testimonial_name?: string; testimonial_role?: string;
    approach?: { title: string; description: string; points: string[] }[];
  };

  const study = {
    ...baseStudy,
    title:    overrides.title    ?? baseStudy.title,
    tagline:  overrides.tagline  ?? baseStudy.tagline,
    summary:  overrides.summary  ?? baseStudy.summary,
    duration: overrides.duration ?? baseStudy.duration,
    metrics:  overrides.metrics  ?? baseStudy.metrics,
    narrative: {
      ...baseStudy.narrative,
      problem:  overrides.narrative_problem ?? baseStudy.narrative.problem,
      outcome:  overrides.narrative_outcome ?? baseStudy.narrative.outcome,
      approach: overrides.approach          ?? baseStudy.narrative.approach,
    },
    testimonial: {
      ...baseStudy.testimonial,
      quote: overrides.testimonial_quote ?? baseStudy.testimonial.quote,
      name:  overrides.testimonial_name  ?? baseStudy.testimonial.name,
      role:  overrides.testimonial_role  ?? baseStudy.testimonial.role,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cardImage        = useSiteImage(`casestudy.${resolvedParams.id}.image`)        || study.image;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const testimonialImage = useSiteImage(`casestudy.${resolvedParams.id}.testimonial`) || study.testimonial.image;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const clientLogo       = useSiteImage(`casestudy.${resolvedParams.id}.logo`);

  return (
    <main className="bg-[#F4FAFA] min-h-screen font-sans selection:bg-[#37B4B4]/30 selection:text-[#37B4B4] pb-24 overflow-x-hidden">

      {/* Back Link */}
      <div className="pt-10 lg:pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#082121]/50 hover:text-[#37B4B4] transition-all"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to case studies
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="pt-6 pb-14 lg:pt-8 lg:pb-20 border-b border-[#082121]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="section-overline mb-6">{study.industry}</span>
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-medium text-[#082121] tracking-tighter leading-[1.05] mt-6 mb-8">
                {study.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-[#082121]/50">
                <div>
                  <span className="text-[#37B4B4] font-medium">Client</span>&nbsp;&nbsp;
                  <span className="font-medium text-[#082121]">{study.client}</span>
                </div>
                <div className="w-px h-4 bg-[#082121]/15 self-center hidden sm:block" />
                <div>
                  <span className="text-[#37B4B4] font-medium">Region</span>&nbsp;&nbsp;
                  <span className="font-medium text-[#082121]">{study.location}</span>
                </div>
                <div className="w-px h-4 bg-[#082121]/15 self-center hidden sm:block" />
                <div>
                  <span className="text-[#37B4B4] font-medium">Duration</span>&nbsp;&nbsp;
                  <span className="font-medium text-[#082121]">{study.duration}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Two-column body ── */}
      <div className="pt-14 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-20">

          {/* ── Sidebar ── */}
          <aside className="space-y-8 order-2 lg:order-1 lg:sticky lg:top-28 self-start">

            {/* Info card */}
            <div className="rounded-2xl bg-white border border-[#082121]/8 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#37B4B4] to-[#29E0C8]" />
              <div className="p-6 space-y-5">
                <div className="pb-4 border-b border-[#082121]/8">
                  {clientLogo ? (
                    <img src={clientLogo} alt={study.client} className="h-10 w-auto object-contain" />
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#082121]/5 border border-[#082121]/8">
                      <span className="text-[13px] font-bold tracking-widest text-[#082121]/40 uppercase">{study.clientInitials}</span>
                      <span className="text-[13px] font-medium text-[#082121]/60">{study.client}</span>
                    </div>
                  )}
                </div>
                {[
                  { label: "Service",  value: study.solution  },
                  { label: "Industry", value: study.industry  },
                  { label: "Duration", value: study.duration  },
                  { label: "Period",   value: study.date      },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4 text-sm">
                    <span className="text-[#082121]/40 font-medium shrink-0">{label}</span>
                    <span className="font-medium text-[#082121] text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial portrait card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5] shadow-md border border-white/80">
              <img
                src={testimonialImage}
                alt={study.testimonial.name}
                className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-[#082121]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 backdrop-blur-sm bg-white/10 border-t border-white/10">
                <Quote size={16} className="text-[#37B4B4] mb-2 sm:mb-3" />
                <p className="text-white/90 text-[13px] sm:text-sm leading-relaxed italic mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-white text-[13px] sm:text-sm font-medium truncate">{study.testimonial.name}</p>
                    <p className="text-[#37B4B4] text-[11px] sm:text-xs truncate">{study.testimonial.role}</p>
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button onClick={() => setBookingOpen(true)} variant="primary" size="md" fullWidth>
              Start your assessment
            </Button>
          </aside>

          {/* ── Main body ── */}
          <div className="space-y-16 lg:space-y-24 order-1 lg:order-2">

            {/* The challenge */}
            <ScrollReveal>
              <section className="space-y-5">
                <span className="section-overline">The challenge</span>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium text-[#082121] tracking-tighter leading-[1.1] max-w-2xl mt-4">
                  {study.title}
                </h2>
                <p className="text-base lg:text-lg text-[#082121]/65 leading-relaxed max-w-2xl">
                  <HighlightText text={study.narrative.problem} keywords={PROBLEM_KEYWORDS} />
                </p>
              </section>
            </ScrollReveal>

            {/* The approach */}
            <ScrollReveal delay={0.05}>
              <section className="space-y-10">
                <span className="section-overline">The approach</span>
                <div className="space-y-10 mt-4">
                  {study.narrative.approach.map((step, idx) => (
                    <div key={idx} className="flex gap-5">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4] text-sm font-medium">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="space-y-3 pt-1">
                        <h3 className="text-lg font-medium text-[#082121] leading-snug">{step.title}</h3>
                        <p className="text-base text-[#082121]/60 leading-relaxed">
                          <HighlightText text={step.description} keywords={APPROACH_KEYWORDS} />
                        </p>
                        {step.points?.length > 0 && (
                          <ul className="space-y-2 mt-2">
                            {step.points.map((p, pIdx) => (
                              <li key={pIdx} className="flex gap-3 items-start text-sm text-[#082121]/65 leading-relaxed">
                                <CheckCircle2 size={15} className="text-[#37B4B4] shrink-0 mt-0.5" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          Results / Quantified Outcome Section
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-24 lg:mt-36 bg-[#082121] py-20 lg:py-32 relative overflow-hidden">

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #37B4B4 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Radial glow — top right */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(55,180,180,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Radial glow — bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(41,224,200,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Overline */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-7 rounded-full bg-[#37B4B4]/15 border border-[#37B4B4]/25 flex items-center justify-center">
                <TrendingUp size={13} className="text-[#37B4B4]" />
              </div>
              <span className="section-overline !text-[#37B4B4]/70">Quantified outcome</span>
            </div>
          </ScrollReveal>

          {/* Word-by-word animated outcome text */}
          <h2 className="text-2xl sm:text-4xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.12] max-w-4xl mt-2 mb-16">
            <WordReveal text={study.narrative.outcome} stagger={0.03} />
          </h2>

          {/* ── Metrics grid ── */}
          <div
            className="grid gap-px rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{
              gridTemplateColumns: `repeat(${Math.min(study.metrics.length, 3)}, 1fr)`,
            }}
          >
            {study.metrics.map((m, idx) => (
              <div
                key={idx}
                className="px-8 py-10 lg:px-10 lg:py-12 relative"
              >
                <AnimatedStat value={m.value} label={m.label} index={idx} />
              </div>
            ))}
          </div>

          {/* Bottom CTA row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-16 pt-12 border-t border-white/[0.07]">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4]">
                <Zap size={22} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Drive similar impact</p>
                <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                  Our frameworks are sector-agnostic and outcome-driven.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
              <Button
                onClick={() => setBookingOpen(true)}
                variant="primary"
                size="md"
                fullWidth
                className="sm:w-auto"
              >
                Book discovery session
              </Button>
              <Button
                href="/case-studies"
                variant="secondary"
                size="md"
                fullWidth
                className="sm:w-auto"
              >
                View all cases
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </main>
  );
}
