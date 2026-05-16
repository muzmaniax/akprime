export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  clientInitials: string;
  logo?: string;
  industry: string;
  location: string;
  sector: string;
  solution: string;
  summary: string;
  tagline: string;
  duration: string;
  date: string;
  narrative: {
    problem: string;
    turningPoint: string;
    approach: {
      title: string;
      description: string;
      points: string[];
    }[];
    outcome: string;
  };
  testimonial: {
    name: string;
    role: string;
    quote: string;
    image: string;
  };
  metrics: { value: string; label: string }[];
  image: string;
  category: "Systems" | "Finance" | "Strategy" | "Impact";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mo-radio-tax-compliance",
    title: "Recovering Hidden Tax Overpayments",
    client: "MO Radio 88.2FM",
    clientInitials: "MR",
    industry: "Broadcasting & Media",
    location: "Nairobi, Kenya",
    sector: "Broadcasting",
    solution: "Financial Governance & Compliance",
    summary: "Uncovered and recovered KSh 3.5M in tax overpayments for a leading media network.",
    tagline: "Saved a broadcasting network KSh 3.5M through strategic tax compliance audit.",
    duration: "3 months",
    date: "Nov 15, 2024",
    narrative: {
      problem: "MO Radio's finance team was managing multiple spreadsheets without a unified system, leading to duplicate tax filings and missed deduction claims. The station was overpaying taxes without realizing it, and had no clear visibility into their tax position. This lack of control exposed them to compliance risks and wasted operational capital that could have been reinvested into programming and infrastructure.",
      turningPoint: "AK Prime was brought in to conduct a comprehensive financial audit and implement governance systems to recover overpayments and prevent future losses.",
      approach: [
        {
          title: "Comprehensive Tax Audit",
          description: "Reconstructing three years of tax filings to identify discrepancies.",
          points: [
            "Reviewed all VAT, income tax, and statutory filings from the past 36 months.",
            "Identified KSh 3.5M in duplicate payments and missed allowable deductions.",
            "Documented evidence for tax authority engagement and recovery claims."
          ]
        },
        {
          title: "Financial System Implementation",
          description: "Building a unified accounting infrastructure.",
          points: [
            "Implemented cloud-based accounting software integrated with bank feeds.",
            "Created automated tax reconciliation dashboards for real-time compliance monitoring.",
            "Established internal controls to prevent future filing errors and overpayments."
          ]
        },
        {
          title: "Compliance & Process Redesign",
          description: "Streamlining tax workflows and documentation.",
          points: [
            "Developed new monthly tax review processes with dual sign-off requirements.",
            "Trained finance staff on the new systems and compliance protocols.",
            "Created templates and checklists for all statutory filings."
          ]
        },
        {
          title: "Tax Authority Engagement",
          description: "Supporting recovery and establishing positive regulatory relationships.",
          points: [
            "Prepared and filed formal tax revision requests with supporting documentation.",
            "Coordinated with KRA to expedite recovery of overpayments.",
            "Established quarterly compliance reviews to maintain filing accuracy."
          ]
        }
      ],
      outcome: "Recovered KSh 3.5M in overpaid taxes within 3 months. The station now has complete visibility into its tax position, achieved 100% filing accuracy, and reduced month-end close time from 8 days to 2 days. The recovered capital was reinvested into new broadcast equipment and content production."
    },
    testimonial: {
      name: "Station Manager",
      role: "MO Radio 88.2FM",
      quote: "We were overpaying taxes without even realizing it. AK Prime stepped in, audited everything, and fixed the gaps immediately. What stood out was how clear they made the whole process. We're now compliant, saving money, and finally have control over our finances.",
      image: "/images/avatar-professional.jpg"
    },
    metrics: [
      { value: "KSh 3.5M", label: "Recovered" },
      { value: "100%", label: "Filing Accuracy" },
      { value: "2 Days", label: "Month-End Close" }
    ],
    image: "/images/business-team.jpg",
    category: "Finance"
  },
  {
    id: "coastal-image-technologies",
    title: "Five Years of Records. Cleaned, Reconciled, and Migrated in Two Months.",
    client: "Coastal Image Technologies Limited",
    clientInitials: "CIT",
    industry: "Technology Services",
    location: "Mombasa, Kenya",
    sector: "Technology",
    solution: "Financial Remediation & Systems Migration",
    summary: "Delivered a full-scope financial clean-up, tax reconciliation, and cloud accounting migration for a technology firm operating on manual records since 2020.",
    tagline: "Transformed five years of manual records into a clean, audit-ready cloud accounting system in just two months.",
    duration: "2 months",
    date: "2020–2024",
    narrative: {
      problem: "Coastal Image Technologies had been operating for five years without a formal accounting system. All financial records were maintained manually, leaving the business with no reliable view of its financial position, unreconciled tax obligations, outstanding debtor and creditor balances, and a growing risk of regulatory exposure. When the client sought to put their house in order, the scope of remediation across five years of transactions was significant.",
      turningPoint: "AK Prime was engaged to perform a full-scope financial clean-up: capturing, classifying, and reconciling every transaction from 2020 to 2024, resolving compliance gaps with KRA, and migrating the business onto a modern cloud accounting platform.",
      approach: [
        {
          title: "Tax Reconciliation",
          description: "Aligning the client's QuickBooks records with KRA iTax to close compliance gaps.",
          points: [
            "Conducted a thorough reconciliation between QuickBooks records and the KRA iTax system.",
            "Identified and resolved all variances to ensure full regulatory compliance.",
            "Closed outstanding tax obligations and prepared the client for clean future filings."
          ]
        },
        {
          title: "Accounts Receivable & Payable Reconciliation",
          description: "Restoring accuracy across all debtor and creditor balances.",
          points: [
            "Reconciled all accounts receivable and payable balances across the five-year period.",
            "Initiated active debtor follow-up to accelerate collections on outstanding invoices.",
            "Resolved discrepancies in opening balances carried forward from prior periods."
          ]
        },
        {
          title: "Bank Reconciliation & Expense Clean-up",
          description: "Eliminating errors and duplicates from the historical transaction record.",
          points: [
            "Performed a full bank reconciliation across all accounts for the engagement period.",
            "Identified and reversed duplicated expense entries that had distorted reported costs.",
            "Produced a clean, verified ledger ready for audit scrutiny."
          ]
        },
        {
          title: "Inventory Reconciliation",
          description: "Grounding inventory records in physical reality.",
          points: [
            "Conducted a hands-on physical stock take to validate recorded inventory levels.",
            "Reconciled physical counts against system records and resolved all variances.",
            "Established a reliable inventory baseline for the incoming accounting system."
          ]
        },
        {
          title: "Systems Migration: QuickBooks to Zoho Books",
          description: "Moving the client to a cloud-first accounting platform with full data integrity.",
          points: [
            "Managed the end-to-end migration of financial data from QuickBooks to Zoho Books.",
            "Ensured data integrity throughout the transition with no loss of historical records.",
            "Configured Zoho Books to match the client's chart of accounts and reporting needs.",
            "Trained the finance team on the new platform ahead of go-live."
          ]
        }
      ],
      outcome: "Results: A clean, compliant, and audit-ready set of books delivered in two months, covering five full years of financial history. The client now has an accurate view of their financial position, resolved tax obligations with KRA, and a modern cloud accounting system in Zoho Books to support future growth."
    },
    testimonial: {
      name: "Managing Director",
      role: "Coastal Image Technologies Limited",
      quote: "Five years of records that had never been properly accounted for. AK Prime came in, made sense of everything, and handed us a clean set of books and a system we can actually use. The turnaround was faster than we thought possible.",
      image: "/images/avatar-professional.jpg"
    },
    metrics: [
      { value: "5 Years", label: "Data Reconciled" },
      { value: "2 Months", label: "Delivery Time" },
      { value: "Audit-Ready", label: "Outcome" }
    ],
    image: "/images/financial-analysis.jpg",
    category: "Finance"
  }
];

export const pageStats = [
  { label: "Engagements", value: "47+" },
  { label: "Countries", value: "12" },
  { label: "Client Revenue Touched", value: "$2.4B" }
];
