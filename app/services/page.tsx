"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Primitives";
import { BookingModal } from "@/components/ui/BookingModal";
import { servicesData, type ServiceCategory } from "@/data/services";

const CATEGORIES: { key: ServiceCategory; short: string; blurb: string; photo: string; pos?: string }[] = [
  {
    key: "Systems & Technology",
    short: "Systems",
    blurb: "ERP, AI, audits and training that turn fragmented tools into a unified operating core.",
    photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    pos: "center",
  },
  {
    key: "Finance & Compliance",
    short: "Finance",
    blurb: "Audit, FP&A, cashflow, bookkeeping and compliance that hold up to scrutiny.",
    photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
    pos: "center",
  },
  {
    key: "Strategy & Transformation",
    short: "Strategy",
    blurb: "Project governance, business analysis, restructuring and capital readiness.",
    photo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80",
    pos: "center 30%",
  },
  {
    key: "HR & People Services",
    short: "HR & People",
    blurb: "Org design, payroll, recruitment, performance and L&D — the full people stack.",
    photo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
    pos: "center 35%",
  },
  {
    key: "Growth & Impact",
    short: "Growth",
    blurb: "Brand, performance marketing and impact frameworks that move the metric.",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
    pos: "center",
  },
];

const PHASES = [
  { num: "01", title: "Assess", desc: "Structured discovery — interviews, current-state mapping and gap analysis. We understand the business before proposing a solution." },
  { num: "02", title: "Design", desc: "Solution architecture, requirement specs, risk register and agreed KPIs. Nothing moves to implementation without sign-off." },
  { num: "03", title: "Implement", desc: "Deploy with formal change control and milestone governance. Payments tied to accepted deliverables." },
  { num: "04", title: "Train", desc: "Role-based training, SOPs, e-learning modules and competency assessment before go-live." },
  { num: "05", title: "Scale", desc: "30 / 60 / 90-day hypercare reviews, support log and lessons-learned session. We optimise as the business grows." },
];

