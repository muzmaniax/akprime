import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, BarChart2, BookOpen, ClipboardCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "المصادر والأدلة المجانية | AK Prime Consulting"
      : "Resources & Free Downloads | AK Prime Consulting",
    description: isAr
      ? "أدلة وقوائم تحقق ونماذج تقييم مجانية من AK Prime Consulting تغطي تطبيق أنظمة ERP، واستراتيجيات الذكاء الاصطناعي، وتحسين التدفقات النقدية."
      : "Free guides, checklists, and assessments from AK Prime Consulting, covering ERP implementation, AI strategy, cashflow optimisation, and digital transformation readiness.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/resources`,
      languages: {
        en: "https://akprime.co.ke/en/resources",
        ar: "https://akprime.co.ke/ar/resources",
        "x-default": "https://akprime.co.ke/en/resources",
      },
    },
  };
}

const resourcesEn = [
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

const resourcesAr = [
  {
    icon: <ClipboardCheck size={24} />,
    tag: "نظم ERP",
    title: "قائمة التحقق الشاملة لتطبيق أنظمة ERP",
    desc: "قائمة تدقيق مكونة من 60 بنداً تغطي كافة المراحل بدءاً من اختيار المورد وحتى الجاهزية للتشغيل الحي والمراجعة اللاحقة.",
    format: "PDF · 12 صفحة",
    href: "#download-erp",
  },
  {
    icon: <BarChart2 size={24} />,
    tag: "الذكاء الاصطناعي",
    title: "دليل استراتيجيات أتمتة الذكاء الاصطناعي",
    desc: "دليل عملي لتحديد حالات الاستخدام الأعلى عائداً، وتقييم المخاطر، وإطلاق نماذج إثبات الجدوى الأولية في مؤسستك.",
    format: "PDF · 18 صفحة",
    href: "#download-ai",
  },
  {
    icon: <FileText size={24} />,
    tag: "الإدارة المالية",
    title: "دليل إدارة وتحسين التدفقات النقدية (Playbook)",
    desc: "أطر عمل ونماذج ومؤشرات أداء عملية لتحسين رأس المال العامل، وإطالة أمد السيولة، وبناء المرونة المالية للمؤسسة.",
    format: "PDF · 15 صفحة",
    href: "#download-cashflow",
  },
  {
    icon: <BookOpen size={24} />,
    tag: "التقييم المؤسسي",
    title: "مقياس الجاهزية للتحول الرقمي",
    desc: "تقييم تفاعلي مدته 10 دقائق يحدد مستوى الجاهزية الرقمية لمؤسستك عبر 5 محاور تشغيلية أساسية ويقترح الخطوات التالية.",
    format: "تفاعلي · 10 دقائق",
    href: "#download-assessment",
  },
];

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const resources = isAr ? resourcesAr : resourcesEn;

  return (
    <div className="min-h-screen bg-[#082121] pt-24">
      {/* Hero */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal>
            <span className="section-label mb-6 inline-block">
              {isAr ? "مصادر وأدوات استشارية مجانية" : "Free Resources"}
            </span>
            <h1 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-5">
              {isAr ? (
                <>
                  أدوات وأطر عمل تساعدك على<br />
                  <span className="text-[#37B4B4]">اتخاذ قرارات استراتيجية أفضل</span>
                </>
              ) : (
                <>
                  Tools to Help You<br />
                  <span className="text-[#37B4B4]">Make Better Decisions</span>
                </>
              )}
            </h1>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              {isAr
                ? "أدلة إرشادية ونماذج تقييم وقوائم تحقق أعدها مستشارونا التنفيذيون، صُممت لتطبقها مباشرة في تطوير أعمالك."
                : "Free guides, assessments, and checklists from our consulting team. Practical resources you can use immediately."}
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
                      {isAr ? "تحميل مجاناً" : "Download Free"}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact note */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-white/40 text-sm">
                {isAr ? "هل تبحث عن إطار عمل مخصص أو استشارة محددة؟" : "Looking for something specific or customized?"}{" "}
                <Link href={`/${locale}/contact`} className="text-[#37B4B4] hover:underline font-medium">
                  {isAr ? "تواصل مع مستشارينا مباشرة" : "Contact our consulting team"}
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
