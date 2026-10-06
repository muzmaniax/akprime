"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cpu, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { BookingModal } from "@/components/ui/BookingModal";
import { type ServiceCategory, type ServiceData } from "@/data/services";
import { getLocalizedServices } from "@/lib/i18n/localized-data";
import { useI18n } from "@/lib/i18n/context";
import { useSiteImage } from "@/lib/use-site-images";

const CATEGORIES_EN: { key: ServiceCategory; short: string; label: string; blurb: string; icon: React.ElementType }[] = [
  {
    key: "Systems & Technology",
    short: "Systems",
    label: "Systems & Technology",
    blurb: "ERP, AI, audits and training that turn fragmented tools into a unified operating core.",
    icon: Cpu,
  },
  {
    key: "Finance & Compliance",
    short: "Finance",
    label: "Finance & Compliance",
    blurb: "Audit, FP&A, cashflow, bookkeeping and compliance that hold up to scrutiny.",
    icon: Shield,
  },
  {
    key: "Strategy & Transformation",
    short: "Strategy",
    label: "Strategy & Transformation",
    blurb: "Project governance, business analysis, restructuring and capital readiness.",
    icon: BarChart3,
  },
  {
    key: "HR & People Services",
    short: "HR & People",
    label: "HR & People Services",
    blurb: "Org design, payroll, recruitment, performance and L&D. The full people stack.",
    icon: Users,
  },
  {
    key: "Growth & Impact",
    short: "Growth",
    label: "Growth & Impact",
    blurb: "Brand, performance marketing and impact frameworks that move the metric.",
    icon: TrendingUp,
  },
];

const CATEGORIES_AR: { key: ServiceCategory; short: string; label: string; blurb: string; icon: React.ElementType }[] = [
  {
    key: "Systems & Technology",
    short: "الأنظمة والتقنية",
    label: "الأنظمة وتكنولوجيا المعلومات",
    blurb: "أنظمة تخطيط الموارد (ERP)، الذكاء الاصطناعي، والتدريب لتوحيد البرمجيات في منصة تشغيل مركزية.",
    icon: Cpu,
  },
  {
    key: "Finance & Compliance",
    short: "المالية والامتثال",
    label: "المالية والتدقيق والامتثال",
    blurb: "التدقيق المحاسبي، التخطيط المالي (FP&A)، إدارة السيولة، وحوكمة الامتثال للمعايير الدولية.",
    icon: Shield,
  },
  {
    key: "Strategy & Transformation",
    short: "الاستراتيجية",
    label: "الاستراتيجية والتحول المؤسسي",
    blurb: "حوكمة المشاريع الكبرى، تحليل الأعمال، إعادة الهيكلة التشغيلية وجاهزية جذب رؤوس الأموال.",
    icon: BarChart3,
  },
  {
    key: "HR & People Services",
    short: "الموارد البشرية",
    label: "الموارد البشرية والتمكين",
    blurb: "تصميم الهياكل، مسيرات الرواتب، استقطاب القيادات، تقييم الأداء وبرامج التطوير الوظيفي.",
    icon: Users,
  },
  {
    key: "Growth & Impact",
    short: "النمو والأثر",
    label: "النمو التسويقي والأثر",
    blurb: "بناء الهوية المؤسسية، التسويق القائم على النتائج، وأطر قياس الأثر لتحقيق نمو مستدام.",
    icon: TrendingUp,
  },
];

const PHASES_EN = [
  { num: "01", title: "Assess", desc: "Structured discovery: interviews, current-state mapping and gap analysis. We understand the business before proposing a solution." },
  { num: "02", title: "Design", desc: "Solution architecture, requirement specs, risk register and agreed KPIs. Nothing moves to implementation without sign-off." },
  { num: "03", title: "Implement", desc: "Deploy with formal change control and milestone governance. Payments tied to accepted deliverables." },
  { num: "04", title: "Train", desc: "Role-based training, SOPs, e-learning modules and competency assessment before go-live." },
  { num: "05", title: "Scale", desc: "30 / 60 / 90-day hypercare reviews, support log and lessons-learned session. We optimise as the business grows." },
];