const SECTORS = [
  "Manufacturing", "Financial Services", "Healthcare", "Government & Public Sector",
  "NGOs & Donors", "Logistics & Transport", "Education", "Retail & FMCG", "Telecoms & Tech",
];

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState<ServiceCategory>("Systems & Technology");
  const [bookingOpen, setBookingOpen] = useState(false);

  const grouped = useMemo(() => {
    const m = new Map<ServiceCategory, typeof servicesData>();
    CATEGORIES.forEach((c) => m.set(c.key, []));
    servicesData.forEach((s) => m.get(s.category)?.push(s));
    return m;
  }, []);

  const visible = grouped.get(activeCat) ?? [];

  return (
    <div className="bg-white text-[#082121]">
      {/* HERO — Synergos-style soft sky */}
      <section className="relative hero-light-gradient pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <div className="container-x relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-white/70 border border-[#37B4B4]/25 text-[#37B4B4] text-[11px] font-semibold tracking-[0.16em] uppercase backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
              Our Services
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[#082121] text-balance max-w-[20ch]">
              Modernise your business operations with <span className="text-[#37B4B4]">AI, ERP &amp; strategic advisory</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[16px] md:text-[18px] text-[#3a5a5a] leading-relaxed max-w-2xl">
              {servicesData.length} integrated service lines across four practice areas.
              End-to-end delivery from discovery to scale — coordinated under one roof.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={() => setBookingOpen(true)} className="btn-cta">
                Book a consultation <ArrowUpRight size={16} strokeWidth={2.25} />
              </button>
              <Link href="#all-services" className="btn-ghost btn-ghost-light">
                Browse all services
              </Link>
            </div>
          </Reveal>

          {/* Stats row — sits in the hero */}
          <Reveal delay={320}>
            <div className="mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-10 border-t border-[#082121]/10">
              <Stat value="120+" label="Engagements delivered" />
              <Stat value={`${servicesData.length}`} label="Integrated service lines" />
              <Stat value="98%" label="Client satisfaction" />
              <Stat value="94%" label="Avg. user adoption" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRACTICE AREAS — 4 photo cards */}
      <section className="section-py bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Practice Areas</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                Four practice areas. One team. End-to-end delivery.
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                Pick where you need depth. We bring expertise across all four — coordinated when your engagement spans more than one.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c, i) => {
              const services = grouped.get(c.key) ?? [];
              return (
                <Reveal key={c.key} delay={i * 70}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCat(c.key);
                      document.getElementById("all-services")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden text-left ring-1 ring-[#082121]/10 hover:ring-[#37B4B4]/50 transition-all shadow-sm hover:shadow-xl"
                  >
                    <Image
                      src={c.photo}
                      alt={c.key}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: c.pos ?? "center" }}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/55 via-[#082121]/5 to-transparent" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="self-start glass-pane-dark px-3 h-7 rounded-full inline-flex items-center text-[10px] font-semibold tracking-[0.16em] uppercase text-white">
                        {services.length} services
                      </div>
                      <div className="glass-pane rounded-2xl p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[#082121] text-[18px] leading-[1.15] font-semibold flex-1">{c.key}</h3>
                          <span className="w-9 h-9 rounded-full bg-[#37B4B4] text-white inline-flex items-center justify-center shrink-0 group-hover:bg-[#29E0C8] transition-colors shadow-sm">
                            <ArrowUpRight size={15} strokeWidth={2.75} />
                          </span>
                        </div>
                        <p className="mt-2 text-[12.5px] text-[#082121]/75 leading-snug line-clamp-2">{c.blurb}</p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL SERVICES — tabbed photo card grid */}
      <section id="all-services" className="section-py bg-[#F4FAFA]/60">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow>All Services</Eyebrow>
                <h2 className="mt-4 text-[#082121] text-balance">
                  {servicesData.length} service lines, one coordinated team.
                </h2>
                <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                  Tap a practice area to focus the list. Every engagement is scoped to the question that needs answering.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Sticky filter pills */}
          <div className="mt-8 sticky top-[var(--navbar-h)] z-20 -mx-4 px-4 py-3 bg-[#F4FAFA]/85 backdrop-blur-md border-b border-[#082121]/8">
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCat(c.key)}
                  className={`shrink-0 h-10 px-4 rounded-full text-[13px] font-medium transition-colors border whitespace-nowrap ${
                    activeCat === c.key
                      ? "bg-[#37B4B4] text-white border-[#37B4B4]"
                      : "bg-white text-[#3a5a5a] border-[#082121]/12 hover:border-[#37B4B4]/40 hover:text-[#37B4B4]"
                  }`}
                >
                  {c.short}
                  <span className="ml-2 text-[11px] opacity-75">{(grouped.get(c.key) ?? []).length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service photo cards with glass overlay */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 60}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden ring-1 ring-[#082121]/10 hover:ring-[#37B4B4]/50 transition-all shadow-sm hover:shadow-lg"
                >
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center 40%" }}
                    unoptimized
                  />
                  {/* Stronger gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/70 via-[#082121]/15 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 glass-pane rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[#082121] text-[16px] leading-[1.2] font-semibold flex-1">{s.name}</h3>
                      <span className="w-8 h-8 rounded-full bg-[#37B4B4] text-white inline-flex items-center justify-center shrink-0 group-hover:bg-[#29E0C8] transition-colors shadow-sm">
                        <ArrowUpRight size={14} strokeWidth={2.75} />
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] text-[#082121]/70 leading-snug line-clamp-2">
                      {s.shortDescription}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5-PHASE FRAMEWORK */}
      <section className="section-py bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow className="justify-center">How we deliver</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                A proven 5-phase framework.
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                Every engagement. Every service line. Every time.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-5 gap-3">
            {PHASES.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="h-full p-5 rounded-2xl bg-[#F4FAFA] border border-[#082121]/8">
                  <div className="text-[#37B4B4] text-[11px] font-semibold tracking-[0.18em] mb-3">{p.num}</div>
                  <h3 className="text-[#082121] text-[16px] mb-2">{p.title}</h3>
                  <p className="text-[12px] text-[#3a5a5a] leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="section-py bg-[#F4FAFA]/60">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow className="justify-center">Sectors we serve</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                Built for your industry.
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                We don't apply generic templates. Every engagement draws on deep sector knowledge built across years of East African delivery.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {SECTORS.map((s) => (
                <span key={s} className="inline-flex items-center h-10 px-5 rounded-full bg-white text-[14px] text-[#082121] border border-[#082121]/10">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-white">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl bg-[#082121] text-white p-10 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#37B4B4]/15 blur-3xl pointer-events-none" />
              <div className="relative">
                <Eyebrow className="justify-center">Get in touch</Eyebrow>
                <h2 className="mt-4 text-white text-balance max-w-[18ch] mx-auto">
                  Contact us for a tailored service scope.
                </h2>
                <p className="mt-4 text-[15px] text-white/65 max-w-xl mx-auto">
                  info@akprime.co.ke &nbsp;·&nbsp; 0118 001 001 &nbsp;·&nbsp; Nairobi &amp; Mombasa
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => setBookingOpen(true)} className="btn-cta">
                    Book a consultation <ArrowUpRight size={16} strokeWidth={2.25} />
                  </button>
                  <Link href="/contact" className="btn-ghost">
                    Send us a message
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-medium tracking-tight leading-none text-[#082121]" style={{ fontSize: "clamp(2rem, 1.4rem + 2vw, 3rem)" }}>
        {value}
      </div>
      <div className="mt-1.5 text-[12px] text-[#3a5a5a]">{label}</div>
    </div>
  );
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#37B4B4] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
      {children}
    </span>
  );
}
