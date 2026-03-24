"use client";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import {
  Database, Brain, FolderKanban, LineChart, Shield, BookOpen,
  Monitor, TrendingUp, DollarSign, RefreshCcw, Megaphone,
  GraduationCap, FileText, Rocket, AlertTriangle, BarChart3,
} from "lucide-react";

const services = [
  {
    icon: <Database size={20} strokeWidth={1.5} />,
    title: "ERP Implementation",
    desc: "Unify finance, ops and data in one real-time system.",
    tools: ["Odoo", "SAP B1", "Dynamics 365"],
    href: "/services/erp-implementation",
    badge: { text: "Popular", bg: "#37B4B4" },
  },
  {
    icon: <Brain size={20} strokeWidth={1.5} />,
    title: "AI Integration & Automation",
    desc: "Automate workflows and unlock predictive business intelligence.",
    tools: ["OpenAI", "Azure AI", "LangChain"],
    href: "/services/ai-integration-automation",
    badge: { text: "New", bg: "#29E0C8" },
  },
  {
    icon: <FolderKanban size={20} strokeWidth={1.5} />,
    title: "Project Management",
    desc: "On scope, on time, on budget — every engagement.",
    tools: ["MS Project", "Asana", "Jira"],
    href: "/services/project-management",
    badge: null,
  },
  {
    icon: <LineChart size={20} strokeWidth={1.5} />,
    title: "Business Analysis",
    desc: "Clear requirements that eliminate costly rework.",
    tools: ["BPMN", "Jira", "Lucidchart"],
    href: "/services/business-analysis",
    badge: null,
  },
  {
    icon: <Shield size={20} strokeWidth={1.5} />,
    title: "Audit Services",
    desc: "Independent assurance that reduces risk and builds trust.",
    tools: ["CaseWare", "ACL", "IDEA"],
    href: "/services/audit-assurance",
    badge: null,
  },
  {
    icon: <BookOpen size={20} strokeWidth={1.5} />,
    title: "Bookkeeping",
    desc: "Accurate, timely books that keep you tax-ready always.",
    tools: ["QuickBooks", "Xero", "Sage"],
    href: "/services/cloud-accounting",
    badge: null,
  },
  {
    icon: <Monitor size={20} strokeWidth={1.5} />,
    title: "System & IT Audits",
    desc: "Find ERP and security gaps before they find you.",
    tools: ["ERP Security", "Nessus", "Controls"],
    href: "/services/it-systems-audit",
    badge: null,
  },
  {
    icon: <TrendingUp size={20} strokeWidth={1.5} />,
    title: "Financial Management",
    desc: "FP&A, forecasting and interim CFO support.",
    tools: ["Power BI", "Excel", "Adaptive"],
    href: "/services/financial-management",
    badge: null,
  },
  {
    icon: <DollarSign size={20} strokeWidth={1.5} />,
    title: "Cashflow Optimisation",
    desc: "Improve liquidity without taking on new debt.",
    tools: ["Cash Forecasting", "Collections"],
    href: "/services/cashflow-optimisation",
    badge: null,
  },
  {
    icon: <RefreshCcw size={20} strokeWidth={1.5} />,
    title: "Company Restructuring",
    desc: "Reorganise for efficiency, compliance and growth.",
    tools: ["Org Design", "Tax", "Legal"],
    href: "/services/company-restructuring",
    badge: null,
  },
  {
    icon: <Megaphone size={20} strokeWidth={1.5} />,
    title: "Digital Marketing",
    desc: "Drive leads and brand authority across digital channels.",
    tools: ["Google Ads", "Meta", "HubSpot"],
    href: "/services/digital-marketing",
    badge: null,
  },
  {
    icon: <GraduationCap size={20} strokeWidth={1.5} />,
    title: "Training Services",
    desc: "ERP and systems training that drives real adoption.",
    tools: ["Moodle", "TalentLMS", "Zoom"],
    href: "/services/systems-training",
    badge: null,
  },
  {
    icon: <FileText size={20} strokeWidth={1.5} />,
    title: "Company Secretarial",
    desc: "Statutory compliance and governance handled.",
    tools: ["e-Filing", "Registrars", "Legal"],
    href: "/services/company-secretarial",
    badge: null,
  },
  {
    icon: <Rocket size={20} strokeWidth={1.5} />,
    title: "VC Advisory",
    desc: "Get investment-ready and close your fundraising round.",
    tools: ["VC Networks", "Pitch Platforms"],
    href: "/services/vc-fundraising-advisory",
    badge: null,
  },
  {
    icon: <AlertTriangle size={20} strokeWidth={1.5} />,
    title: "Risk & Compliance",
    desc: "Enterprise risk frameworks that protect and enable.",
    tools: ["ERM", "AML", "ISO 31000"],
    href: "/services/risk-compliance",
    badge: null,
  },
  {
    icon: <BarChart3 size={20} strokeWidth={1.5} />,
    title: "M&E / Impact Assessment",
    desc: "Measure outcomes and report impact with confidence.",
    tools: ["LogFrame", "KOBO", "Power BI"],
    href: "/services/monitoring-evaluation",
    badge: null,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-label mb-4 inline-block">WHAT WE DO</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              <TextEffect preset="blur" per="word" as="span">16 Integrated Service Lines</TextEffect>
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              From day-one bookkeeping to enterprise AI — every service delivers measurable ROI.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.05}>
              <TiltCard className="h-full">
                <Link href={s.href}>
                  <div
                    className="glass-card rounded-2xl p-5 h-full flex flex-col gap-3 cursor-pointer group hover:border-[#37B4B4]/30 transition-all duration-300 relative overflow-hidden"
                    style={{ minHeight: "168px" }}
                  >
                    <BorderTrail
                      className="bg-gradient-to-r from-[#37B4B4] via-transparent to-[#29E0C8] opacity-0 group-hover:opacity-100 transition-opacity"
                      size={50}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Icon + badge row */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-[#37B4B4]/15 flex items-center justify-center text-[#37B4B4] group-hover:bg-[#37B4B4]/25 transition-colors">
                        {s.icon}
                      </div>
                      {s.badge && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: s.badge.bg, color: "#082121" }}
                        >
                          {s.badge.text}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#37B4B4] transition-colors">
                      {s.title}
                    </h3>

                    {/* One-sentence prop */}
                    <p className="text-white/50 text-xs leading-relaxed flex-1 font-light">{s.desc}</p>

                    {/* Tool badges */}
                    <div className="flex flex-wrap gap-1">
                      {s.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[#37B4B4] border border-[#37B4B4]/30 rounded-full px-2 py-0.5"
                          style={{ fontSize: "0.62rem" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Learn more */}
                    <span className="text-[#37B4B4] text-xs font-medium group-hover:text-[#29E0C8] transition-colors">
                      Learn More →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm transition-colors border border-[#37B4B4]/30 px-6 py-3 rounded-xl hover:bg-[#37B4B4]/10"
          >
            View Full Service Details →
          </Link>
        </div>
      </div>
    </section>
  );
}
