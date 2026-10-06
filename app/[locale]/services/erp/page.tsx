import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Database } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "تطبيق أنظمة تخطيط الموارد ERP | أودو، ساب، داينامكس | AK Prime"
      : "ERP Implementation | Odoo, SAP B1, Dynamics 365 | AK Prime",
    description: isAr
      ? "تقدم AK Prime حلولاً متكاملة لتطبيق أنظمة تخطيط موارد المؤسسات ERP وربط المالية والمخزون وسلاسل الإمداد في نظام موحد للشركات في كينيا والخليج العربي."
      : "AK Prime Consulting delivers end-to-end ERP transformation, from vendor selection to go-live. We connect finance, operations, and supply chain in one real-time system.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/services/erp`,
      languages: {
        en: "https://akprime.co.ke/en/services/erp",
        ar: "https://akprime.co.ke/ar/services/erp",
        "x-default": "https://akprime.co.ke/en/services/erp",
      },
    },
  };
}

const deliveryProcessEn = [
  { step: "01", title: "Assessment", desc: "Map current systems, processes, data flows, and integration requirements." },
  { step: "02", title: "Vendor Selection", desc: "Short-list and evaluate Odoo, SAP B1, Dynamics 365, or NetSuite against your requirements." },
  { step: "03", title: "Configuration", desc: "Build and configure your chosen ERP to match your specific business requirements." },
  { step: "04", title: "Data Migration", desc: "Clean, transform, and migrate legacy data with full validation and rollback capability." },
  { step: "05", title: "Testing & Piloting", desc: "UAT, regression testing, and a managed pilot with a key user group before full go-live." },
  { step: "06", title: "Training", desc: "Role-based training programmes, SOP documentation, and super-user enablement." },
  { step: "07", title: "Go-Live & Hypercare", desc: "Managed go-live with dedicated hypercare support for 90 days post-implementation." },
];

const deliveryProcessAr = [
  { step: "01", title: "التقييم والتشخيص", desc: "رسم مسارات الأنظمة الراهنة والعمليات وتدفقات البيانات ومتطلبات التكامل التقني." },
  { step: "02", title: "اختيار المنصة والمورد", desc: "مفاضلة دقيقة بين أودو، وساب بيزنس ون، وداينامكس 365، ونت سويت بناءً على احتياجك الفعلي وميزانيتك." },
  { step: "03", title: "التهيئة والتخصيص", desc: "بناء وتخصيص وحدات النظام لتتطابق تماماً مع متطلبات دورتك المستندية والتشغيلية." },
  { step: "04", title: "ترحيل وتدقيق البيانات", desc: "تنقية وترحيل البيانات القديمة والتحقق من صحتها التامة مع توفير خطة استعادة كاملة." },
  { step: "05", title: "الاختبار والتشغيل التجريبي", desc: "اختبارات قبول المستخدمين (UAT) وتشغيل تجريبي مع المستخدمين الرئيسيين قبل الإطلاق الكامل." },
  { step: "06", title: "التدريب وإعداد الكفاءات", desc: "برامج تدريبية مفصلة حسب المهام الوظيفية وأدلة تشغيل قياسية وتأهيل مشرفي النظام." },
  { step: "07", title: "الإطلاق الحي والدعم الفائق", desc: "إطلاق حي مُدار بإحكام مع دعم فني واستشاري متواصل لمدة 90 يوماً بعد الإطلاق." },
];

const kpisEn = [
  "Go-live delivered on time and within agreed scope",
  "Month-end close time reduction (target: 40–60%)",
  "Process automation rate (target: >60% of manual tasks)",
  "User adoption rate at 60 days post go-live (target: >90%)",
  "Data migration accuracy rate (target: 99.9%)",
];

const kpisAr = [
  "تشغيل حي مطابق للموعد المعتمد ونطاق العمل بنسبة 100%",
  "تقليص مدة الإقفال المالي الشهري بنسبة 40% إلى 60%",
  "أتمتة العمليات اليدوية بنسبة تتجاوز 60%",
  "معدل تبنٍ وتشغيل نشط يفوق 90% بعد 60 يوماً من الإطلاق",
  "دقة متناهية في ترحيل ومطابقة البيانات السابقة بنسبة 99.9%",
];

