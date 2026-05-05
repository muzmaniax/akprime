"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/Primitives";
import { servicesData, type ServiceCategory } from "@/data/services";

type ServiceItem = {
  key: ServiceCategory;
  icon: React.ElementType;
  headline: string;
  blurb: string;
  visualType: "integration" | "audit" | "growth" | "workflow" | "impact";
};

const SERVICES: ServiceItem[] = [
  {
    key: "Systems & Technology",
    icon: Cpu,
    headline: "Unified Operating Core",
    blurb: "See your fragmented systems transform instantly as we integrate ERP, AI, and compliance into one cohesive platform.",
    visualType: "integration",
  },
  {
    key: "Finance & Compliance",
    icon: Shield,
    headline: "Bulletproof Audit Trail",
    blurb: "Play with audit frameworks, FP&A models, and compliance policies — all in one auditable, zero-defect system.",
    visualType: "audit",
  },
  {
    key: "Strategy & Transformation",
    icon: BarChart3,
    headline: "Transformation at Scale",
    blurb: "Perfect your org structure with governance frameworks, business analysis, and capital readiness strategies for measurable impact.",
    visualType: "growth",
  },
  {
    key: "HR & People Services",
    icon: Users,
    headline: "People Stack Automation",
    blurb: "Unleash full HR potential with org design, payroll, recruitment, and L&D all integrated into one unified people platform.",
    visualType: "workflow",
  },
  {
    key: "Growth & Impact",
    icon: TrendingUp,
    headline: "Stunning Growth Outcomes",
    blurb: "Kick off with brand strategy, performance marketing, and impact frameworks — then customize for your business model in a breeze.",
    visualType: "impact",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white text-[#082121] section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-9">
          <Reveal>
            <SectionHeader
              eyebrow="Our Services"
              title={<>{servicesData.length} service lines.<br />Five practice areas. One team.</>}
              sub="End-to-end delivery from discovery to scale."
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

        {/* Bento: 3 cols top + 2 cols bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-3">
          {/* Row 1: 3 equal cards with visual elements */}
          <Reveal className="sm:col-span-1 lg:col-span-4">
            <ServiceCard item={SERVICES[0]} />
          </Reveal>
          <Reveal delay={60} className="sm:col-span-1 lg:col-span-4">
            <ServiceCard item={SERVICES[1]} />
          </Reveal>
          <Reveal delay={90} className="sm:col-span-1 lg:col-span-4">
            <ServiceCard item={SERVICES[2]} />
          </Reveal>

          {/* Row 2: 2 wider cards */}
          <Reveal delay={120} className="sm:col-span-3 lg:col-span-5">
            <ServiceCard item={SERVICES[3]} />
          </Reveal>
          <Reveal delay={150} className="sm:col-span-3 lg:col-span-7">
            <ServiceCard item={SERVICES[4]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  const count = servicesData.filter((s) => s.category === item.key).length;
  const Icon = item.icon;

  return (
    <Link
      href="/services"
      className="group relative flex flex-col h-[320px] sm:h-[340px] rounded-2xl bg-[#F4FAFA] ring-1 ring-[#082121]/8 hover:ring-[#37B4B4]/40 hover:bg-white transition-all duration-300 overflow-hidden p-5 lg:p-6"
    >
      {/* Header: Title + blurb */}
      <div className="mb-5 space-y-2">
        <h3 className="text-[#082121] text-[18px] lg:text-[19px] font-medium tracking-tight leading-tight">
          {item.headline}
        </h3>
        <p className="text-[13px] lg:text-[14px] text-[#3a5a5a] leading-snug line-clamp-2">
          {item.blurb}
        </p>
      </div>

      {/* Visual element — image placeholder */}
      <div className="flex-1 flex items-center justify-center min-h-0 mb-4 bg-gradient-to-br from-[#E8F7F7] to-[#DCF3F3] rounded-xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#37B4B4] text-sm font-medium opacity-60">
              {item.visualType === "integration" && "Systems Integration"}
              {item.visualType === "audit" && "Audit Trail"}
              {item.visualType === "growth" && "Growth Curve"}
              {item.visualType === "workflow" && "Workflow Pipeline"}
              {item.visualType === "impact" && "Impact Reach"}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Count + CTA */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#082121]/6 mt-auto">
        <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#082121]/40">
          {count} services
        </span>
        <span className="w-8 h-8 rounded-full bg-[#082121]/5 text-[#082121]/40 inline-flex items-center justify-center group-hover:bg-[#37B4B4] group-hover:text-white transition-all duration-200">
          <ArrowUpRight size={13} strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}