const PHASES_AR = [
  { num: "01", title: "التقييم والاكتشاف", desc: "استكشاف منظم يشمل مقابلات الإدارة، ورسم مسارات العمل الراهنة، وتحليل الفجوات قبل طرح أي حلول." },
  { num: "02", title: "التصميم والمعمارية", desc: "تصميم بنية الحلول، وتحديد وثائق المتطلبات الدقيقة، وسجل المخاطر، ومؤشرات الأداء المعتمدة." },
  { num: "03", title: "التنفيذ والحوكمة", desc: "نشر الأنظمة بإدارة تغيير صارمة وحوكمة مرحلية شفافة تضمن مطابقة المخرجات للمواصفات." },
  { num: "04", title: "التدريب والتمكين", desc: "برامج تدريبية موجهة حسب الأدوار الوظيفية، وأدلة تشغيل قياسية (SOPs) لضمان ثقة الموظفين." },
  { num: "05", title: "التوسع والتحسين", desc: "دعم مكثف بعد 30 و 60 و 90 يوماً من التشغيل الحي لمتابعة كفاءة الاستخدام وتعظيم العائد الاستثماري." },
];

const SECTORS_EN = [
  { label: "Manufacturing", slug: "manufacturing", image: "/images/tech-workspace.webp" },
  { label: "Financial Services", slug: "financial-services", image: "/images/success-team.webp" },
  { label: "Healthcare", slug: "healthcare", image: "/images/business-growth.webp" },
  { label: "Government & Public Sector", slug: "government", image: "/images/professional-discussion.webp" },
  { label: "NGOs & Donors", slug: "ngos", image: "/images/innovation-lab.webp" },
  { label: "Logistics & Transport", slug: "logistics", image: "/images/digital-transformation.webp" },
  { label: "Education", slug: "education", image: "/images/business-analysis.webp" },
  { label: "Retail & FMCG", slug: "retail", image: "/images/team-brainstorm.webp" }
];

const SECTORS_AR = [
  { label: "التصنيع والإنتاج", slug: "manufacturing", image: "/images/tech-workspace.webp" },
  { label: "الخدمات المالية والمصرفية", slug: "financial-services", image: "/images/success-team.webp" },
  { label: "الرعاية الصحية", slug: "healthcare", image: "/images/business-growth.webp" },
  { label: "القطاع الحكومي والعام", slug: "government", image: "/images/professional-discussion.webp" },
  { label: "المنظمات غير الربحية والجهات المانحة", slug: "ngos", image: "/images/innovation-lab.webp" },
  { label: "اللوجستيات والنقل", slug: "logistics", image: "/images/digital-transformation.webp" },
  { label: "التعليم والأكاديميات", slug: "education", image: "/images/business-analysis.webp" },
  { label: "التجزئة والسلع الاستهلاكية", slug: "retail", image: "/images/team-brainstorm.webp" }
];

