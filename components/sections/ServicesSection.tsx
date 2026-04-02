"use client";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import {
  Server, Sparkles, LayoutGrid, Activity, ShieldCheck, Receipt,
  ScanLine, PieChart, Banknote, GitMerge, Zap,
  GraduationCap, ScrollText, TrendingUp, ShieldAlert, BarChart3,
} from "lucide-react";

const services = [
  {
    icon: <Server size={28} strokeWidth={1.4} />,
    title: "ERP Implementation",
    desc: <>Unify <span className="text-white/80 font-medium">finance, ops and data</span> in one real-time system.</>,
    tools: ["Odoo", "SAP B1", "Dynamics 365"],
    href: "/services/erp-implementation",
    badge: { text: "Popular", bg: "#37B4B4" },
    color: "#37B4B4",
  },
  {
    icon: <Sparkles size={28} strokeWidth={1.4} />,
    title: "AI Integration & Automation",
    desc: <>Automate <span className="text-white/80 font-medium">workflows</span> and unlock predictive business <span className="text-white/80 font-medium">intelligence</span>.</>,
    tools: ["OpenAI", "Azure AI", "LangChain"],
    href: "/services/ai-integration-automation",
    badge: { text: "New", bg: "#29E0C8" },
    color: "#29E0C8",
  },
  {
    icon: <LayoutGrid size={28} strokeWidth={1.4} />,
    title: "Project Management",
    desc: <><span className="text-white/80 font-medium">On scope, on time, on budget</span> — every engagement.</>,
    tools: ["MS Project", "Asana", "Jira"],
    href: "/services/project-management",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <Activity size={28} strokeWidth={1.4} />,
    title: "Business Analysis",
    desc: <>Clear <span className="text-white/80 font-medium">requirements</span> that eliminate costly rework.</>,
    tools: ["BPMN", "Jira", "Lucidchart"],
    href: "/services/business-analysis",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.4} />,
    title: "Audit Services",
    desc: <><span className="text-white/80 font-medium">Independent assurance</span> that reduces risk and builds trust.</>,
    tools: ["CaseWare", "ACL", "IDEA"],
    href: "/services/audit-assurance",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <Receipt size={28} strokeWidth={1.4} />,
    title: "Bookkeeping",
    desc: <>Accurate, timely books that keep you <span className="text-white/80 font-medium">tax-ready</span> always.</>,
    tools: ["QuickBooks", "Xero", "Sage"],
    href: "/services/cloud-accounting",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <ScanLine size={28} strokeWidth={1.4} />,
    title: "System & IT Audits",
    desc: <>Find <span className="text-white/80 font-medium">ERP and security gaps</span> before they find you.</>,
    tools: ["ERP Security", "Nessus", "Controls"],
    href: "/services/it-systems-audit",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <PieChart size={28} strokeWidth={1.4} />,
    title: "Financial Management",
    desc: <><span className="text-white/80 font-medium">FP&A</span>, forecasting and interim <span className="text-white/80 font-medium">CFO support</span>.</>,
    tools: ["Power BI", "Excel", "Adaptive"],
    href: "/services/financial-management",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <Banknote size={28} strokeWidth={1.4} />,
    title: "Cashflow Optimisation",
    desc: <>Improve <span className="text-white/80 font-medium">liquidity</span> without taking on new <span className="text-white/80 font-medium">debt</span>.</>,
    tools: ["Cash Forecasting", "Collections"],
    href: "/services/cashflow-optimisation",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <GitMerge size={28} strokeWidth={1.4} />,
    title: "Company Restructuring",
    desc: <>Reorganise for <span className="text-white/80 font-medium">efficiency, compliance and growth</span>.</>,
    tools: ["Org Design", "Tax", "Legal"],
    href: "/services/company-restructuring",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <Zap size={28} strokeWidth={1.4} />,
    title: "Financial Modelling",
    desc: <><span className="text-white/80 font-medium">Decision-ready models</span> for fundraising and scale.</>,
    tools: ["Excel", "Python", "Valuation"],
    href: "/services/financial-modelling",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <GraduationCap size={28} strokeWidth={1.4} />,
    title: "Training Services",
    desc: "ERP and systems training that drives real adoption.",
    tools: ["Moodle", "TalentLMS", "Zoom"],
    href: "/services/systems-training",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <ScrollText size={28} strokeWidth={1.4} />,
    title: "Company Secretarial",
    desc: "Statutory compliance and governance handled.",
    tools: ["e-Filing", "Registrars", "Legal"],
    href: "/services/company-secretarial",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <TrendingUp size={28} strokeWidth={1.4} />,
    title: "VC Advisory",
    desc: "Get investment-ready and close your fundraising round.",
    tools: ["VC Networks", "Pitch Platforms"],
    href: "/services/vc-fundraising-advisory",
    badge: null,
    color: "#29E0C8",
  },
  {
    icon: <ShieldAlert size={28} strokeWidth={1.4} />,
    title: "Risk & Compliance",
    desc: "Enterprise risk frameworks that protect and enable.",
    tools: ["ERM", "AML", "ISO 31000"],
    href: "/services/risk-compliance",
    badge: null,
    color: "#37B4B4",
  },
  {
    icon: <BarChart3 size={28} strokeWidth={1.4} />,
    title: "M&E / Impact Assessment",
    desc: "Measure outcomes and report impact with confidence.",
    tools: ["LogFrame", "KOBO", "Power BI"],
    href: "/services/monitoring-evaluation",
    badge: null,
    color: "#37B4B4",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-10 lg:py-14 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="section-overline mb-3 inline-block">What we do</span>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] text-white mb-3">
              16 integrated service lines
            </h2>
            <p className="text-white/55 text-sm md:text-base max-w-xl mx-auto">
              From day-one bookkeeping to enterprise AI — every service delivers measurable ROI.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.04}>
              <TiltCard className="h-full">
                <Link href={s.href} className="block h-full">
                  <div
                    className="glass-card rounded-[18px] p-[10px] h-full flex flex-col gap-3 cursor-pointer group hover:border-[#37B4B4]/40 transition-all duration-300 relative overflow-hidden"
                    style={{ minHeight: "180px" }}
                  >
                    <BorderTrail
                      className="bg-gradient-to-r from-[#37B4B4] via-transparent to-[#29E0C8] opacity-0 group-hover:opacity-100 transition-opacity"
                      size={60}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Icon + badge row */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center transition-colors duration-300 group-hover:scale-110 transition-transform"
                        style={{
                          background: `rgba(${s.color === "#29E0C8" ? "41,224,200" : "55,180,180"},0.12)`,
                          color: s.color,
                        }}
                      >
                        {s.icon}
                      </div>
                      {s.badge && (
                        <span
                          className="pill-a mt-1"
                          style={{ background: s.badge.bg, color: "#082121", border: "none" }}
                        >
                          {s.badge.text}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3
                        className="text-white font-bold text-base leading-snug mb-1.5 group-hover:text-[#37B4B4] transition-colors"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {s.title}
                      </h3>
                      {/* One-sentence prop */}
                      <p className="text-white/55 text-sm leading-relaxed flex-1">
                        {s.desc}
                      </p>
                    </div>

                    {/* Tool badges */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {s.tools.map((t) => (
                        <span
                          key={t}
                          className="pill-g"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Learn more */}
                    <span className="text-[#37B4B4] text-sm font-semibold group-hover:text-[#29E0C8] transition-colors">
                      Learn More →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm transition-colors border border-[#37B4B4]/30 px-7 py-3.5 rounded-xl hover:bg-[#37B4B4]/10"
          >
            View Full Service Details →
          </Link>
        </div>
      </div>
    </section>
  );
}
