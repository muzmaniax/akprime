import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const articles = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    image: "/images/laptop-workspace.jpg",
    category: "Strategy",
    readTime: "7 min read",
    date: "January 2026",
    author: "Mark Wood",
    authorRole: "Senior Strategy Consultant",
    authorInitials: "MW",
    title: "Why Most Business Problems Are Misdiagnosed",
    excerpt: "The cost of getting the diagnosis wrong is too high. Here's how we approach discovery.",
    content: `
      <p>Most business failures don't stem from poor execution. They stem from solving the wrong problem. A company rushes to implement new ERP software when the real issue is unclear business processes. A CFO cuts costs across the board when the problem is actually a revenue concentration risk. A team overhauls their sales methodology when the bottleneck is actually in delivery capacity.</p>

      <h3>The Diagnosis Trap</h3>
      <p>Under pressure to act quickly, leadership teams often accept the first plausible explanation for their challenges. A consultant arrives, observes the system for a few days, and recommends a solution. The problem is that surface-level problems are often symptoms of deeper, systemic issues.</p>

      <h3>The Cost of Getting It Wrong</h3>
      <p>A misdiagnosed problem leads to wasted capital, opportunity cost, and demoralised teams. A company that invests millions in an ERP implementation when the real issue is organizational misalignment won't suddenly operate better — they'll just have an expensive system managing bad processes.</p>

      <h3>Structured Discovery Works</h3>
      <p>At AK Prime, we start every engagement with a rigorous diagnostic phase. We interview stakeholders across the business, map current workflows, identify gaps between intended and actual performance, and build a clear diagnostic report before recommending solutions. This ensures that the problems we solve are the right ones.</p>

      <p>Getting the diagnosis right is the foundation for every successful transformation.</p>
    `,
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    image: "/images/hero-workspace-bw.jpg",
    category: "Operations",
    readTime: "6 min read",
    date: "January 2026",
    author: "Hanry Mandu",
    authorRole: "Operations Lead",
    authorInitials: "HM",
    title: "The Real Cost of Poor Decision-Making for Business",
    excerpt: "How informational gaps cascade into operational failures. And how to fix it.",
    content: `
      <p>Every strategic decision — whether it's entering a new market, scaling operations, or restructuring the organisation — is made on incomplete information. The challenge isn't eliminating uncertainty; it's building sufficient rigour into decision-making so that when things do go wrong, the downside is minimised.</p>

      <h3>The Decision-Making Framework</h3>
      <p>Poor decisions happen when: (1) the right stakeholders aren't in the room; (2) the relevant data isn't synthesized; (3) alternative scenarios aren't tested; or (4) implementation plans lack clarity on ownership and accountability.</p>

      <h3>The Compounding Effect</h3>
      <p>A poor decision made by a CFO in Q1 cascades through operational priorities, capital deployment, and team morale for the entire year. By the time the mistake is recognised, millions in damage have already occurred. The cost isn't just the direct impact of the poor decision — it's the ripple effect across the organization.</p>

      <h3>Building Decision-Making Discipline</h3>
      <p>Strong organisations implement governance frameworks that slow down high-stakes decisions just enough to get the diagnosis right, gather necessary intelligence, and pressure-test assumptions. This doesn't mean analysis paralysis — it means intentional structure.</p>

      <p>At AK Prime, we help organisations design decision-making governance that delivers clarity without bureaucracy.</p>
    `,
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    image: "/images/professional-headshot.jpg",
    category: "Leadership",
    readTime: "5 min read",
    date: "January 2026",
    author: "Andy Milan",
    authorRole: "Advisory Partner",
    authorInitials: "AM",
    title: "When Founders Should Seek External Perspective",
    excerpt: "The moments when fresh, external eyes unlock breakthrough clarity.",
    content: `
      <p>Founders live inside their company. They see problems through the lens of existing constraints, past decisions, and internal politics. This insider perspective is invaluable — but it's also a liability when the business reaches moments of inflection where the old playbook no longer works.</p>

      <h3>The Limits of Internal Perspective</h3>
      <p>A founder knows their business better than anyone. But that same intimacy can create blind spots. Team dynamics that feel "normal" to an insider might signal deeper dysfunction to an external observer. Processes that feel efficient internally might appear as unnecessary friction to someone seeing them for the first time.</p>

      <h3>The Right Moments to Seek External Perspective</h3>
      <p>You should consider external counsel when: you're scaling to a new order of magnitude; you're entering a new market; you're facing a significant operational bottleneck; you're considering major capital deployment; or you're sensing that the team lacks consensus on strategic direction.</p>

      <h3>What External Advisors Bring</h3>
      <p>The best external advisors don't tell you what to do. They hold up a mirror. They ask the questions insiders are too close to ask. They benchmark your operations against peers and industry best practice. They synthesise patterns from dozens of similar companies they've worked with.</p>

      <p>The most successful founders we work with view external advisors not as a sign of weakness, but as a competitive advantage.</p>
    `,
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | AK Prime Consulting" };
  return {
    title: `${article.title} | Insights | AK Prime Consulting`,
    description: article.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="bg-white min-h-screen">

      {/* ── Centered article header ── */}
      <div className="pt-[calc(var(--navbar-h,64px)+48px)] pb-10 px-5">
        <div className="max-w-2xl mx-auto text-center">

          {/* Back */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#3a5a5a] hover:text-[#37B4B4] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Insights
          </Link>

          {/* Meta */}
          <div className="flex items-center justify-center gap-3 text-[12px] text-[#3a5a5a] mb-5">
            <span className="inline-block px-3 py-1 rounded-full bg-[#37B4B4]/10 text-[#37B4B4] font-semibold text-[11px] tracking-widest uppercase">
              {article.category}
            </span>
            <span className="text-[#082121]/20">·</span>
            <time>{article.date}</time>
            <span className="text-[#082121]/20">·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-[#082121] text-balance text-[32px] md:text-[40px] font-medium leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-[16px] text-[#3a5a5a] leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0E3E3E] flex items-center justify-center shrink-0">
              <span className="text-[#37B4B4] text-[11px] font-semibold">{article.authorInitials}</span>
            </div>
            <div className="text-left">
              <div className="text-[13px] font-semibold text-[#082121]">{article.author}</div>
              <div className="text-[12px] text-[#3a5a5a]">{article.authorRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-width hero image ── */}
      <div className="px-5 mb-14">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[21/9] overflow-hidden rounded-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Article body — centered prose ── */}
      <article className="px-5 pb-20">
        <div
          className="max-w-2xl mx-auto text-[#082121]
            prose-like
            [&>p]:text-[16px] [&>p]:text-[#3a5a5a] [&>p]:leading-[1.75] [&>p]:mb-6
            [&>h3]:text-[#082121] [&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:tracking-tight"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* ── Author bio + CTA ── */}
      <div className="px-5 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="border-t border-[#082121]/8 pt-10 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-full bg-[#0E3E3E] flex items-center justify-center shrink-0">
              <span className="text-[#37B4B4] text-[16px] font-semibold">{article.authorInitials}</span>
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-[#082121]">{article.author}</div>
              <div className="text-[13px] text-[#3a5a5a] mt-0.5">{article.authorRole}, AK Prime Consulting</div>
              <p className="mt-3 text-[13px] text-[#3a5a5a] leading-relaxed max-w-lg">
                Our insights are drawn from decades of on-the-ground experience implementing systems and operational strategies across diverse industries in East Africa.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37B4B4] hover:text-[#082121] transition-colors flex-wrap"
              >
                Discuss this topic with our team <ArrowUpRight size={13} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
