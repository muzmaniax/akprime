"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cpu, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { BookingModal } from "@/components/ui/BookingModal";
import { servicesData, type ServiceCategory, type ServiceData } from "@/data/services";
import { useSiteImage } from "@/lib/use-site-images";
import Waves from "@/components/ui/Waves";

const CATEGORIES: { key: ServiceCategory; short: string; blurb: string; icon: React.ElementType }[] = [
  {
    key: "Systems & Technology",
    short: "Systems",
    blurb: "ERP, AI, audits and training that turn fragmented tools into a unified operating core.",
    icon: Cpu,
  },
  {
    key: "Finance & Compliance",
    short: "Finance",
    blurb: "Audit, FP&A, cashflow, bookkeeping and compliance that hold up to scrutiny.",
    icon: Shield,
  },
  {
    key: "Strategy & Transformation",
    short: "Strategy",
    blurb: "Project governance, business analysis, restructuring and capital readiness.",
    icon: BarChart3,
  },
  {
    key: "HR & People Services",
    short: "HR & People",
    blurb: "Org design, payroll, recruitment, performance and L&D. The full people stack.",
    icon: Users,
  },
  {
    key: "Growth & Impact",
    short: "Growth",
    blurb: "Brand, performance marketing and impact frameworks that move the metric.",
    icon: TrendingUp,
  },
];

const PHASES = [
  { num: "01", title: "Assess", desc: "Structured discovery: interviews, current-state mapping and gap analysis. We understand the business before proposing a solution." },
  { num: "02", title: "Design", desc: "Solution architecture, requirement specs, risk register and agreed KPIs. Nothing moves to implementation without sign-off." },
  { num: "03", title: "Implement", desc: "Deploy with formal change control and milestone governance. Payments tied to accepted deliverables." },
  { num: "04", title: "Train", desc: "Role-based training, SOPs, e-learning modules and competency assessment before go-live." },
  { num: "05", title: "Scale", desc: "30 / 60 / 90-day hypercare reviews, support log and lessons-learned session. We optimise as the business grows." },
];

const SECTORS = [
  "Manufacturing", "Financial Services", "Healthcare", "Government & Public Sector",
  "NGOs & Donors", "Logistics & Transport", "Education", "Retail & FMCG", "Telecoms & Tech",
];

export function ServicesPageClient() {
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
      {/* HERO */}
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>Our Services</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-3 text-white text-balance max-w-[24ch]"
              style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}
            >
              Modernise your business operations with AI, ERP &amp; strategic advisory.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-xl">
              {servicesData.length} integrated service lines across five practice areas.
              End-to-end delivery from discovery to scale, coordinated under one roof.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => setBookingOpen(true)} className="btn-cta">
                Book a consultation <ArrowUpRight size={16} strokeWidth={2.25} />
              </button>
              <Link href="#all-services" className="btn-ghost">
                Browse all services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="pt-12 pb-10 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Practice Areas</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                Four practice areas. One team. End-to-end delivery.
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                Pick where you need depth. We bring expertise across all four, coordinated when your engagement spans more than one.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              const count = (grouped.get(c.key) ?? []).length;
              return (
                <Reveal key={c.key} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCat(c.key);
                      document.getElementById("all-services")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`group w-full text-left flex flex-col p-5 rounded-2xl border transition-all duration-200 ${
                      activeCat === c.key
                        ? "bg-[#082121] border-[#082121]"
                        : "bg-[#F4FAFA] border-[#082121]/8 hover:border-[#37B4B4]/40 hover:bg-white"
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      activeCat === c.key
                        ? "bg-[#37B4B4]/20"
                        : "bg-white border border-[#082121]/8 group-hover:border-[#37B4B4]/30"
                    }`}>
                      <Icon size={18} strokeWidth={1.75} className="text-[#37B4B4]" />
                    </div>

                    {/* Title */}
                    <h3 className={`text-[14px] font-medium leading-snug mb-1.5 transition-colors ${
                      activeCat === c.key ? "text-white" : "text-[#082121]"
                    }`}>
                      {c.key}
                    </h3>

                    {/* Blurb */}
                    <p className={`text-[12px] leading-relaxed flex-1 transition-colors ${
                      activeCat === c.key ? "text-white/60" : "text-[#3a5a5a]"
                    }`}>
                      {c.blurb}
                    </p>

                    {/* Count */}
                    <div className={`mt-4 pt-3 border-t text-[11px] font-semibold tracking-widest uppercase transition-colors ${
                      activeCat === c.key ? "border-white/10 text-[#37B4B4]" : "border-[#082121]/8 text-[#3a5a5a]/50"
                    }`}>
                      {count} services
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL SERVICES — tabbed photo card grid */}
      <section id="all-services" className="pt-8 pb-[clamp(64px,7vw,112px)] bg-[#F4FAFA]/60">
        <div className="container-x">
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

          {/* Service cards — compact landscape layout */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visible.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 60}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5-PHASE FRAMEWORK */}
      <section className="py-12 bg-white">
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
      <section className="py-12 bg-[#F4FAFA]/60">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow className="justify-center">Sectors we serve</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                Built for your industry.
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                We don't apply generic templates. Every engagement draws on deep sector knowledge built across years of cross-market delivery.
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
      <section className="py-12 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl bg-[#082121] text-white p-10 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <Waves
                  lineColor="rgba(55, 180, 180, 0.13)"
                  backgroundColor="transparent"
                  waveSpeedX={0.014}
                  waveSpeedY={0.006}
                  waveAmpX={38}
                  waveAmpY={18}
                  xGap={14}
                  yGap={40}
                  friction={0.93}
                  tension={0.006}
                  maxCursorMove={110}
                />
              </div>
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#37B4B4]/15 blur-3xl pointer-events-none" />
              <div className="relative">
                <Eyebrow className="justify-center">Get in touch</Eyebrow>
                <h2 className="mt-4 text-white text-balance max-w-[18ch] mx-auto">
                  Contact us for a tailored service scope.
                </h2>
                <p className="mt-4 text-[15px] text-white/65 max-w-xl mx-auto">
                  info@akprime.co.ke &nbsp;·&nbsp; 0118 001 001 &nbsp;·&nbsp; Mombasa · Nairobi · Dubai
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

function ServiceCard({ s }: { s: ServiceData }) {
  const cmsPhoto = useSiteImage(`service.${s.id}`);
  const photo = cmsPhoto || s.photo;
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-[#082121]/8 hover:border-[#37B4B4]/40 bg-white hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-[220px] overflow-hidden bg-[#F4FAFA]">
        <Image
          src={photo}
          alt={s.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: "center 40%" }}
          unoptimized
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#37B4B4] mb-2">
          {s.category.split(" & ")[0]}
        </p>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[#082121] text-[18px] font-medium leading-snug flex-1">{s.name}</h3>
          <span className="w-8 h-8 rounded-full border border-[#082121]/10 flex items-center justify-center shrink-0 text-[#3a5a5a]/40 group-hover:border-[#37B4B4] group-hover:text-[#37B4B4] group-hover:bg-[#37B4B4]/8 transition-all mt-0.5">
            <ArrowUpRight size={14} strokeWidth={2} />
          </span>
        </div>
        <p className="mt-2 text-[14px] text-[#3a5a5a] leading-relaxed line-clamp-2">{s.shortDescription}</p>
      </div>
    </Link>
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

