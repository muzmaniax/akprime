import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, BarChart2, BookOpen, ClipboardCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Resources & Free Downloads | AK Prime Consulting",
  description: "Free guides, checklists, and assessments from AK Prime Consulting — covering ERP implementation, AI strategy, cashflow optimisation, and digital transformation readiness.",
};

const resources = [
  {
    icon: <ClipboardCheck size={24} />,
    tag: "ERP",
    title: "ERP Implementation Checklist",
    desc: "A comprehensive 60-point checklist covering everything from vendor selection to go-live readiness and post-implementation review.",
    format: "PDF · 12 pages",
    href: "#download-erp",
  },
  {
    icon: <BarChart2 size={24} />,
    tag: "AI",
    title: "AI Automation Strategy Guide",
    desc: "A practical guide to identifying high-value AI use cases, evaluating risk, and launching a low-risk proof of concept in your organisation.",
    format: "PDF · 18 pages",
    href: "#download-ai",
  },
  {
    icon: <FileText size={24} />,
    tag: "Finance",
    title: "Cashflow Optimisation Playbook",
    desc: "Frameworks, templates, and benchmarks for improving working capital, extending runway, and building financial resilience.",
    format: "PDF · 15 pages",
    href: "#download-cashflow",
  },
  {
    icon: <BookOpen size={24} />,
    tag: "Assessment",
    title: "Digital Transformation Readiness Assessment",
    desc: "10-minute interactive assessment that scores your organisation's digital readiness across 5 dimensions and recommends next steps.",
    format: "Interactive · 10 mins",
    href: "#download-assessment",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#082121] pt-24">
      {/* Hero */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal>
            <span className="section-label mb-6 inline-block">Free Resources</span>
            <h1 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-5">
              Tools to Help You<br />
              <span className="text-[#37B4B4]">Make Better Decisions</span>
            </h1>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              Free guides, assessments, and checklists from our consulting team — practical resources you can use immediately.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, i) => (
              <ScrollReveal key={resource.title} delay={0.1 * i}>
                <div className="glass-card rounded-xl p-6 h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#37B4B4]/15 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4]">
                      {resource.icon}
                    </div>
                    <span className="section-label">{resource.tag}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white font-medium text-lg mb-2">{resource.title}</h2>
                    <p className="text-white/55 text-[13px] leading-relaxed">{resource.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <span className="text-white/35 text-sm">{resource.format}</span>
                    <Link
                      href={resource.href}
                      className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      <Download size={14} />
                      Download Free
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Email gate note */}
          <ScrollReveal delay={0.3}>
            <p className="text-center text-white/30 text-sm mt-8">
              Downloads require your work email. We will never share your details with third parties.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0E3E3E]/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-medium text-white mb-4">Want tailored advice instead?</h2>
            <p className="text-white/55 mb-8">Book a 30-minute strategy call and get a personalised recommendation for your situation.</p>
            <Link href="/book" className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-8 py-4 rounded-xl cta-pulse transition-all">
              Book a Free Call <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
