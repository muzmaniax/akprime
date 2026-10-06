import { Metadata } from "next";
import { Reveal, Eyebrow, StatCell, SectionHeader, CtaButton, GhostButton } from "@/components/ui/Primitives";
import { FAQSection } from "@/components/sections/TestimonialsInsightsCTA";
import { Database, Cloud, TrendingUp, Zap, Users, Shield } from "lucide-react";
import { getSiteImage } from "@/lib/site-images";
import { AboutCTA } from "./AboutCTA";
import { Locale } from "@/lib/i18n/types";
import { isValidLocale, getDictionary } from "@/lib/i18n/get-dictionary";

const SITE_URL = "https://akprime.co.ke";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale);

  return {
    title: dict.seo.aboutTitle,
    description: dict.seo.aboutDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        ar: `${SITE_URL}/ar/about`,
        "x-default": `${SITE_URL}/en/about`,
      },
    },
  };
}

const VALUES_EN = [
  { title: "Clarity before complexity", body: "Most problems are misdiagnosed. We start by getting the question right." },
  { title: "Strategy with purpose", body: "Recommendations exist to be acted on. We design for execution, not the deck." },
  { title: "Consulting built on trust", body: "Senior teams, no junior shuffle. We're accountable to the work, not the hours." },
  { title: "Growth with intention", body: "We build capability inside your organisation, not dependence on us." },
];

const VALUES_AR = [
  { title: "الوضوح قبل التعقيد", body: "معظم المشكلات المؤسسية تُشخص بصورة خاطئة. نبدأ دائماً بالوصول إلى السؤال الدقيق والجذر الحقيقي للمشكلة." },
  { title: "استراتيجية قابلة للتنفيذ", body: "التوصيات وُجدت لتُطبق على أرض الواقع، ونحن نصمم الحلول من أجل التنفيذ الفعلي لا لمجرد العروض التقديمية." },
  { title: "استشارات قائمة على الثقة والمسؤولية", body: "مستشارون وخبراء تنفيذيون يقودون مشاريعك مباشرة دون إسناد العمل لصغار الموظفين، وملتزمون بالنتائج الملموسة." },
  { title: "بناء القدرات واستدامة النمو", body: "نؤسس الكفاءة والخبرة داخل كوادر مؤسستك لضمان استدامة النجاح دون خلق اعتماد دائم علينا." },
];

const CAPABILITIES_EN = [
  { title: "ERP Systems", description: "SAP, Odoo, NetSuite implementations and migrations", icon: Database },
  { title: "Technology", description: "Cloud infrastructure, API integrations, and digital transformation", icon: Cloud },
  { title: "Finance & FP&A", description: "CFO advisory, consolidation, and financial planning models", icon: TrendingUp },
  { title: "Operations", description: "Process redesign, supply chain, and operational excellence", icon: Zap },
  { title: "Organization Design", description: "Restructuring, talent strategy, and capability building", icon: Users },
  { title: "Compliance & Audit", description: "Risk frameworks, internal controls, and regulatory readiness", icon: Shield },
];