const tools = ["Odoo", "SAP Business One", "Microsoft Dynamics 365", "NetSuite", "Power BI", "Azure DevOps"];

export default async function ERPPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const deliveryProcess = isAr ? deliveryProcessAr : deliveryProcessEn;
  const kpis = isAr ? kpisAr : kpisEn;

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
                <span className="section-label">
                  {isAr ? "تطبيق وتطوير أنظمة ERP" : "ERP Implementation"}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-medium text-white tracking-tight mb-6">
                {isAr ? (
                  <>
                    استبدل الأنظمة المشتتة بـ{" "}
                    <span className="text-[#37B4B4]">عمليات مؤسسية موحدة</span>
                  </>
                ) : (
                  <>
                    Replace Fragmented Systems With{" "}
                    <span className="text-[#37B4B4]">Unified Operations</span>
                  </>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
                {isAr
                  ? "تقدم إيه كي برايم تحولاً متكاملاً في أنظمة تخطيط الموارد يربط المالية وسلاسل الإمداد والعمليات في منظومة واحدة لحظية، من دراسة الجدوى والاختيار وحتى التشغيل وما بعده."
                  : "AK Prime delivers end-to-end ERP transformation that connects finance, operations, and data across your entire organisation, from selection to go-live and beyond."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-7 py-3 rounded-xl cta-pulse transition-all inline-flex items-center gap-2"
                >
                  {isAr ? "ابدأ تقييم نظام ERP" : "Start ERP Assessment"}{" "}
                  <ArrowRight size={16} className="rtl-mirror" />
                </Link>
                <Link
                  href={`/${locale}/case-studies`}
                  className="border border-[#37B4B4]/30 text-white hover:bg-[#37B4B4]/10 px-7 py-3 rounded-xl transition-all inline-flex items-center gap-2"
                >
                  {isAr ? "استعرض دراسات الحالة" : "View Case Studies"}
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
              <span className="section-label mb-4 inline-block">
                {isAr ? "منهجية التسليم" : "Delivery Process"}
              </span>
              <h2 className="text-3xl font-medium text-white">
                {isAr ? "منهجية تطبيق ERP المتدرجة من 7 مراحل" : "Our 7-Phase ERP Methodology"}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {deliveryProcess.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-5 h-full">
                  <div className="text-5xl font-medium text-white/5 mb-2 leading-none"><bdi className="ltr-isolate">{item.step}</bdi></div>
                  <div className="w-6 h-6 rounded-md bg-[#37B4B4]/20 border border-[#37B4B4]/30 flex items-center justify-center mb-3">
                    <span className="text-[#37B4B4] text-xs font-medium"><bdi className="ltr-isolate">{item.step}</bdi></span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16">
          <ScrollReveal>
            <span className="section-label mb-4 inline-block">
              {isAr ? "مؤشرات النجاح المقاسة" : "Measurable Success"}
            </span>
            <h2 className="text-3xl font-medium text-white mb-6">
              {isAr ? "مؤشرات الأداء الرئيسية (KPIs)" : "Key Performance Indicators"}
            </h2>
            <div className="space-y-4">
              {kpis.map((kpi) => (
                <div key={kpi} className="flex gap-3 items-start">
                  <CheckCircle2 className="text-[#37B4B4] shrink-0 mt-0.5" size={18} />
                  <span className="text-white/70 text-sm leading-relaxed">{kpi}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="section-label mb-4 inline-block">
              {isAr ? "المنصات والتقنيات" : "Platforms & Tech"}
            </span>
            <h2 className="text-3xl font-medium text-white mb-6">
              {isAr ? "الأنظمة التي نتخصص بها" : "Systems We Implement"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {tools.map((t) => (
                <div key={t} className="glass-card rounded-xl px-4 py-2.5 border border-white/8">
                  <span className="text-white/75 text-sm font-medium">
                    <bdi className="ltr-isolate">{t}</bdi>
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