export function ServicesPageClient() {
  const { locale, t, dir } = useI18n();
  const isAr = locale === "ar";
  const [activeCat, setActiveCat] = useState<ServiceCategory>("Systems & Technology");
  const [bookingOpen, setBookingOpen] = useState(false);

  const categories = isAr ? CATEGORIES_AR : CATEGORIES_EN;
  const phases = isAr ? PHASES_AR : PHASES_EN;
  const sectors = isAr ? SECTORS_AR : SECTORS_EN;

  const localizedServices = useMemo(() => getLocalizedServices(locale), [locale]);

  const grouped = useMemo(() => {
    const m = new Map<ServiceCategory, ServiceData[]>();
    CATEGORIES_EN.forEach((c) => m.set(c.key, []));
    localizedServices.forEach((s) => m.get(s.category)?.push(s));
    return m;
  }, [localizedServices]);

  const visible = grouped.get(activeCat) ?? [];

  return (
    <div className="bg-white text-[#082121]">
      {/* HERO */}
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>{isAr ? "خدماتنا المتخصصة" : "Our Services"}</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-3 text-white text-balance max-w-[24ch]"
              style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}
            >
              {isAr
                ? "طوّر عمليات مؤسستك بنظم ERP الحديثة والذكاء الاصطناعي والاستشارات الاستراتيجية."
                : "Modernise your business operations with AI, ERP & strategic advisory."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-xl">
              {isAr
                ? `${localizedServices.length} خط خدمة متكامل عبر خمسة مجالات ممارسة رئيسية. تنفيذ شامل من مرحلة التقييم حتى التوسع المستمر، بتنسيق موحد تحت سقف واحد.`
                : `${localizedServices.length} integrated service lines across five practice areas. End-to-end delivery from discovery to scale, coordinated under one roof.`}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => setBookingOpen(true)} className="btn-cta">
                {t.hero.bookConsultation} <ArrowUpRight size={16} strokeWidth={2.25} className="rtl-mirror" />
              </button>
              <Link href="#all-services" className="btn-ghost">
                {isAr ? "تصفح جميع الخدمات" : "Browse all services"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="pt-12 pb-10 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>{isAr ? "مجالات الممارسة" : "Practice Areas"}</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                {isAr ? "خمسة مجالات تخصصية. فريق استشاري متكامل. تنفيذ لا يساوم." : "Four practice areas. One team. End-to-end delivery."}
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                {isAr
                  ? "اختر مجال التركيز الذي تحتاجه. نوفر خبرات متعمقة في كافة المجالات، مع تنسيق سلس عندما يمتد مشروعك لأكثر من اختصاص."
                  : "Pick where you need depth. We bring expertise across all four, coordinated when your engagement spans more than one."}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {categories.map((c, i) => {
              const Icon = c.icon;
              const count = (grouped.get(c.key) ?? []).length;
              return (
                <Reveal key={c.key} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCat(c.key);
                      document.getElementById("all-services")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`group w-full text-left rtl:text-right flex flex-col p-5 rounded-2xl border transition-all duration-200 ${
                      activeCat === c.key
                        ? "bg-[#082121] border-[#082121]"
                        : "bg-[#F4FAFA] border-[#082121]/8 hover:border-[#37B4B4]/40 hover:bg-white"
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      activeCat === c.key
                        ? "bg-[#37B4B4]/20"
                        : "bg-white border border-[#082121]/8 group-hover:border-[#37B4B4]/30"
                    }`}>
                      <Icon size={18} strokeWidth={1.75} className="text-[#37B4B4]" />
                    </div>

                    {/* Title */}
                    <h3 className={`text-[14px] font-medium leading-snug mb-1.5 transition-colors ${
                      activeCat === c.key ? "text-white" : "text-[#082121]"
                    }`}>
                      {c.label}
                    </h3>

                    {/* Blurb */}
                    <p className={`text-[12px] leading-relaxed flex-1 transition-colors ${
                      activeCat === c.key ? "text-white/60" : "text-[#3a5a5a]"
                    }`}>
                      {c.blurb}
                    </p>

                    {/* Count */}
                    <div className={`mt-4 pt-3 border-t text-[11px] font-semibold tracking-widest uppercase transition-colors ${
                      activeCat === c.key ? "border-white/10 text-[#37B4B4]" : "border-[#082121]/8 text-[#3a5a5a]/50"
                    }`}>
                      {isAr ? `${count} خدمات` : `${count} services`}
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL SERVICES — tabbed photo card grid */}
      <section id="all-services" className="pt-8 pb-[clamp(64px,7vw,112px)] bg-[#F4FAFA]/60">
        <div className="container-x">
          {/* Sticky filter pills */}
          <div className="mt-8 sticky top-[var(--navbar-h)] z-20 -mx-4 px-4 py-3 bg-[#F4FAFA]/85 backdrop-blur-md border-b border-[#082121]/8">
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCat(c.key)}
                  className={`shrink-0 h-10 px-4 rounded-full text-[13px] font-medium transition-colors border whitespace-nowrap ${
                    activeCat === c.key
                      ? "bg-[#37B4B4] text-white border-[#37B4B4]"
                      : "bg-white text-[#3a5a5a] border-[#082121]/12 hover:border-[#37B4B4]/40 hover:text-[#37B4B4]"
                  }`}
                >
                  {c.short}
                  <span className="ms-2 text-[11px] opacity-75">{(grouped.get(c.key) ?? []).length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service cards */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visible.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 60}>
                <ServiceCard s={s} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5-PHASE FRAMEWORK */}
      <section className="py-12 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow className="justify-center">{isAr ? "منهجية التنفيذ" : "How we deliver"}</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                {isAr ? "إطار عمل مجرّب من 5 مراحل متتالية." : "A proven 5-phase framework."}
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                {isAr ? "في كل شراكة. في كل مسار خدمة. وفي كل مرة." : "Every engagement. Every service line. Every time."}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {phases.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="h-full p-5 rounded-2xl bg-[#F4FAFA] border border-[#082121]/8">
                  <div className="text-[#37B4B4] text-[11px] font-semibold tracking-[0.18em] mb-3"><bdi className="ltr-isolate">{p.num}</bdi></div>
                  <h3 className="text-[#082121] text-[16px] mb-2">{p.title}</h3>
                  <p className="text-[12px] text-[#3a5a5a] leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-16 md:py-24 bg-[#F4FAFA]/60 overflow-hidden">
        <div className="container-x mb-12">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Eyebrow className="justify-center">{isAr ? "القطاعات المخدومة" : "Sectors we serve"}</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance">
                {isAr ? "حلول مصممة لخصوصية قطاعك." : "Built for your industry."}
              </h2>
              <p className="mt-4 text-[15px] md:text-[16px] text-[#3a5a5a] leading-relaxed">
                {isAr
                  ? "لا نستخدم قوالب جاهزة. كل مشروع استشاري يستند إلى فهم عميق لمتطلبات القطاع وبيئته التنظيمية في شرق إفريقيا والخليج العربي."
                  : "We don't apply generic templates. Every engagement draws on deep sector knowledge built across years of cross-market delivery."}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <style>{`
            @keyframes scroll-left {
              from { transform: translateX(0); }
              to { transform: translateX(calc(-50% - 12px)); }
            }
            @keyframes scroll-right {
              from { transform: translateX(calc(-50% - 12px)); }
              to { transform: translateX(0); }
            }
            .animate-scroll-left { animation: scroll-left 50s linear infinite; }
            .animate-scroll-right { animation: scroll-right 50s linear infinite; }
            .animate-scroll-left:hover, .animate-scroll-right:hover { animation-play-state: paused; }
          `}</style>
          
          <div className="flex flex-col gap-6 w-full relative">
            {/* Single Row - Moves Left */}
            <div className="flex gap-6 w-max animate-scroll-left px-3">
              {[...sectors, ...sectors].map((s, i) => (
                <Link
                  key={`top-${i}`}
                  href={`/${locale}/industries/${s.slug}`}
                  className="group relative overflow-hidden rounded-2xl flex-shrink-0 w-[280px] h-[360px] md:w-[360px] md:h-[440px] block"
                >
                  <Image src={s.image} alt={s.label} fill sizes="(max-width: 768px) 280px, 360px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-[#082121]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
                    <h3 className="text-white text-[20px] md:text-[24px] font-medium tracking-tight pr-4 leading-snug">{s.label}</h3>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={22} strokeWidth={1.5} className="rtl-mirror" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl bg-[#082121] text-white p-10 lg:p-14 text-center relative overflow-hidden">
              <div className="cta-glow-bg" />
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#37B4B4]/15 blur-3xl pointer-events-none" />
              <div className="relative">
                <Eyebrow className="justify-center">{t.contactSection.overline}</Eyebrow>
                <h2 className="mt-4 text-white text-balance max-w-[18ch] mx-auto">
                  {isAr ? "تواصل معنا لتحديد نطاق عمل استشاري مخصص." : "Contact us for a tailored service scope."}
                </h2>
                <p className="mt-4 text-[15px] text-white/65 max-w-xl mx-auto">
                  <bdi className="ltr-isolate">info@akprime.co.ke</bdi> &nbsp;·&nbsp; <bdi className="ltr-isolate">0118 001 001</bdi> &nbsp;·&nbsp; {t.footer.locations}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => setBookingOpen(true)} className="btn-cta">
                    {t.hero.bookConsultation} <ArrowUpRight size={16} strokeWidth={2.25} className="rtl-mirror" />
                  </button>
                  <Link href={`/${locale}/contact`} className="btn-ghost">
                    {t.ctaBanner.contactUs}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}

function ServiceCard({ s, locale }: { s: ServiceData; locale: string }) {
  const cmsPhoto = useSiteImage(`service.${s.id}`);
  const photo = cmsPhoto || s.photo;
  return (
    <Link
      href={`/${locale}/services/${s.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-[#082121]/8 hover:border-[#37B4B4]/40 bg-white hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-[220px] overflow-hidden bg-[#F4FAFA]">
        <Image
          src={photo}
          alt={s.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: "center 40%" }}
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#37B4B4] mb-2">
          {s.category.split(" & ")[0]}
        </p>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[#082121] text-[18px] font-medium leading-snug flex-1">{s.name}</h3>
          <span className="w-8 h-8 rounded-full border border-[#082121]/10 flex items-center justify-center shrink-0 text-[#3a5a5a]/40 group-hover:border-[#37B4B4] group-hover:text-[#37B4B4] group-hover:bg-[#37B4B4]/8 transition-all mt-0.5">
            <ArrowUpRight size={14} strokeWidth={2} className="rtl-mirror" />
          </span>
        </div>
        <p className="mt-2 text-[14px] text-[#3a5a5a] leading-relaxed line-clamp-2">{s.shortDescription}</p>
      </div>
    </Link>
  );
}
