import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { getContentCMS } from "@/lib/content-cms";
import { getSiteImage } from "@/lib/site-images";
import { Locale } from "@/lib/i18n/types";
import { getLocalizedInsightArticle } from "@/lib/i18n/localized-data";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "الرؤى والتحليلات الاستراتيجية | AK Prime Consulting"
      : "Insights | ERP & Strategy Articles | AK Prime Consulting",
    description: isAr
      ? "مقالات متخصصة في تطبيق أنظمة تخطيط الموارد ERP والتحول الرقمي واستراتيجيات الإدارة المالية وكيف يقود التنفيذيون شركاتهم بنجاح."
      : "AK Prime Consulting insights: articles on ERP implementation, digital transformation, finance strategy, and how leaders operate in complex business environments.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/insights`,
      languages: {
        en: "https://akprime.co.ke/en/insights",
        ar: "https://akprime.co.ke/ar/insights",
        "x-default": "https://akprime.co.ke/en/insights",
      },
    },
  };
}

const ARTICLES = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why most business problems are misdiagnosed",
    excerpt: "The cost of getting the diagnosis wrong is too high. Here's how we approach discovery.",
    author: "Mark Wood",
    date: "Apr 3, 2026",
    readTime: "7 min read",
    image: "/images/laptop-workspace.webp",
    featured: true,
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The real cost of poor decision-making for business",
    excerpt: "How informational gaps cascade into operational failures, and how to fix it.",
    author: "Hanry Mandu",
    date: "Mar 14, 2026",
    readTime: "6 min read",
    image: "/images/hero-workspace-bw.webp",
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When founders should seek external perspective",
    excerpt: "The moments when fresh, external eyes unlock breakthrough clarity.",
    author: "Andy Milan",
    date: "Feb 20, 2026",
    readTime: "5 min read",
    image: "/images/professional-headshot.webp",
  },
];

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const cms = getContentCMS();

  // Merge CMS overrides (content + images) into ARTICLES and apply localization
  const articles = ARTICLES.map((a) => {
    const overrides = cms.insights[a.slug] ?? {};
    const cmsImage = getSiteImage(`insight.${a.slug}.image`);
    const base = {
      ...a,
      image: cmsImage || a.image,
      title: overrides.title ?? a.title,
      excerpt: overrides.excerpt ?? a.excerpt,
      category: overrides.category ?? a.category,
      author: overrides.author ?? a.author,
      date: overrides.date ?? a.date,
    };
    return getLocalizedInsightArticle(base, locale);
  });

  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x max-w-3xl text-center">
          <Reveal><Eyebrow className="justify-center">{isAr ? "الرؤى والتحليلات الفكرية" : "Insights"}</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.15 }}>
              {isAr ? "رؤى استراتيجية لقادة الأعمال والشركات." : "Thinking for business leaders."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/60 leading-relaxed">
              {isAr
                ? "مقالات متعمقة تبحث في كيفية تفكير القادة واتخاذ القرارات وإدارة العمليات المعقدة في بيئات الأعمال الإقليمية والدولية."
                : "Articles focused on how leaders think, decide, and operate in complex business environments."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured article ── */}
      <section className="bg-white pt-16 pb-0">
        <div className="container-x max-w-5xl">
          <Reveal>
            <Link href={`/${locale}/insights/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Image */}
                <div className="overflow-hidden rounded-2xl aspect-[16/10]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#37B4B4]">
                      {featured.category}
                    </span>
                    <span className="text-[#082121]/20">·</span>
                    <span className="text-[12px] text-[#3a5a5a]">{featured.readTime}</span>
                  </div>
                  <h2 className="text-[#082121] text-balance group-hover:text-[#37B4B4] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[15px] text-[#3a5a5a] leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px] text-[#3a5a5a]">
                      <span>{featured.author}</span>
                      <span className="text-[#082121]/25">·</span>
                      <time>{featured.date}</time>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37B4B4] group-hover:gap-2.5 transition-all flex-wrap">
                      {isAr ? "قراءة المقال" : "Read article"} <ArrowUpRight size={14} className="shrink-0 rtl-mirror" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container-x max-w-5xl py-12">
        <div className="border-t border-[#082121]/8" />
      </div>

      {/* ── Article grid ── */}
      <section className="bg-white pb-20">
        <div className="container-x max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-8">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link href={`/${locale}/insights/${a.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#F4FAFA]">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-[#37B4B4]">
                        {a.category}
                      </span>
                      <span className="text-[#082121]/20">·</span>
                      <span className="text-[12px] text-[#3a5a5a]">{a.readTime}</span>
                    </div>
                    <h3 className="text-[#082121] text-[18px] font-medium leading-snug group-hover:text-[#37B4B4] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-[#3a5a5a] leading-relaxed line-clamp-2">
                      {a.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[12px] text-[#3a5a5a]">
                      <span>{a.author}</span>
                      <span className="text-[#082121]/25">·</span>
                      <time>{a.date}</time>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection />
    </div>
  );
}
