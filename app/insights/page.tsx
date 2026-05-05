import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";

export const metadata: Metadata = {
  title: "Insights | AK Prime Consulting",
  description: "Articles on how leaders think, decide, and operate in complex business environments.",
};

const ARTICLES = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why most business problems are misdiagnosed",
    excerpt: "The cost of getting the diagnosis wrong is too high. Here's how we approach discovery.",
    author: "Mark Wood",
    date: "Jan 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
    featured: true,
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The real cost of poor decision-making for business",
    excerpt: "How informational gaps cascade into operational failures — and how to fix it.",
    author: "Hanry Mandu",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When founders should seek external perspective",
    excerpt: "The moments when fresh, external eyes unlock breakthrough clarity.",
    author: "Andy Milan",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  },
];

const featured = ARTICLES.find((a) => a.featured)!;
const rest = ARTICLES.filter((a) => !a.featured);

export default function InsightsPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x max-w-3xl text-center">
          <Reveal><Eyebrow className="justify-center">Insights</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}>
              Thinking for business leaders.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/60 leading-relaxed">
              Articles focused on how leaders think, decide, and operate in complex business environments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured article ── */}
      <section className="bg-white pt-16 pb-0">
        <div className="container-x max-w-5xl">
          <Reveal>
            <Link href={`/insights/${featured.slug}`} className="group block">
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
                      <div className="w-7 h-7 rounded-full bg-[#0E3E3E] flex items-center justify-center">
                        <span className="text-[#37B4B4] text-[9px] font-semibold">
                          {featured.author.split(" ").map(w => w[0]).join("")}
                        </span>
                      </div>
                      <span>{featured.author}</span>
                      <span className="text-[#082121]/25">·</span>
                      <time>{featured.date}</time>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37B4B4] group-hover:gap-2.5 transition-all">
                      Read article <ArrowUpRight size={14} />
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
                <Link href={`/insights/${a.slug}`} className="group block">
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
                      <div className="w-6 h-6 rounded-full bg-[#0E3E3E] flex items-center justify-center shrink-0">
                        <span className="text-[#37B4B4] text-[8px] font-semibold">
                          {a.author.split(" ").map(w => w[0]).join("")}
                        </span>
                      </div>
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
