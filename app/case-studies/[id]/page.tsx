"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Zap, Quote } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { BookingModal } from "@/components/ui/BookingModal";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function CaseStudyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const study = caseStudies.find(s => s.id === resolvedParams.id);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!study) return notFound();

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

      {/* Hero */}
      <section className="pt-6 pb-14 lg:pt-8 lg:pb-20 border-b border-[#082121]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-4xl">
              {/* Category pill */}
              <span className="section-overline mb-6">{study.industry}</span>
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-medium text-[#082121] tracking-tighter leading-[1.05] mt-6 mb-8">
                {study.title}
              </h1>
              {/* Meta row */}
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

      {/* Two-column body */}
      <div className="pt-14 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-20">

          {/* ── Sidebar ── */}
          <aside className="space-y-8 order-2 lg:order-1 lg:sticky lg:top-28 self-start">

            {/* Info card */}
            <div className="rounded-2xl bg-white border border-[#082121]/8 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#37B4B4] to-[#29E0C8]" />
              <div className="p-6 space-y-5">
                {[
                  { label: "Service", value: study.solution },
                  { label: "Client", value: study.client },
                  { label: "Duration", value: study.duration },
                  { label: "Completed", value: study.date },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4 text-sm">
                    <span className="text-[#082121]/40 font-medium shrink-0">{label}</span>
                    <span className="font-medium text-[#082121] text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial portrait card - hidden on mobile in favor of a simpler treatment if needed, but keeping for now with smaller scale */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5] shadow-md border border-white/80">
              <img
                src={study.testimonial.image}
                alt={study.testimonial.name}
                className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-[#082121]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 backdrop-blur-sm bg-white/10 border-t border-white/10">
                <Quote size={16} className="text-[#37B4B4] mb-2 sm:mb-3" />
                <p className="text-white/90 text-[13px] sm:text-sm leading-relaxed italic mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                  "{study.testimonial.quote}"
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
            <button onClick={() => setBookingOpen(true)} className="pill-e w-full">
              <div className="pill-e-group">
                Start your assessment
                <div className="pill-e-icon"><span className="text-white text-[15px]">→</span></div>
              </div>
            </button>
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
                  {(() => {
                    const keywords = ["manual", "fragmented", "reconciliation", "visibility", "inefficiency", "siloed", "risk", "errors"];
                    return study.narrative.problem.split(" ").map((word, i) => {
                      const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase()));
                      return (
                        <span key={i} className={isKeyword ? "text-[#082121] font-medium" : ""}>{word}{" "}</span>
                      );
                    });
                  })()}
                </p>
              </section>
            </ScrollReveal>

            {/* The approach */}
            <ScrollReveal delay={0.1}>
              <section className="space-y-10">
                <span className="section-overline">The approach</span>
                <div className="space-y-10 mt-4">
                  {study.narrative.approach.map((step, idx) => (
                    <div key={idx} className="flex gap-5">
                      {/* Step number */}
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4] text-sm font-medium">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="space-y-3 pt-1">
                        <h3 className="text-lg font-medium text-[#082121] leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-base text-[#082121]/60 leading-relaxed">
                          {(() => {
                            const keywords = ["automated", "streamlined", "integrated", "unified", "cleansing", "real-time", "visibility", "compliance"];
                            return step.description.split(" ").map((word, i) => {
                              const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase()));
                              return (
                                <span key={i} className={isKeyword ? "text-[#082121] font-medium" : ""}>{word}{" "}</span>
                              );
                            });
                          })()}
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

      {/* Results section */}
      <section className="mt-24 lg:mt-36 bg-[#082121] py-20 lg:py-32 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 p-24 text-[#37B4B4]/5 pointer-events-none">
          <CheckCircle2 size={400} strokeWidth={0.3} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="section-overline mb-8">Quantified outcome</span>
            <h2 className="text-3xl sm:text-5xl lg:text-[4rem] font-medium text-white tracking-tighter leading-[1.05] max-w-4xl mt-6 mb-14">
              {(() => {
                const keywords = ["Revenue", "Growth", "Impact", "Efficiency", "Automated", "65%", "40%", "Results:"];
                return study.narrative.outcome.split(" ").map((word, i) => {
                  const isKeyword = keywords.some(k => word.includes(k));
                  return (
                    <span key={i} className={isKeyword ? "text-[#37B4B4]" : ""}>{word}{" "}</span>
                  );
                });
              })()}
            </h2>
          </ScrollReveal>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-20 py-14 border-t border-b border-white/10 mb-16">
            {study.metrics.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="text-5xl lg:text-7xl font-medium text-[#37B4B4] tracking-tighter leading-none">
                  {m.value}
                </div>
                <div className="text-sm text-white/45 font-medium">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
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
              <button onClick={() => setBookingOpen(true)} className="pill-e w-full sm:w-auto">
                <div className="pill-e-group">
                  Book discovery session
                  <div className="pill-e-icon"><span className="text-white text-[15px]">→</span></div>
                </div>
              </button>
              <Link href="/case-studies" className="pill-f w-full sm:w-auto text-center py-4">
                View all cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </main>
  );
}
