import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, CheckCircle2, Cpu, Eye, FileText, BarChart2, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "AI Automation & Intelligence | AI Integration Consulting Africa & Middle East",
  description: "AK Prime helps organisations deploy AI solutions that automate processes, generate insights, and improve decision making, starting with a low-risk proof of concept.",
};

const capabilities = [
  { icon: <BarChart2 size={20} />, title: "Predictive Forecasting", desc: "AI-powered demand planning, revenue forecasting, and cashflow prediction models." },
  { icon: <Eye size={20} />, title: "Customer Insights & Segmentation", desc: "Machine learning models that surface high-value customer segments and churn risk." },
  { icon: <Cpu size={20} />, title: "Workflow Automation", desc: "Intelligent document processing, AP automation, and end-to-end process bots." },
  { icon: <FileText size={20} />, title: "Decision Support Systems", desc: "Executive dashboards and scenario modelling tools for confident strategic decisions." },
  { icon: <ShieldCheck size={20} />, title: "AI Ethics & Governance", desc: "Bias auditing, explainability frameworks, and AI monitoring for responsible deployment." },
  { icon: <Brain size={20} />, title: "Custom LLM Applications", desc: "Tailored language model applications for document analysis, customer support, and more." },
];

const tools = ["OpenAI GPT-4", "Azure OpenAI", "LangChain", "Power BI", "Azure ML", "Python / FastAPI", "Vector DBs"];

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#082121] pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="orb w-[600px] h-[600px] bg-[#29E0C8] opacity-[0.06] -top-32 right-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#37B4B4]/20 border border-[#37B4B4]/30 flex items-center justify-center text-[#37B4B4]">
                  <Brain size={20} strokeWidth={1.5} />
                </div>
                <span className="section-label">AI Automation & Intelligence</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6">
                Turn Data Into{" "}
                <span className="text-[#37B4B4]">Intelligent Automation</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
                We help organisations deploy AI solutions that automate processes, generate insights, and improve decision making, starting with a low-risk proof of concept.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-7 py-3 rounded-xl cta-pulse transition-all inline-flex items-center gap-2"
                >
                  Explore AI Opportunities <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-[#0E3E3E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12">
              <span className="section-label mb-4 inline-block">Capabilities</span>
              <h2 className="text-3xl font-medium text-white">What We Deliver</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 0.09}>
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#37B4B4]/15 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4]">
                    {cap.icon}
                  </div>
                  <h3 className="text-white font-semibold">{cap.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16">
          <ScrollReveal>
            <span className="section-label mb-4 inline-block">Tools & Platforms</span>
            <h2 className="text-3xl font-medium text-white mb-6">Technology We Work With</h2>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <div key={tool} className="glass-card rounded-xl px-4 py-2.5 border border-white/8">
                  <span className="text-white/75 text-sm font-medium">{tool}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="section-label mb-4 inline-block">Our Approach</span>
            <h2 className="text-3xl font-medium text-white mb-6">Start Small, Scale Fast</h2>
            <ul className="space-y-4">
              {[
                "Begin with a focused 4-week Proof of Concept",
                "Demonstrate measurable ROI before full investment",
                "Build on existing data. No greenfield data strategy required.",
                "Train your team to operate and monitor AI independently",
                "Ongoing monitoring, retraining, and performance optimisation",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start text-white/70 text-sm">
                  <CheckCircle2 className="text-[#37B4B4] shrink-0 mt-0.5" size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-7 py-3 rounded-xl cta-pulse transition-all"
            >
              Book AI Discovery Session <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
