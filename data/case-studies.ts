export interface CaseStudy {
  id: string;
  title: string;
  client: string;
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
    industry: "Broadcasting & Media",
    location: "Nairobi, Kenya",
    sector: "Broadcasting",
    solution: "Financial Governance & Compliance",
    summary: "Uncovered and recovered KSh 8.5M in tax overpayments for a leading media network.",
    tagline: "Saved a broadcasting network KSh 8.5M through strategic tax compliance audit.",
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
            "Identified KSh 8.5M in duplicate payments and missed allowable deductions.",
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
      outcome: "Results: Recovered KSh 8.5M in overpaid taxes within 3 months. The station now has complete visibility into its tax position, achieved 100% filing accuracy, and reduced month-end close time from 8 days to 2 days. The recovered capital was reinvested into new broadcast equipment and content production."
    },
    testimonial: {
      name: "Station Manager",
      role: "MO Radio 88.2FM",
      quote: "We were overpaying taxes without even realizing it. AK Prime stepped in, audited everything, and fixed the gaps immediately. What stood out was how clear they made the whole process. We're now compliant, saving money, and finally have control over our finances.",
      image: "/images/avatar-professional.jpg"
    },
    metrics: [
      { value: "KSh 8.5M", label: "Recovered" },
      { value: "100%", label: "Filing Accuracy" },
      { value: "2 Days", label: "Month-End Close" }
    ],
    image: "/images/business-team.jpg",
    category: "Finance"
  },
  {
    id: "step-fintech-infrastructure",
    title: "Building Enterprise Infrastructure for Fintech Growth",
    client: "Step Innovations Africa",
    industry: "Financial Technology",
    location: "Nairobi, Kenya",
    sector: "Fintech",
    solution: "Technology Infrastructure & Scaling",
    summary: "Architected cloud-native infrastructure and backend systems to support 10x user growth while maintaining 99.99% uptime and PCI compliance.",
    tagline: "Enabled Step to scale from 500K to 5M active users with zero downtime migration and enterprise-grade resilience.",
    duration: "8 months",
    date: "Sep 08, 2024",
    narrative: {
      problem: "Step's rapid user growth exposed critical infrastructure limitations. Their monolithic architecture couldn't handle peak transaction volumes (100K+ transactions/day), leading to service degradations during high-activity periods. Database bottlenecks caused payment processing delays, compliance teams spent weeks on manual audit preparation, and the technology stack couldn't support new product lines without major rewrites. Each scaling effort required weeks of planning and risked service disruptions affecting millions of users.",
      turningPoint: "Step's leadership needed enterprise-grade infrastructure to support their expansion roadmap. AK Prime was brought in to architect a cloud-native, microservices-based infrastructure that could scale elastically, maintain regulatory compliance, and reduce time-to-market for new financial products.",
      approach: [
        {
          title: "Infrastructure Assessment & Design",
          description: "Evaluating current systems and designing scalable architecture.",
          points: [
            "Audited existing monolithic application for bottlenecks and technical debt.",
            "Designed event-driven microservices architecture with Kubernetes orchestration.",
            "Planned zero-downtime migration strategy to minimize customer impact."
          ]
        },
        {
          title: "Cloud Migration & Automation",
          description: "Moving to cloud-native infrastructure with CI/CD pipelines.",
          points: [
            "Migrated core services to AWS with multi-region redundancy and auto-scaling.",
            "Implemented infrastructure-as-code (Terraform) for reproducible deployments.",
            "Built comprehensive monitoring and alerting with sub-minute incident detection."
          ]
        },
        {
          title: "Database Optimization & Scaling",
          description: "Restructuring data layer for performance and compliance.",
          points: [
            "Sharded transaction database to handle 10x volume increase.",
            "Implemented real-time data warehousing for compliance reporting.",
            "Created automated backup and disaster recovery systems with RPO < 1 minute."
          ]
        },
        {
          title: "Compliance & Security Hardening",
          description: "Ensuring PCI-DSS and regulatory requirements at scale.",
          points: [
            "Implemented end-to-end encryption for all sensitive data in transit and at rest.",
            "Automated compliance auditing and regulatory reporting.",
            "Established secrets management and role-based access control across infrastructure."
          ]
        }
      ],
      outcome: "Results: Step scaled from 500K to 5M active users in 6 months with zero critical downtime. Transaction processing latency dropped from 3 seconds to 150ms, enabling new real-time features. Compliance audit time reduced from 6 weeks to 1 day through automated reporting. Infrastructure costs decreased 35% despite 10x capacity increase through efficient resource utilization. Step is now acquiring competitors and entering new markets with confidence in their technology foundation."
    },
    testimonial: {
      name: "VP, Engineering",
      role: "Step Innovations Africa",
      quote: "The infrastructure redesign was transformational. Before, growth meant weeks of engineering effort and downtime risk. Now we auto-scale seamlessly. Our team went from firefighting infrastructure issues to building innovative products. The compliance automation alone has freed up our entire audit team.",
      image: "/images/hero-workspace-bw.jpg"
    },
    metrics: [
      { value: "10x", label: "User Growth" },
      { value: "150ms", label: "Processing Latency" },
      { value: "99.99%", label: "Uptime" }
    ],
    image: "/images/startup-meeting.jpg",
    category: "Systems"
  },
  {
    id: "manufacturing-erp",
    title: "Struggle with Project Management & Communication",
    client: "Construction Company",
    industry: "Construction",
    location: "Nairobi, Kenya",
    sector: "Infrastructure",
    solution: "Digital Transformation",
    summary: "Bringing clarity through a digital roadmap for a growing construction firm.",
    tagline: "Helped a construction firm grow revenue 65% in 12 months.",
    duration: "5 months",
    date: "Jan 12, 2024",
    narrative: {
      problem: "The client, a mid-sized construction company, struggled with inefficiencies in project management. Delays, miscommunication between field and office teams, and lack of real-time visibility into project progress were costing time and profitability. Manual reporting and disconnected tools created bottlenecks, making it difficult to scale operations or take on larger, more complex projects.",
      turningPoint: "AK Prime was brought in to overhaul the legacy manual systems and implement a unified digital backbone that connected on-site operations with head-office finance.",
      approach: [
        {
          title: "Digital Audit & Needs Assessment",
          description: "We started by mapping every current-state process to build a 'blueprint for good'.",
          points: [
            "Conducted a full review of existing processes, tools, and workflows.",
            "Identified critical gaps in project tracking, communication, and data management."
          ]
        },
        {
          title: "Technology Integration",
          description: "Implementing localized software tailored for construction logistics.",
          points: [
            "Implemented project management software tailored for construction.",
            "Deployed cloud collaboration tools to connect office staff and on-site teams.",
            "Introduced real-time dashboards for monitoring progress, costs, and risks."
          ]
        },
        {
          title: "Process Optimization & Training",
          description: "Ensuring adoption through hands-on workshops and protocols.",
          points: [
            "Streamlined reporting processes to reduce paperwork and redundancy.",
            "Trained staff and project managers on digital platforms to ensure adoption.",
            "Established new communication protocols supported by digital tools."
          ]
        },
        {
          title: "Change Management",
          description: "Aligning digital adoption with cultural change.",
          points: [
            "Worked with leadership to align digital adoption with cultural change.",
            "Set up ongoing support and feedback loops to continuously improve workflows."
          ]
        }
      ],
      outcome: "Results: Within 6 months, the firm achieved a 65% revenue increase due to better resource allocation and zero project overruns. Communication delays were eliminated, leading to a 40% faster month-end close."
    },
    testimonial: {
      name: "Marlo Fentris",
      role: "CEO, Infrastructure Group",
      quote: "They transformed our work by streamlining operations, boosting efficiency, and delivering results that we could measure immediately.",
      image: "/images/avatar-user.jpg"
    },
    metrics: [
      { value: "65%", label: "Revenue Growth" },
      { value: "40%", label: "Faster Close" },
      { value: "Zero", label: "Project Overruns" }
    ],
    image: "/images/strategy-planning.jpg",
    category: "Strategy"
  },
  {
    id: "finance-optimization",
    title: "Financial Governance & Compliance",
    client: "FMCG Manufacturer",
    industry: "Manufacturing",
    location: "Kampala, Uganda",
    sector: "Consumer Goods",
    solution: "Financial Advisory",
    summary: "Rebuilding financial integrity for a leading manufacturer.",
    tagline: "Reduced tax exposure by KSh 12M through automated compliance and governance.",
    duration: "4 months",
    date: "Feb 28, 2024",
    narrative: {
      problem: "The manufacturer's finance team was managing parallel manual spreadsheets, leading to a 15% error rate in VAT filings and an imminent KRA compliance risk. Manual reconciliations took 10 days each month, preventing real-time cash flow management.",
      turningPoint: "AK Prime was hired to implement automated financial governance and prepare the team for a rigorous regulatory audit.",
      approach: [
        {
          title: "Audit Preparation & Remediation",
          description: "Cleaning up legacy reconciliation errors.",
          points: [
            "Identified KSh 12M in potential tax overpayments and missed credits.",
            "Reconstructed three years of historical financial records."
          ]
        },
        {
          title: "Compliance Automation",
          description: "Deploying automated tax and filing engines.",
          points: [
            "Implemented localized eTIMS integration for real-time reporting.",
            "Created automated VAT and WHT reconciliation dashboards."
          ]
        }
      ],
      outcome: "Results: Mitigated KSh 12M in tax exposure and achieved 100% audit readiness. Month-end close was reduced to 3 days, providing the Board with instant visibility into working capital."
    },
    testimonial: {
      name: "Sarah Kimani",
      role: "CFO, Manufacturing Co.",
      quote: "The team's deep understanding of local compliance and global best practices saved us millions.",
      image: "/images/avatar-consultant.jpg"
    },
    metrics: [
      { value: "KSh12M", label: "Exposure Resolved" },
      { value: "3 Days", label: "Month-End Close" },
      { value: "100%", label: "Audit Readiness" }
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
