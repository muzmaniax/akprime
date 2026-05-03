"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cpu, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/Primitives";
import { servicesData, type ServiceCategory } from "@/data/services";
import { cn } from "@/lib/utils";

type BentoItem = {
  key: ServiceCategory;
  icon: React.ElementType;
  blurb: string;
  photo?: string;
  photoPosition?: string;
  variant: "photo" | "dark" | "teal";
};

const BENTO: BentoItem[] = [
  {
    key: "Systems & Technology",
    icon: Cpu,
    blurb: "ERP, AI tools, IT audits and training that turn fragmented systems into a unified operating core.",
    photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    photoPosition: "center",
    variant: "photo",
  },
  {
    key: "Finance & Compliance",
    icon: Shield,
    blurb: "Audit, FP&A, cashflow management and compliance frameworks that hold up to scrutiny.",
    variant: "dark",
  },
  {
    key: "Strategy & Transformation",
    icon: BarChart3,
    blurb: "Project governance, business analysis, restructuring and capital readiness.",
    variant: "dark",
  },
  {
    key: "HR & People Services",
    icon: Users,
    blurb: "Org design, payroll, recruitment, performance and L&D — the full people stack.",
    photo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80",
    photoPosition: "center 35%",
    variant: "photo",
  },
  {
    key: "Growth & Impact",
    icon: TrendingUp,
    blurb: "Brand strategy, performance marketing and impact frameworks that move the metric.",
    variant: "teal",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white text-[#082121] section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <Reveal>
            <SectionHeader
              eyebrow="Our Services"
              title={<>{servicesData.length} service lines.<br />Five practice areas. One team.</>}
              sub="End-to-end delivery from discovery to scale — coordinated under one roof."
              light
            />
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[#37B4B4] hover:text-[#082121] text-[14px] font-semibold transition-colors"
            >
              View all {servicesData.length} services <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        {/* Bento grid — 12-col */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Row 1: Large photo card (7) + two stacked dark cards (5) */}
          <Reveal className="md:col-span-7 md:row-span-2">
            <BentoCard item={BENTO[0]} className="h-[340px] md:h-full md:min-h-[500px]" />
          </Reveal>
          <Reveal delay={60} className="md:col-span-5">
            <BentoCard item={BENTO[1]} className="h-[240px] md:h-full" />
          </Reveal>
          <Reveal delay={90} className="md:col-span-5">
            <BentoCard item={BENTO[2]} className="h-[240px] md:h-full" />
          </Reveal>

          {/* Row 2: Photo card (5) + teal accent card (7) */}
          <Reveal delay={120} className="md:col-span-5">
            <BentoCard item={BENTO[3]} className="h-[280px] md:h-[260px]" />
          </Reveal>
          <Reveal delay={150} className="md:col-span-7">
            <BentoCard item={BENTO[4]} className="h-[280px] md:h-[260px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ item, className }: { item: BentoItem; className?: string }) {
  const count = servicesData.filter((s) => s.category === item.key).length;
  const Icon = item.icon;

  if (item.variant === "photo" && item.photo) {
    return (
      <Link
        href="/services"
        className={cn(
          "group relative flex flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-[#082121]/8 hover:ring-[#37B4B4]/40 transition-all duration-300 shadow-sm hover:shadow-xl",
          className
        )}
      >
        <Image
          src={item.photo}
          alt={item.key}
          fill
          sizes="(max-width: 768px) 100vw, 58vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ objectPosition: item.photoPosition ?? "center" }}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
        <div className="relative p-6 lg:p-7 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55 mb-2">
              <span className="w-1 h-1 rounded-full bg-[#37B4B4]" />
              {count} services
            </span>
            <h3 className="text-white text-[22px] lg:text-[26px] font-semibold tracking-tight leading-tight">
              {item.key}
            </h3>
            <p className="mt-1.5 text-[13px] text-white/70 leading-snug max-w-xs">{item.blurb}</p>
          </div>
          <span className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white inline-flex items-center justify-center shrink-0 group-hover:bg-[#37B4B4] group-hover:border-[#37B4B4] transition-all duration-200">
            <ArrowUpRight size={16} strokeWidth={2.25} />
          </span>
        </div>
      </Link>
    );
  }

  if (item.variant === "teal") {
    return (
      <Link
        href="/services"
        className={cn(
          "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#082121] ring-1 ring-white/[0.06] hover:ring-[#37B4B4]/30 transition-all duration-300 p-6 lg:p-7",
          className
        )}
      >
        {/* Subtle teal glow in corner */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#37B4B4]/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl bg-[#37B4B4]/15 flex items-center justify-center text-[#37B4B4] mb-5">
            <Icon size={18} strokeWidth={1.75} />
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-white text-[19px] lg:text-[21px] font-semibold tracking-tight leading-tight">
                {item.key}
              </h3>
              <p className="mt-2 text-[13px] text-white/60 leading-relaxed max-w-sm">{item.blurb}</p>
            </div>
          </div>
        </div>
        <div className="relative flex items-end justify-between gap-3 mt-4">
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#37B4B4]/70">
            {count} services
          </span>
          <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60 inline-flex items-center justify-center group-hover:bg-[#37B4B4] group-hover:border-[#37B4B4] group-hover:text-white transition-all duration-200">
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </span>
        </div>
      </Link>
    );
  }

  // default: dark variant
  return (
    <Link
      href="/services"
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#F4FAFA] ring-1 ring-[#082121]/8 hover:ring-[#37B4B4]/40 hover:bg-white transition-all duration-300 p-6 lg:p-7",
        className
      )}
    >
      <div>
        <div className="w-10 h-10 rounded-2xl bg-[#082121]/6 flex items-center justify-center text-[#082121] mb-5 group-hover:bg-[#37B4B4]/10 group-hover:text-[#37B4B4] transition-colors duration-200">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <h3 className="text-[#082121] text-[19px] lg:text-[21px] font-semibold tracking-tight leading-tight">
          {item.key}
        </h3>
        <p className="mt-2 text-[13px] text-[#3a5a5a] leading-relaxed">{item.blurb}</p>
      </div>
      <div className="flex items-end justify-between gap-3 mt-4">
        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#082121]/40">
          {count} services
        </span>
        <span className="w-9 h-9 rounded-full bg-[#082121]/5 text-[#082121]/40 inline-flex items-center justify-center group-hover:bg-[#37B4B4] group-hover:text-white transition-all duration-200">
          <ArrowUpRight size={14} strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}
