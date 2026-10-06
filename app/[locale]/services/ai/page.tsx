import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, CheckCircle2, Cpu, Eye, FileText, BarChart2, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "تكامل وأتمتة الذكاء الاصطناعي | حلول الذكاء الاصطناعي للشركات | AK Prime"
      : "AI Automation & Intelligence | AI Consulting Africa & Middle East | AK Prime",
    description: isAr
      ? "تساعد AK Prime المؤسسات على نشر حلول الذكاء الاصطناعي الآمنة لأتمتة العمليات وتوليد الرؤى الاستباقية، بدءاً من نماذج الإثبات السريعة منخفضة المخاطر."
      : "AK Prime helps organisations deploy AI solutions that automate processes, generate insights, and improve decision making, starting with a low-risk proof of concept.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/services/ai`,
      languages: {
        en: "https://akprime.co.ke/en/services/ai",
        ar: "https://akprime.co.ke/ar/services/ai",
        "x-default": "https://akprime.co.ke/en/services/ai",
      },
    },
  };
}

const capabilitiesEn = [
  { icon: <BarChart2 size={20} />, title: "Predictive Forecasting", desc: "AI-powered demand planning, revenue forecasting, and cashflow prediction models." },
  { icon: <Eye size={20} />, title: "Customer Insights & Segmentation", desc: "Machine learning models that surface high-value customer segments and churn risk." },
  { icon: <Cpu size={20} />, title: "Workflow Automation", desc: "Intelligent document processing, AP automation, and end-to-end process bots." },
  { icon: <FileText size={20} />, title: "Decision Support Systems", desc: "Executive dashboards and scenario modelling tools for confident strategic decisions." },
  { icon: <ShieldCheck size={20} />, title: "AI Ethics & Governance", desc: "Bias auditing, explainability frameworks, and AI monitoring for responsible deployment." },
  { icon: <Brain size={20} />, title: "Custom LLM Applications", desc: "Tailored language model applications for document analysis, customer support, and more." },
];

const capabilitiesAr = [
  { icon: <BarChart2 size={20} />, title: "التنبؤ التقديري والتحليلات المتقدمة", desc: "تخطيط الطلب بالذكاء الاصطناعي، ونماذج التنبؤ بالإيرادات والتدفقات النقدية بدقة." },
  { icon: <Eye size={20} />, title: "رؤى العملاء والتقسيم الذكي", desc: "نماذج تعلم آلي تكشف الشرائح عالية القيمة ومؤشرات مخاطر انسحاب العملاء مبكراً." },
  { icon: <Cpu size={20} />, title: "أتمتة العمليات والمستندات", desc: "معالجة ذكية للفواتير والمستندات المعقدة، وأتمتة المطابقات دون تدخل بشري يدوي." },
  { icon: <FileText size={20} />, title: "أنظمة دعم القرار التنفيذي", desc: "لوحات تحكم ذكية ونماذج محاكاة السيناريوهات لاتخاذ قرارات استراتيجية مبنية على الحقائق." },
  { icon: <ShieldCheck size={20} />, title: "حوكمة وأخلاقيات الذكاء الاصطناعي", desc: "أطر خصوصية البيانات، وتدقيق شفافية النماذج لضمان نشر آمن ومتوافق مع القوانين." },
  { icon: <Brain size={20} />, title: "تطبيقات النماذج اللغوية (LLMs) المخصصة", desc: "وكلاء ذكاء اصطناعي مدربون على وثائق وبيانات مؤسستك لخدمة العملاء والتحليل المستندي." },
];

const tools = ["OpenAI GPT-4", "Azure OpenAI", "LangChain", "Power BI", "Azure ML", "Python / FastAPI", "Vector DBs"];

export default async function AIPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const capabilities = isAr ? capabilitiesAr : capabilitiesEn;

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
                <span className="section-label">
                  {isAr ? "الذكاء الاصطناعي والأتمتة" : "AI Automation & Intelligence"}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6">
                {isAr ? (
                  <>
                    حوّل البيانات المتراكمة إلى{" "}
                    <span className="text-[#37B4B4]">أتمتة ذكية وموثوقة</span>
                  </>
                ) : (
                  <>
                    Turn Data Into{" "}
                    <span className="text-[#37B4B4]">Intelligent Automation</span>
                  </>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
                {isAr
                  ? "نساعد المؤسسات على نشر حلول الذكاء الاصطناعي التي تؤتمت العمليات الروتينية، وتستخلص التحليلات المعمقة، وتطور صنع القرار، بدءاً من إثبات جدوى سريع ومنخفض المخاطر."
                  : "We help organisations deploy AI solutions that automate processes, generate insights, and improve decision making, starting with a low-risk proof of concept."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-7 py-3 rounded-xl cta-pulse transition-all inline-flex items-center gap-2"
                >
                  {isAr ? "استكشف فرص الذكاء الاصطناعي" : "Explore AI Opportunities"}{" "}
                  <ArrowRight size={16} className="rtl-mirror" />
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
              <span className="section-label mb-4 inline-block">
                {isAr ? "القدرات والحلول" : "Capabilities"}
              </span>
              <h2 className="text-3xl font-medium text-white">
                {isAr ? "ما نقدمه في حلول الذكاء الاصطناعي" : "What We Deliver"}
              </h2>
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
            <span className="section-label mb-4 inline-block">
              {isAr ? "الأدوات والمنصات" : "Tools & Platforms"}
            </span>
            <h2 className="text-3xl font-medium text-white mb-6">
              {isAr ? "التقنيات التي نعتمد عليها" : "Technology We Work With"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <div key={tool} className="glass-card rounded-xl px-4 py-2.5 border border-white/8">
                  <span className="text-white/75 text-sm font-medium">
                    <bdi className="ltr-isolate">{tool}</bdi>
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="section-label mb-4 inline-block">
              {isAr ? "منهجيتنا السريعة" : "Our Approach"}
            </span>
            <h2 className="text-3xl font-medium text-white mb-4">
              {isAr ? "إثبات الجدوى خلال 14 يوماً" : "14-Day Proof of Concept"}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {isAr
                ? "لا نطلب التزامات طويلة الأمد قبل إثبات الجدوى. نبني نموذجاً أولياً حياً خلال أسبوعين يوضح الأثر التشغيلي والعائد المتوقع بدقة وأمان تام."
                : "We don't ask for large multi-month commitments upfront. We build a functional proof of concept in two weeks to demonstrate measurable value before scaling."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-medium text-sm transition-colors"
            >
              {isAr ? "احجز جلسة نقاشية لإثبات الجدوى" : "Book a POC Discovery Session"}{" "}
              <ArrowRight size={14} className="rtl-mirror" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
