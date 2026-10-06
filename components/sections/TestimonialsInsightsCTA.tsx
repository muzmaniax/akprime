"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button-cva";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteImage } from "@/lib/use-site-images";
import { useCMSContent } from "@/lib/use-cms-content";
import { useI18n } from "@/lib/i18n/context";
import { getLocalizedInsightArticle } from "@/lib/i18n/localized-data";

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS_EN = [
  {
    name: "Station Manager",
    role: "MO Radio 88.2FM",
    initials: "MR",
    quote:
      "We were overpaying taxes without even realising it. AK Prime stepped in, audited everything, and fixed the gaps immediately. What stood out was how clear they made the whole process. We're now compliant, saving money, and finally have control over our finances.",
  },
  {
    name: "Managing Director",
    role: "Coastal Image Technologies Limited",
    initials: "CIT",
    quote:
      "Five years of records that had never been properly accounted for. AK Prime came in, made sense of everything, and handed us a clean set of books and a system we can actually use. The turnaround was faster than we thought possible.",
  },
  {
    name: "David Mwangi",
    role: "Operations Director, Meridian Distributors Ltd",
    initials: "DM",
    quote:
      "We'd been told ERP implementation would take six months and disrupt the entire business. AK Prime delivered in twelve weeks with zero downtime. Inventory accuracy went from guesswork to 98% on day one, and the team was still reachable months after go-live.",
  },
  {
    name: "Fatuma Hassan",
    role: "Head of People & Culture, Savannah Capital Partners",
    initials: "FH",
    quote:
      "Payroll compliance across multiple counties was becoming a liability. AK Prime restructured our entire people operations in eight weeks: policies, payroll, and a proper HRMS. We haven't had a single compliance flag since. They understood our scale and didn't oversell what we needed.",
  },
  {
    name: "James Otieno",
    role: "Founder & CEO, Rimali Group",
    initials: "JO",
    quote:
      "When you've built a business for ten years, it's hard to see the structural problems clearly. AK Prime gave us the outside view we needed: not just a diagnosis, but a roadmap we could actually execute. Revenue was up 40% within eight months of implementing their recommendations.",
  },
];

const TESTIMONIALS_AR = [
  {
    name: "مدير المحطة",
    role: "إذاعة إم أو راديو 88.2FM",
    initials: "إم",
    quote:
      "كنا نسدد مبالغ ضريبية بالزيادة دون علمنا لسنوات. تدخل فريق إيه كي برايم، وقاموا بتدقيق شامل للسجلات واسترداد المستحقات وسد الفجوات فوراً. لقد بنوا لنا منظومة مالية نعتمد عليها بثقة تامة.",
  },
  {
    name: "العضو المنتدب",
    role: "كوستال إيميج تكنولوجيز المحدودة",
    initials: "سي",
    quote:
      "خمس سنوات من السجلات المحاسبية والمخزنية المتراكمة أعادت إيه كي برايم ترتيبها وتدقيقها وترحيلها لنظام ERP موحد في شهرين فقط. سرعة ودقة التنفيذ فاقت كل توقعاتنا.",
  },
  {
    name: "ديفيد موانجي",
    role: "مدير العمليات، ميريديان للتوزيع",
    initials: "دم",
    quote:
      "توقعنا أن يستغرق تطبيق نظام ERP ستة أشهر مع تعطيل العمل، لكن إيه كي برايم أنجزت المشروع خلال 12 أسبوعاً دون أي انقطاع. ارتفعت دقة المخزون إلى 98% من اليوم الأول للإطلاق.",
  },
  {
    name: "فاطمة حسن",
    role: "رئيسة الموارد البشرية، سافانا كابيتال",
    initials: "فح",
    quote:
      "أعادت إيه كي برايم هيكلة عمليات الموارد البشرية ومسيرات الرواتب وتطبيق نظام HRMS في 8 أسابيع فقط. حققنا امتثالاً عمالياً تاماً بنسبة 100% دون أي مخالفات.",
  },
  {
    name: "جيمس أوتينو",
    role: "المؤسس والرئيس التنفيذي، مجموعة ريمالي",
    initials: "جو",
    quote:
      "منحتنا إيه كي برايم الرؤية الخارجية الموضوعية التي كنا بأمس الحاجة إليها، مع خارطة طريق عملية قابلة للتطبيق. ارتفعت إيراداتنا بنسبة 40% خلال ثمانية أشهر فقط.",
  },
];

