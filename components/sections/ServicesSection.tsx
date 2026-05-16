"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { servicesData, type ServiceCategory } from "@/data/services";

type ServiceItem = {
  key: ServiceCategory;
  icon: React.ElementType;
  headline: string;
  blurb: string;
  href: string;
};

const SERVICES: ServiceItem[] = [
  {
    key: "Systems & Technology",
    icon: Cpu,
    headline: "Systems & Technology",
    blurb: "ERP implementation, AI integration, and digital transformation. We replace fragmented tools with unified, scalable operating platforms.",
    href: "/services",
  },
  {
    key: "Finance & Compliance",
    icon: Shield,
    headline: "Finance & Compliance",
    blurb: "CFO advisory, FP&A modelling, audit frameworks and regulatory readiness, built for organisations that need rigour without the overhead.",
    href: "/services",
  },
  {
    key: "Strategy & Transformation",
    icon: BarChart3,
    headline: "Strategy & Transformation",
    blurb: "Governance design, business analysis, and capital readiness strategies that turn complex decisions into executable plans.",
    href: "/services",
  },
  {
    key: "HR & People Services",
    icon: Users,
    headline: "HR & People Services",
    blurb: "Organisation design, payroll, recruitment, and L&D, integrated into one people platform that actually works at scale.",
    href: "/services",
  },
  {
    key: "Growth & Impact",
    icon: TrendingUp,
    headline: "Growth & Impact",
    blurb: "Brand strategy, performance marketing, and impact frameworks calibrated to your business model and growth stage.",
    href: "/services",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <Reveal>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-3 text-[#082121] text-balance max-w-[22ch]">
              {servicesData.length} service lines.<br className="hidden sm:block" /> Five practice areas. One team.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#37B4B4] hover:text-[#082121] transition-colors"
            >
              View all {servicesData.length} services <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        {/* Feature grid — 3 top, 2 bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const count = servicesData.filter((s) => s.category === service.key).length;
            return (
              <Reveal key={service.key} delay={i * 60} className={i === 3 ? "lg:col-start-1" : ""}>
                <Link
                  href={service.href}
                  className="group flex flex-col h-full rounded-2xl border border-[#082121]/8 hover:border-[#37B4B4]/40 bg-[#F4FAFA] hover:bg-white transition-all duration-200 p-6 lg:p-7"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#082121]/8 flex items-center justify-center mb-5 group-hover:border-[#37B4B4]/30 transition-colors">
                    <Icon size={18} strokeWidth={1.75} className="text-[#37B4B4]" />
                  </div>

                  {/* Text */}
                  <h3 className="text-[#082121] text-[17px] font-medium leading-snug mb-2">
                    {service.headline}
                  </h3>
                  <p className="text-[13.5px] text-[#3a5a5a] leading-relaxed flex-1">
                    {service.blurb}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#082121]/8">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-[#3a5a5a]/50">
                      {count} services
                    </span>
                    <span className="w-7 h-7 rounded-full border border-[#082121]/10 flex items-center justify-center text-[#3a5a5a]/50 group-hover:border-[#37B4B4] group-hover:text-[#37B4B4] group-hover:bg-[#37B4B4]/8 transition-all">
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