const CAPABILITIES_AR = [
  { title: "أنظمة تخطيط الموارد (ERP)", description: "تطبيق وترحيل أنظمة Odoo وSAP وNetSuite العالمية بدقة", icon: Database },
  { title: "التقنية والتحول الرقمي", description: "بنية سحابية، وتكامل واجهات البرمجة (APIs)، وأتمتة الذكاء الاصطناعي", icon: Cloud },
  { title: "المالية والتخطيط المالي (FP&A)", description: "استشارات المدير المالي، ونماذج التخطيط وإعداد الموازنات المتقدمة", icon: TrendingUp },
  { title: "العمليات وسلاسل الإمداد", description: "إعادة هندسة العمليات التشغيلية وتحقيق التميز في سلاسل التوريد", icon: Zap },
  { title: "الهيكلة والتصميم التنظيمي", description: "إعادة الهيكلة الإدارية، واستراتيجية الكفاءات، وتطبيق أنظمة HRMS", icon: Users },
  { title: "الامتثال والتدقيق المؤسسي", description: "أطر إدارة المخاطر، والرقابة الداخلية، والجاهزية الضريبية والتنظيمية", icon: Shield },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "en";
  const isArabic = locale === "ar";

  const heroBg = getSiteImage("about.hero_bg");
  const panel1 = getSiteImage("about.panel_1");
  const panel2 = getSiteImage("about.panel_2");

  const values = isArabic ? VALUES_AR : VALUES_EN;
  const capabilities = isArabic ? CAPABILITIES_AR : CAPABILITIES_EN;

  return (
    <>
      {/* Hero */}
      <section
        className="section-dark border-b border-white/[0.06] relative overflow-hidden"
        style={{
          paddingTop: "calc(var(--navbar-h, 64px) + 40px)",
          paddingBottom: "clamp(20px, 3vw, 40px)",
        }}
      >
        <div className="absolute inset-0 -z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('${heroBg || "/images/team-collaboration.webp"}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082121]/80 via-[#082121]/90 to-[#082121]" />
        </div>
        <div className="relative container-x">
          <Reveal>
            <Eyebrow>{isArabic ? "عن إيه كي برايم" : "About AK Prime"}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-3 text-white text-balance max-w-[26ch]"
              style={{
                fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)",
                lineHeight: 1.15,
              }}
            >
              {isArabic
                ? "نساعد القيادات التنفيذية على المضي قدماً بوضوح وانضباط وثقة تامة."
                : "We help leadership teams move with clarity and confidence."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              {isArabic
                ? "إيه كي برايم هي شركة استشارات استراتيجية وتنفيذية رائدة تعمل مع المنظمات الطموحة في أفريقيا والشرق الأوسط. نجمع بين الدقة الاستشارية والخبرة الميدانية في كل مشروع، من التشخيص التشغيلي وحتى تطبيق أنظمة ERP الشاملة والتحول المالي."
                : "AK Prime is a strategic consulting firm working with organisations across Africa and the Middle East. We bring rigour, structure, and senior expertise to every engagement, from operational diagnostics to ERP transformations."}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href={`/${locale}/book`}>
                {isArabic ? "حجز استشارة استراتيجية" : "Book a consultation"}
              </CtaButton>
              <GhostButton href={`/${locale}/services`}>
                {isArabic ? "استكشف خدماتنا" : "Our services"}
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-[#082121]/8">
        <div className="container-x py-10 lg:py-14">
          <div className="max-w-[1060px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StatCell
              value="+200"
              label={isArabic ? "مشروع استشاري منجز" : "Engagements delivered"}
            />
            <StatCell
              value="98%"
              label={isArabic ? "نسبة استبقاء ورضا العملاء" : "Client retention rate"}
            />
            <StatCell
              value="+25"
              label={isArabic ? "مستشاراً وخبيراً معتمداً" : "Advisory specialists"}
            />
            <StatCell
              value="3"
              label={isArabic ? "مكاتب إقليمية (نيروبي · مومباسا · دبي)" : "Regional offices (Nairobi · Mombasa · Dubai)"}
            />
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="bg-white section-py border-b border-[#082121]/8">
        <div className="container-x">
          <div className="max-w-[1060px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6 space-y-4">
              <Eyebrow>{isArabic ? "رسالتنا وقيمنا" : "Our Philosophy"}</Eyebrow>
              <h2 className="text-[#082121] text-balance text-[28px] sm:text-[34px] font-medium leading-tight">
                {isArabic
                  ? "بناء أنظمة تشغيلية تمنح المنشآت القدرة على التوسع بأمان."
                  : "Built to bridge the gap between high-level strategy and operational reality."}
              </h2>
              <p className="text-[14px] text-[#3a5a5a] leading-relaxed">
                {isArabic
                  ? "تأسست إيه كي برايم لمعالجة معضلة شائعة: تعاني معظم المؤسسات النامية من فجوة عميقة بين استراتيجيات مجلس الإدارة والواقع التشغيلي المعقد. نساعد المؤسسات على إزالة هذه الفجوة عبر توحيد الأنظمة، وتطوير الرقابة المالية، وأتمتة العمليات."
                  : "Too often, consulting engagements produce beautiful slide decks that sit on a shelf while operations continue to struggle with the same manual processes, siloed data, and delayed reporting."}
              </p>
              <p className="text-[14px] text-[#3a5a5a] leading-relaxed">
                {isArabic
                  ? "نعمل جنباً إلى جنب مع فريقك، ونلتزم بتحقيق مؤشرات أداء قابلة للقياس، وننقل المعرفة والمهارة الكاملة لكوادر مؤسستك."
                  : "We take a different approach. Every recommendation we make is paired with implementation capability. Whether it's redesigning an ERP architecture, establishing cashflow forecasting, or structuring an HR department, we stay until it works."}
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-[#082121]/5 shadow-sm">
                  <img
                    src={panel1 || "/images/tech-workspace.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-[#082121]/5 shadow-sm mt-6">
                  <img
                    src={panel2 || "/images/office-culture.webp"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F4FAFA] section-py border-b border-[#082121]/8">
        <div className="container-x">
          <div className="max-w-[1060px] mx-auto">
            <SectionHeader
              light
              eyebrow={isArabic ? "مبادئ العمل" : "Our Values"}
              title={
                isArabic
                  ? "المعايير والمبادئ التي توجه كل استشارة نقدمها"
                  : "How we think, work, and make decisions"
              }
              sub={
                isArabic
                  ? "مبادئ راسخة تضمن تحقيق أفضل العوائد لشركائنا وعملائنا."
                  : "Four foundational commitments that define our client relationships and delivery standard."
              }
            />

            <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mt-10">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 60}>
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#082121]/8 hover:border-[#37B4B4]/40 hover:shadow-[0_8px_30px_rgba(8,33,33,0.06)] transition-all duration-300 h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[12px] font-semibold tracking-widest text-[#37B4B4] uppercase">
                          <bdi className="ltr-isolate">0{i + 1}</bdi>
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]/30 group-hover:bg-[#37B4B4] transition-colors" />
                      </div>
                      <h3 className="text-[#082121] text-[18px] font-semibold leading-snug mb-2.5 group-hover:text-[#137a7a] transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-[13.5px] text-[#3a5a5a] leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white section-py border-b border-[#082121]/8">
        <div className="container-x">
          <div className="max-w-[1060px] mx-auto">
            <SectionHeader
              light
              eyebrow={isArabic ? "المجالات الاستشارية" : "Capabilities"}
              title={
                isArabic
                  ? "خبرات تخصصية متكاملة لخدمة المؤسسات النامية"
                  : "Integrated expertise across six disciplines"
              }
              sub={
                isArabic
                  ? "نغطي كافة جوانب التحول المؤسسي لضمان التوافق بين الأنظمة والمالية والكوادر."
                  : "We combine deep technical skill with business pragmatism across every practice area."
              }
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mt-10">
              {capabilities.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={i * 50}>
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#082121]/8 hover:border-[#37B4B4]/40 hover:shadow-[0_8px_30px_rgba(8,33,33,0.06)] transition-all duration-300 h-full flex flex-col group">
                      <div className="w-10 h-10 rounded-xl bg-[#F4FAFA] border border-[#082121]/8 flex items-center justify-center text-[#37B4B4] mb-4 group-hover:bg-[#37B4B4]/10 transition-colors">
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                      <h3 className="text-[#082121] text-[16px] font-semibold leading-snug mb-2 group-hover:text-[#137a7a] transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-[13px] text-[#3a5a5a] leading-relaxed flex-1">
                        {c.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <AboutCTA locale={locale} />
    </>
  );
}
