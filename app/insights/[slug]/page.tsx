import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const articles = [
  {
    slug: "ai-finance-east-africa",
    photo: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    tag: "AI",
    readTime: "6 min read",
    date: "March 2026",
    title: "How AI Is Transforming Finance Operations in Africa & Middle East",
    excerpt: "From automated reconciliation to predictive cash forecasting.",
    content: `
      <p>Artificial Intelligence is no longer just a buzzword in boardrooms; it's rapidly becoming the foundational layer for high-performing finance operations. CFOs are moving beyond traditional ERP implementations and exploring how autonomous systems can drastically reduce month-end close times and improve cash forecasting accuracy.</p>
      
      <h3>The Shift from Rearview to Predictive</h3>
      <p>Historically, finance teams spent the majority of their time looking backward—reconciling bank transactions, verifying invoices, and running historical reports. AI-driven financial platforms handle these transactional tasks with near-zero error rates. For example, machine learning models can now reconcile complex, high-volume transactions across multiple currencies and payment gateways (like M-Pesa and traditional banking systems) in seconds.</p>

      <h3>Real-world Impact on Cashflow</h3>
      <p>One of the most immediate benefits of AI in finance is predictive cashflow modeling. Standard rolling forecasts rely on historical averages and human intuition. AI models, however, incorporate hundreds of variables—including seasonal demand shifts, supplier payment histories, and macroeconomic indicators—to generate highly accurate 13-week cash forecasts. This gives leadership the visibility to negotiate better terms with suppliers or confidently deploy excess capital for growth.</p>

      <h3>Getting Started: The Proof of Concept (POC) Approach</h3>
      <p>The most successful AI integrations don't attempt to rip and replace existing enterprise software. Instead, they start with a targeted Proof of Concept. Identify one highly manual, rules-based process (e.g., Accounts Payable data extraction) and deploy an AI solution alongside your current ERP. This builds team confidence, proves ROI quickly, and establishes a framework for broader automation.</p>

      <p>At AK Prime Consulting, we help organisations design pragmatic AI roadmaps that deliver measurable financial impact without exposing the business to unnecessary technological risk.</p>
    `,
  },
  {
    slug: "erp-implementation-mistakes",
    photo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    tag: "ERP",
    readTime: "8 min read",
    date: "February 2026",
    title: "ERP Implementation: The 5 Mistakes Most Companies Make",
    excerpt: "Data migration failures. Scope creep. Low adoption. Here's what to avoid.",
    content: `
      <p>Implementing an Enterprise Resource Planning (ERP) system is one of the most significant investments a company will make. Yet, industry studies consistently show that over 60% of ERP projects fail to deliver their expected ROI, run over budget, or miss deadlines entirely. Why does this happen, and how can your organisation avoid these traps?</p>

      <h3>1. Underestimating Data Migration</h3>
      <p>Many companies assume that migrating data from legacy systems across to the new ERP is a simple export/import exercise. In reality, legacy data is often messy, duplicated, and structured differently. Failing to clean, map, and rigorously test data migration early in the project is the leading cause of go-live delays.</p>

      <h3>2. Treating ERP as an "IT Project"</h3>
      <p>An ERP implementation is a business transformation project, not just a software installation. If the project is entirely led by the IT department without deep, continuous involvement from operational leaders, the resulting system will technically work but fail to address the actual needs of the business, leading to low adoption rates.</p>

      <h3>3. Failing to Reengineer Processes First</h3>
      <p>A common mistake is customising the new ERP to fit old, inefficient processes simply because "that's how we've always done it." An ERP implementation is the perfect catalyst for Business Process Reengineering (BPR). Adopt standard best-practice workflows built into modern systems instead of paying for expensive customisations that mimic outdated methods.</p>

      <h3>4. Inadequate Change Management & Training</h3>
      <p>If your team doesn't know how—or doesn't want—to use the new system, the project will fail. Training is often relegated to a hurried few days right before go-live. Effective change management starts on day one, involving continuous communication, role-based training programs, and comprehensive User Acceptance Testing (UAT).</p>

      <h3>5. Poor Executive Sponsorship</h3>
      <p>Without visible, sustained support from the C-suite, an ERP project will struggle to overcome inevitable internal resistance. Executive sponsors must actively champion the project, unblock resources, and enforce standardisation decisions across departments.</p>

      <p>Partnering with experienced implementation consultants like AK Prime ensures that these risks are mitigated through rigorous project governance, structured change management, and a relentless focus on delivering business value.</p>
    `
  },
  {
    slug: "cashflow-optimisation",
    photo: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&q=80",
    tag: "Finance",
    readTime: "5 min read",
    date: "January 2026",
    title: "Cashflow Optimisation Strategies for Fast-Growing Businesses",
    excerpt: "Three working capital levers that unlock 30–60 days of cash.",
    content: `
      <p>Growth consumes cash. For expanding businesses, rapidly scaling operations often masks underlying liquidity challenges. Revenue might be doubling year-on-year, but if cash conversion cycles are widening, the organisation risks running out of working capital just as it needs it most. Here are three strategies to optimise your cashflow and fund sustainable growth.</p>

      <h3>1. Accelerate Accounts Receivable (AR)</h3>
      <p>The simplest way to improve cashflow is to collect money you are already owed faster. Start by segmenting your customer base and enforcing stricter credit policies for chronic late payers. Implement automated invoicing directly from your ERP System to ensure invoices are dispatched the moment a service is delivered. Consider offering early payment discounts (e.g., 2/10 Net 30) for large enterprise clients to incentivise rapid settlement.</p>

      <h3>2. Strategically Extend Accounts Payable (AP)</h3>
      <p>While you want to collect cash quickly, you should hold onto it as long as responsibly possible. Renegotiate terms with key suppliers to extend Days Payable Outstanding (DPO). If you are currently on 30-day terms, push for 45 or 60 days in exchange for larger volume commitments or longer contract durations. The goal is to balance maintaining strong supplier relationships while maximizing your working capital float.</p>

      <h3>3. Implement Rigorous 13-Week Cash Forecasting</h3>
      <p>A static annual budget is insufficient for managing liquidity in a fast-paced environment. Implement a rolling 13-week cashflow forecast. This granular, week-by-week view of expected inflows and outflows provides early warning signals for potential shortfalls, allowing the executive team to secure financing or delay discretionary capital expenditure before a crisis hits.</p>

      <p>At AK Prime Consulting, we conduct comprehensive working capital diagnostics, helping organisations identify trapped cash and implement the operational controls necessary to maintain strong liquidity during periods of hyper-growth.</p>
    `
  }
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);
  
  if (!article) {
    return { title: "Article Not Found | AK Prime Consulting" };
  }

  return {
    title: `${article.title} | Insights`,
    description: article.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-[70px]">
      {/* Article Hero */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-[#0E3E3E] text-white">
        <div className="absolute inset-0 bg-[#082121]/50 mix-blend-multiply pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/insights" className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />
            Back to Insights
          </Link>
          <div className="flex gap-3 text-xs md:text-sm font-medium mb-6 text-white/70">
            <span className="px-3 py-1 rounded-full bg-[#37B4B4]/20 text-[#37B4B4] uppercase tracking-wider">{article.tag}</span>
            <span className="flex items-center">{article.date}</span>
            <span className="flex items-center">{article.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-white/70 leading-relaxed font-light">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-24 relative z-20 mb-16">
        <img 
          src={article.photo} 
          alt={article.title} 
          className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-white"
        />
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-[#082121]">
        <div 
          className="text-lg md:text-xl [&>h3]:font-bold [&>h3]:text-[#082121] [&>h3]:text-2xl [&>h3]:mt-10 [&>h3]:mb-4 [&>p]:text-[#3a5a5a] [&>p]:leading-relaxed [&>p]:mb-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Author Bio / CTA */}
        <div className="mt-16 p-8 bg-[#F4FAFA] rounded-2xl border border-[#37B4B4]/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#37B4B4] flex items-center justify-center shrink-0">
             <span className="text-[#082121] font-bold text-xl">AK</span>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2 text-[#082121]">Written by AK Prime Leadership</h4>
            <p className="text-[#3a5a5a] text-sm mb-4 leading-relaxed">Our insights are drawn from decades of on-the-ground experience implementing technical systems and operational strategies across diverse industries.</p>
            <Link href="/contact" className="text-[#37B4B4] font-semibold hover:underline text-sm border-b border-[#37B4B4]/30 pb-0.5">
              Discuss this topic with an expert →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