export function TestimonialsSection() {
  const { locale, isRTL, t: dict } = useI18n();
  const [i, setI] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const testimonials = locale === "ar" ? TESTIMONIALS_AR : TESTIMONIALS_EN;
  const current = testimonials[i] || testimonials[0];

  useEffect(() => {
    if (!isAutoRotating) return;
    const timer = setInterval(() => {
      handleNavigation((i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [i, isAutoRotating, testimonials.length]);

  const handleNavigation = (newIndex: number) => {
    if (newIndex === i) return;
    setIsTransitioning(true);
    setSlideDirection(newIndex > i ? "right" : "left");
    setTimeout(() => {
      setI(newIndex);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="bg-white section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left header */}
            <Reveal className="lg:col-span-4">
              <Eyebrow>{dict.testimonialsSection.overline}</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance text-[28px] sm:text-[34px] font-medium leading-tight">
                {dict.testimonialsSection.title}
              </h2>
              <p className="mt-3 text-[14px] text-[#3a5a5a] leading-relaxed">
                {dict.testimonialsSection.subtitle}
              </p>
            </Reveal>

            {/* Right quote card */}
            <Reveal delay={120} className="lg:col-span-8">
              <div className="rounded-3xl bg-[#F4FAFA] border border-[#082121]/8 p-8 lg:p-10 overflow-hidden relative">
                <div
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning
                      ? slideDirection === "right"
                        ? "translateX(20px)"
                        : "translateX(-20px)"
                      : "translateX(0)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0E3E3E] flex items-center justify-center shrink-0 ring-2 ring-[#37B4B4]/20">
                      <span className="text-[#37B4B4] text-[15px] font-semibold tracking-wide">
                        {current.initials}
                      </span>
                    </div>
                    <div className="pt-1">
                      <div className="text-[15px] font-semibold text-[#082121] leading-tight">
                        {current.name}
                      </div>
                      <div className="text-[12px] text-[#3a5a5a] mt-0.5 leading-snug">
                        {current.role}
                      </div>
                    </div>
                  </div>

                  <blockquote className="mt-6 text-[17px] lg:text-[20px] text-[#082121] leading-relaxed text-balance">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleNavigation(idx)}
                        aria-label={`Go to testimonial ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === i
                            ? "w-8 bg-[#37B4B4]"
                            : "w-1.5 bg-[#082121]/20 hover:bg-[#082121]/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() =>
                handleNavigation((i - 1 + testimonials.length) % testimonials.length)
              }
              className="w-11 h-11 rounded-full border border-[#082121]/15 hover:border-[#37B4B4] hover:text-[#37B4B4] text-[#3a5a5a] inline-flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} className="rtl-mirror" />
            </button>
            <button
              type="button"
              onClick={() => handleNavigation((i + 1) % testimonials.length)}
              className="w-11 h-11 rounded-full bg-[#37B4B4] text-white hover:bg-[#29E0C8] inline-flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} className="rtl-mirror" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── INSIGHTS ─── */
const ARTICLES = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why most business problems are misdiagnosed",
    excerpt:
      "The cost of getting the diagnosis wrong is too high. Here's how we approach discovery.",
    author: "Mark Wood",
    date: "Apr 3, 2026",
    image: "/images/laptop-workspace.webp",
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The real cost of poor decision-making for business",
    excerpt:
      "How informational gaps cascade into operational failures, and how to fix it.",
    author: "Hanry Mandu",
    date: "Mar 14, 2026",
    image: "/images/hero-workspace-bw.webp",
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When founders should seek external perspective",
    excerpt: "The moments when fresh, external eyes unlock breakthrough clarity.",
    author: "Andy Milan",
    date: "Feb 20, 2026",
    image: "/images/professional-headshot.webp",
  },
];

export function InsightsSection() {
  const { locale, isRTL, t: dict } = useI18n();
  const img0 = useSiteImage(`insight.${ARTICLES[0].slug}.image`);
  const img1 = useSiteImage(`insight.${ARTICLES[1].slug}.image`);
  const img2 = useSiteImage(`insight.${ARTICLES[2].slug}.image`);
  const cms = useCMSContent();

  const articleImages = [
    img0 || ARTICLES[0].image,
    img1 || ARTICLES[1].image,
    img2 || ARTICLES[2].image,
  ];

  const rawArticles = ARTICLES.map((a) => {
    const ov = (cms?.insights?.[a.slug] ?? {}) as {
      title?: string;
      category?: string;
      author?: string;
      date?: string;
    };
    return {
      ...a,
      title: ov.title ?? a.title,
      category: ov.category ?? a.category,
      author: ov.author ?? a.author,
      date: ov.date ?? a.date,
      readTime: "6 min read",
    };
  });

  const articles = rawArticles.map((a) => getLocalizedInsightArticle(a, locale));

  return (
    <section className="bg-[#F4FAFA] section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <Reveal>
              <Eyebrow>{dict.insightsSection.overline}</Eyebrow>
              <h2 className="mt-3 text-[#082121] text-[28px] sm:text-[34px] font-medium">
                {locale === "ar" ? "رؤى وأفكار استراتيجية" : "From our practice"}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <Button
                href={`/${locale}/insights`}
                variant="link"
                size="md"
                icon={ArrowUpRight}
                iconPosition="end"
              >
                {dict.insightsSection.viewAll}
              </Button>
            </Reveal>
          </div>

          {/* Card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link href={`/${locale}/insights/${a.slug}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#082121]/5">
                    <img
                      src={articleImages[i]}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-[#37B4B4] mb-2">
                      {a.category}
                    </span>
                    <h3 className="text-[#082121] text-[15px] font-medium leading-snug group-hover:text-[#37B4B4] transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <div className="mt-3 text-[11px] text-[#3a5a5a]">
                      <time>{a.date}</time>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const FAQ_EN = [
  {
    q: "What type of businesses do you work with?",
    a: "We work with SMEs, growth-stage companies, and established organisations across manufacturing, retail, healthcare, logistics, and professional services. Our clients are typically founders, CFOs, and leadership teams facing strategic, operational, or technology decisions.",
  },
  {
    q: "Do you implement ready-made software like Odoo or HRMS?",
    a: "Yes. We implement and customise proven platforms including Odoo ERP, HRMS solutions, and NetSuite — configured to fit your specific workflows. We also advise on system selection when you're evaluating options, so you adopt the right tool, not just any tool.",
  },
  {
    q: "What makes AK Prime different from other consulting firms?",
    a: "Senior-led delivery with no junior shuffle. We combine strategic advisory with hands-on implementation — whether that's an ERP rollout, a finance transformation, or an AI integration. You get one accountable team from diagnosis to go-live.",
  },
  {
    q: "How does a typical engagement work?",
    a: "We start with a 1–2 week discovery to understand your current state and define scope. From there, engagements typically run 4–16 weeks with clear milestones and deliverables agreed upfront. For product implementations like Odoo, we follow a structured configure-test-train-go-live methodology.",
  },
  {
    q: "When should a business consider hiring a consultant?",
    a: "When a decision carries weight you can't afford to get wrong — system migrations, finance restructures, scaling operations, entering a new market, or replacing a broken ERP. If the cost of delay or a wrong turn is high, that's the right moment.",
  },
  {
    q: "Where do you operate?",
    a: "We are headquartered in Mombasa with offices in Nairobi and Dubai. We serve clients across East Africa and the Middle East, with capacity for remote and hybrid engagements globally.",
  },
];

const FAQ_AR = [
  {
    q: "ما هي أنواع المؤسسات والشركات التي تتعاونون معها؟",
    a: "نعمل مع الشركات المتوسطة والشركات سريعة النمو والمؤسسات الكبرى عبر قطاعات التصنيع، التجزئة، الرعاية الصحية، اللوجستيات، والخدمات المالية. عملاؤنا عادة هم الرؤساء التنفيذيون، والمدراء الماليون، والقيادات الباحثة عن حلول استراتيجية وتقنية حاسمة.",
  },
  {
    q: "هل تطبقون أنظمة وبرمجيات جاهزة مثل Odoo أو حلول HRMS؟",
    a: "نعم بالتأكيد. نطبق ونخصص أفضل المنصات العالمية مثل Odoo ERP وحلول الموارد البشرية الرقمية وNetSuite بما يلائم مسارات عملك بدقة، كما نرشدك لاختيار الأنسب لميزانيتك واحتياجاتك دون تكاليف زائدة.",
  },
  {
    q: "ما الذي يميز إيه كي برايم عن شركات الاستشارات والتقنية الأخرى؟",
    a: "تنفيذ يقوده كبار الخبراء والشركاء مباشرة دون إحالة للكوادر المبتدئة. نجمع بين الاستشارات المالية والاستراتيجية الرفيعة والتطبيق التقني الميداني المباشر، لتحصل على فريق واحد مسؤول من التشخيص حتى الإطلاق وما بعده.",
  },
  {
    q: "كيف تسير مراحل المشروع والتعاقد عادةً؟",
    a: "نبدأ بمرحلة تشخيص واستكشاف تمتد من أسبوع إلى أسبوعين لفهم التحديات وتحديد نطاق العمل بدقة. بعد ذلك تمتد المشاريع عادة من 4 إلى 16 أسبوعاً مع مراحل تسليم واضحة ومخرجات مجدولة سلفاً.",
  },
  {
    q: "متى يتعين على المنشأة الاستعانة بشركة استشارية متخصصة؟",
    a: "عندما يكون للقرار وزن حاسم لا يحتمل الخطأ — كترقية أنظمة ERP، أو إعادة هيكلة المالية، أو التوسع التشغيلي، أو الامتثال الضريبي والتنظيمي المعقد.",
  },
  {
    q: "أين تقع مكاتبكم وأين تقدمون خدماتكم؟",
    a: "يقع مقرنا الرئيسي في مومباسا مع فرع في نيروبي ومكتب اتصال في دبي لخدمة أسواق الخليج العربي، ونقدم خدماتنا في عموم شرق أفريقيا والشرق الأوسط مع إمكانية التنفيذ الحضوري والهجين.",
  },
];

export function FAQSection() {
  const { locale, isRTL } = useI18n();
  const faqList = locale === "ar" ? FAQ_AR : FAQ_EN;

  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left — sticky header */}
            <Reveal className="lg:col-span-5">
              <Eyebrow>{locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}</Eyebrow>
              <h2 className="mt-4 text-white text-balance max-w-[18ch] text-[28px] sm:text-[34px] font-medium">
                {locale === "ar"
                  ? "إجابات واضحة على أكثر التساؤلات شيوعاً."
                  : "Common questions, clear answers."}
              </h2>
              <p className="mt-5 text-[14px] text-white/60 leading-relaxed">
                {locale === "ar" ? "لم تجد ما تبحث عنه؟ " : "Can't find what you're looking for? "}
                <Link
                  href={`/${locale}/contact`}
                  className="text-[#37B4B4] hover:text-[#29E0C8] font-semibold transition-colors inline-flex items-center gap-1"
                >
                  <span>{locale === "ar" ? "تواصل معنا مباشرة" : "Reach out directly"}</span>
                  <ArrowUpRight size={14} className="rtl-mirror shrink-0" />
                </Link>
              </p>
            </Reveal>

            {/* Right — accordion */}
            <Reveal delay={80} className="lg:col-span-7">
              <Accordion className="w-full">
                {faqList.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-white/10"
                  >
                    <AccordionTrigger className="text-left rtl:text-right py-5 text-[14px] md:text-[15px] font-normal text-white hover:no-underline hover:text-[#37B4B4] [&>svg]:hidden group cursor-pointer">
                      <span className="flex-1 ltr:pr-4 rtl:pl-4">{item.q}</span>
                      <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-[#37B4B4] transition-transform duration-200 group-data-[state=open]:rotate-45 shrink-0">
                        <Plus size={13} strokeWidth={2} />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-[13.5px] text-white/60 leading-relaxed pb-5 ltr:pr-10 rtl:pl-10">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ─── */
export function CTABannerSection({ onBooking }: { onBooking?: () => void }) {
  const { locale, isRTL, t: dict } = useI18n();
  const ctaBg = useSiteImage("insights.cta_bg");
  const ctaCard1 = useSiteImage("insights.card_1");
  const ctaCard2 = useSiteImage("insights.card_2");
  const ctaCard3 = useSiteImage("insights.card_3");

  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[#0E3E3E] border border-white/10">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{
                backgroundImage: `url('${ctaBg || "/images/team-collaboration.webp"}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#082121]/90 via-[#082121]/50 to-transparent" />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center px-8 py-14 lg:px-14 lg:py-16">
              {/* Left — text */}
              <Reveal>
                <Eyebrow>{dict.ctaBanner.overline}</Eyebrow>
                <h2 className="mt-4 text-white text-balance max-w-[22ch] text-[28px] sm:text-[34px] font-medium leading-tight">
                  {dict.ctaBanner.title}
                </h2>
                <p className="mt-5 text-[14px] text-white/65 leading-relaxed max-w-lg">
                  {dict.ctaBanner.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={onBooking}
                    variant="primary"
                    size="lg"
                    icon={ArrowUpRight}
                    iconPosition="end"
                  >
                    {dict.ctaBanner.bookConsultation}
                  </Button>
                  <Button
                    href={`/${locale}/contact`}
                    variant="secondary"
                    size="lg"
                  >
                    {dict.ctaBanner.contactUs}
                  </Button>
                </div>
              </Reveal>

              {/* Right — photo collage */}
              <Reveal delay={120}>
                <div className="hidden lg:grid grid-cols-3 gap-3 h-[320px]">
                  <div className="col-span-2 overflow-hidden rounded-xl">
                    <img
                      src={ctaCard1 || "/images/hero-workspace-bw.webp"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-3">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={ctaCard2 || "/images/laptop-workspace.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={ctaCard3 || "/images/professional-headshot.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
