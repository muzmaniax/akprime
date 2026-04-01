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
      role: "CEO, infrastructure group",
      quote: "They transformed our work by streamlining operations, boosting efficiency, and delivering results.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
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
    image: "https://images.unsplash.com/photo-1454165833767-021901996220?w=1200&q=80",
    category: "Finance"
  }
];

export const pageStats = [
  { label: "Engagements", value: "47+" },
  { label: "Countries", value: "12" },
  { label: "Client Revenue Touched", value: "$2.4B" }
];
