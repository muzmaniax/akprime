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
      image: "https://images.unsplash.com/photo-1460886141757-a5bbd8f3a4d8?w=400&h=400&fit=crop&q=80"
    },
    metrics: [
      { value: "KSh 8.5M", label: "Recovered" },
      { value: "100%", label: "Filing Accuracy" },
      { value: "2 Days", label: "Month-End Close" }
    ],
    image: "https://images.unsplash.com/photo-1478737270454-541f48a00152?w=1200&q=80",
    category: "Finance"
  },
  {
    id: "healthlink-clinics-integration",
    title: "Unifying Patient Care Across Multiple Clinics",
    client: "HealthLink Clinics Network",
    industry: "Healthcare",
    location: "Kampala, Uganda",
    sector: "Medical Services",
    solution: "Systems Integration & Digital Infrastructure",
    summary: "Connected 5 independent clinic locations into a unified patient care system, improving coordination and care quality.",
    tagline: "Improved patient care coordination across 5 clinics, reducing diagnosis time by 45%.",
    duration: "6 months",
    date: "Oct 22, 2024",
    narrative: {
      problem: "HealthLink operated 5 clinic locations with fragmented patient records — each location maintained its own paper-based files and separate digital systems. This fragmentation caused patients to repeat tests, doctors to make decisions without full medical history, and administrative staff to spend 20+ hours per week on manual record transfers. Patient satisfaction suffered as care coordination was poor, and the network was losing repeat patients to competitors with better integrated systems.",
      turningPoint: "HealthLink's leadership recognized that growth was impossible without unifying their infrastructure. AK Prime was engaged to design and implement a patient data integration platform that would connect all locations while maintaining HIPAA-compliant privacy controls.",
      approach: [
        {
          title: "Data Audit & Assessment",
          description: "Mapping the current state across all clinic locations.",
          points: [
            "Conducted on-site audits at all 5 clinic locations to understand existing workflows.",
            "Identified 50,000+ patient records requiring digitization and reconciliation.",
            "Documented critical gaps in data quality and system compatibility."
          ]
        },
        {
          title: "Platform Selection & Configuration",
          description: "Implementing a centralized Electronic Health Record (EHR) system.",
          points: [
            "Selected and configured a HIPAA-compliant, cloud-based EHR platform.",
            "Designed data migration workflows to consolidate records safely.",
            "Set up role-based access controls to ensure doctor-patient privacy."
          ]
        },
        {
          title: "Data Migration & Cleansing",
          description: "Systematically transferring and validating patient records.",
          points: [
            "Migrated 50,000+ patient records with 99.2% data integrity validation.",
            "Reconciled duplicate records from patients seen across multiple locations.",
            "Trained clinic staff to verify and validate records during transition."
          ]
        },
        {
          title: "Staff Training & Change Management",
          description: "Enabling clinicians and staff to adopt the new system effectively.",
          points: [
            "Conducted hands-on training sessions for doctors, nurses, and admin staff.",
            "Created digital workflows that reduced paper handling by 90%.",
            "Established a dedicated support team for the first 3 months post-launch."
          ]
        }
      ],
      outcome: "Results: Within 6 months, HealthLink achieved a unified patient platform accessible across all 5 locations. Diagnosis time was reduced by 45% as doctors now had immediate access to complete medical histories. Patient repeat visit rates increased by 38%, and staff administrative time dropped to 2 hours per week. The network is now positioned for expansion to 8 additional locations using the proven infrastructure."
    },
    testimonial: {
      name: "Medical Director",
      role: "HealthLink Clinics Network",
      quote: "Before integration, we were essentially 5 separate clinics sharing a name. Now patients can walk into any location and their full history is there. Clinical outcomes improved, staff stress decreased, and our reputation for coordinated care is bringing new patients daily.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop&q=80"
    },
    metrics: [
      { value: "45%", label: "Faster Diagnosis Time" },
      { value: "38%", label: "Repeat Visit Increase" },
      { value: "50K+", label: "Records Unified" }
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80"
    },
    metrics: [
      { value: "65%", label: "Revenue Growth" },
      { value: "40%", label: "Faster Close" },
      { value: "Zero", label: "Project Overruns" }
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
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
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
    },
    metrics: [
      { value: "KSh12M", label: "Exposure Resolved" },
      { value: "3 Days", label: "Month-End Close" },
      { value: "100%", label: "Audit Readiness" }
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    category: "Finance"
  }
];

export const pageStats = [
  { label: "Engagements", value: "47+" },
  { label: "Countries", value: "12" },
  { label: "Client Revenue Touched", value: "$2.4B" }
];
