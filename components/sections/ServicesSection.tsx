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
        <h3 className="text-[#082121] text-[17px] lg:text-[18px] font-semibold tracking-tight leading-tight">
          {item.headline}
        </h3>
        <p className="text-[12px] lg:text-[13px] text-[#3a5a5a] leading-snug line-clamp-2">
          {item.blurb}
        </p>
      </div>

      {/* Visual element — varies by type */}
      <div className="flex-1 flex items-center justify-center min-h-0 mb-4">
        {item.visualType === "integration" && <IntegrationVisual />}
        {item.visualType === "audit" && <AuditVisual />}
        {item.visualType === "growth" && <GrowthVisual />}
        {item.visualType === "workflow" && <WorkflowVisual />}
        {item.visualType === "impact" && <ImpactVisual />}
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

/* System Integration Diagram - interconnected nodes */
function IntegrationVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 140" className="w-full h-full max-w-[160px]">
        {/* Central node */}
        <circle cx="100" cy="70" r="16" fill="#37B4B4" opacity="0.15" stroke="#37B4B4" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="12" fill="none" stroke="#37B4B4" strokeWidth="2" />

        {/* Connected nodes */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 100 + Math.cos(angle) * 55;
          const y = 70 + Math.sin(angle) * 50;
          return (
            <g key={i}>
              <line x1="100" y1="70" x2={x} y2={y} stroke="#082121" strokeWidth="1" opacity="0.3" />
              <circle cx={x} cy={y} r="8" fill="white" stroke="#082121" strokeWidth="1.5" opacity="0.7" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Audit Trail with Checkpoints */
function AuditVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <svg viewBox="0 0 200 140" className="w-full h-full max-w-[180px]">
        {/* Vertical audit trail */}
        {[0, 1, 2, 3].map((i) => {
          const y = 25 + i * 30;
          return (
            <g key={i}>
              {/* Connecting line */}
              {i < 3 && <line x1="25" y1={y + 15} x2="25" y2={y + 30} stroke="#082121" strokeWidth="1" opacity="0.2" />}
              {/* Checkpoint circle */}
              <circle cx="25" cy={y} r="6" fill={i === 3 ? "#37B4B4" : "#F4FAFA"} stroke={i === 3 ? "#37B4B4" : "#082121"} strokeWidth="1.5" />
              {/* Checkmark for completed */}
              {i < 3 && (
                <g>
                  <path d={`M ${20} ${y - 2} L ${23} ${y + 1} L ${30} ${y - 5}`} stroke="#37B4B4" strokeWidth="1.5" fill="none" />
                </g>
              )}
              {/* Label bars */}
              <rect x="40" y={y - 4} width={120} height="8" fill="#F4FAFA" stroke="#082121" strokeWidth="0.5" opacity="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Growth Trajectory Curve */
function GrowthVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 140" className="w-full h-full max-w-[180px]" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        <line x1="20" y1="110" x2="180" y2="110" stroke="#082121" strokeWidth="1" opacity="0.2" />
        <line x1="20" y1="110" x2="20" y2="20" stroke="#082121" strokeWidth="1" opacity="0.2" />

        {/* Growth curve - cubic bezier */}
        <path
          d="M 30 100 Q 70 75, 110 55 T 170 25"
          stroke="#37B4B4"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Fill under curve */}
        <path
          d="M 30 100 Q 70 75, 110 55 T 170 25 L 170 110 L 30 110 Z"
          fill="#37B4B4"
          opacity="0.08"
        />

        {/* Progress points */}
        {[30, 70, 110, 150].map((x, i) => {
          const y = 100 - (Math.pow((x - 30) / 140, 0.6) * 75);
          return (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#37B4B4" opacity={i === 3 ? 1 : 0.6} />
          );
        })}
      </svg>
    </div>
  );
}

/* Workflow Pipeline */
function WorkflowVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <svg viewBox="0 0 200 140" className="w-full h-full max-w-[190px]">
        {/* Three stage boxes with flow */}
        {["Recruit", "Onboard", "Develop"].map((label, i) => {
          const x = 20 + i * 60;
          return (
            <g key={i}>
              {/* Connecting arrow */}
              {i < 2 && (
                <g>
                  <line x1={x + 35} y1="70" x2={x + 50} y2="70" stroke="#37B4B4" strokeWidth="1.5" />
                  <polygon points={`${x + 50},70 ${x + 45},67 ${x + 45},73`} fill="#37B4B4" />
                </g>
              )}
              {/* Box */}
              <rect x={x} y="50" width="35" height="40" rx="6" fill="white" stroke="#082121" strokeWidth="1" opacity="0.6" />
              {/* Label */}
              <text x={x + 17.5} y="75" textAnchor="middle" fontSize="9" fontWeight="500" fill="#082121">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Impact Multiplier Visualization */
function ImpactVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 140" className="w-full h-full max-w-[180px]">
        {/* Radiating impact circles */}
        {[3, 2, 1].map((i) => (
          <circle
            key={i}
            cx="100"
            cy="70"
            r={30 + i * 25}
            fill="none"
            stroke="#37B4B4"
            strokeWidth="1"
            opacity={0.3 - i * 0.08}
          />
        ))}

        {/* Central impact point */}
        <circle cx="100" cy="70" r="10" fill="#37B4B4" opacity="0.2" stroke="#37B4B4" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="6" fill="#37B4B4" />

        {/* Impact nodes around */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = 100 + Math.cos(angle) * 45;
          const y = 70 + Math.sin(angle) * 45;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="white" stroke="#082121" strokeWidth="1" opacity="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
