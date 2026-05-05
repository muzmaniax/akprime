import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Database } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "ERP Implementation | Odoo, SAP B1, Dynamics 365",
  description: "AK Prime Consulting delivers end-to-end ERP transformation — from vendor selection to go-live. We connect finance, operations, and supply chain in one real-time system.",
};

const deliveryProcess = [
  { step: "01", title: "Assessment", desc: "Map current systems, processes, data flows, and integration requirements." },
  { step: "02", title: "Vendor Selection", desc: "Short-list and evaluate Odoo, SAP B1, Dynamics 365, or NetSuite against your requirements." },
  { step: "03", title: "Configuration", desc: "Build and configure your chosen ERP to match your specific business requirements." },
  { step: "04", title: "Data Migration", desc: "Clean, transform, and migrate legacy data with full validation and rollback capability." },
  { step: "05", title: "Testing & Piloting", desc: "UAT, regression testing, and a managed pilot with a key user group before full go-live." },
  { step: "06", title: "Training", desc: "Role-based training programmes, SOP documentation, and super-user enablement." },
  { step: "07", title: "Go-Live & Hypercare", desc: "Managed go-live with dedicated hypercare support for 90 days post-implementation." },
];

const kpis = [
  "Go-live delivered on time and within agreed scope",
  "Month-end close time reduction (target: 40–60%)",
  "Process automation rate (target: >60% of manual tasks)",
  "User adoption rate at 60 days post go-live (target: >90%)",
  "Data migration accuracy rate (target: 99.9%)",
];

const tools = ["Odoo", "SAP Business One", "Microsoft Dynamics 365", "NetSuite", "Power BI", "Azure DevOps"];

export default function ERPPage() {
  return (
    <div className="min-h-screen bg-[#082121] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="orb w-[500px] h-[500px] bg-[#37B4B4] opacity-[0.07] -top-40 right-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#37B4B4]/20 border border-[#37B4B4]/30 flex items-center justify-center text-[#37B4B4]">
                  <Database size={20} strokeWidth={1.5} />
                </div>
                <span className="section-label">ERP Implementation</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6">
                Replace Fragmented Systems With{" "}
                <span className="text-[#37B4B4]">Unified Operations</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
                AK Prime delivers end-to-end ERP transformation that connects finance, operations, and data across your entire organisation — from selection to go-live and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-7 py-3 rounded-xl cta-pulse transition-all inline-flex items-center gap-2"
                >
                  Start ERP Assessment <ArrowRight size={16} />
                </Link>
                <Link
                  href="/case-studies"
                  className="border border-[#37B4B4]/30 text-white hover:bg-[#37B4B4]/10 px-7 py-3 rounded-xl transition-all inline-flex items-center gap-2"
                >
                  View Case Studies
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-20 bg-[#0E3E3E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12">
              <span className="section-label mb-4 inline-block">Delivery Process</span>
              <h2 className="text-3xl font-medium text-white">Our 7-Phase ERP Methodology</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {deliveryProcess.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-5 h-full">
                  <div className="text-5xl font-medium text-white/5 mb-2 leading-none">{item.step}</div>
                  <div className="w-6 h-6 rounded-md bg-[#37B4B4]/20 border border-[#37B4B4]/30 flex items-center justify-center mb-3">
                    <span className="text-[#37B4B4] text-xs font-medium">{item.step}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs + Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div>
                <span className="section-label mb-4 inline-block">Target KPIs</span>
                <h2 className="text-3xl font-medium text-white mb-6">Measurable Outcomes</h2>
                <ul className="space-y-4">
                  {kpis.map((kpi) => (
                    <li key={kpi} className="flex gap-3 items-start">
                      <CheckCircle2 className="text-[#37B4B4] shrink-0 mt-0.5" size={18} />
                      <span className="text-white/70 text-sm leading-relaxed">{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <span className="section-label mb-4 inline-block">Tools & Partners</span>
                <h2 className="text-3xl font-medium text-white mb-6">Technology Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool) => (
                    <div key={tool} className="glass-card rounded-xl px-4 py-2.5 border border-white/8">
                      <span className="text-white/75 text-sm font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 glass-card rounded-2xl p-6 border border-[#37B4B4]/15">
                  <p className="text-white/80 text-sm italic mb-3">
                    "AK Prime reduced our month-end close from 18 days to 4. The ERP implementation was delivered on time and the team adoption was outstanding."
                  </p>
                  <p className="text-white/40 text-xs">— Finance Director, Manufacturing firm · Nairobi</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0E3E3E]/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-medium text-white mb-4">Ready to start your ERP journey?</h2>
            <p className="text-white/55 mb-8">Book a free 30-minute assessment call. We'll review your current systems and give you an honest recommendation.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-8 py-4 rounded-xl cta-pulse transition-all"
            >
              Start ERP Assessment <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
