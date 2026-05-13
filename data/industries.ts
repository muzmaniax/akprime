export interface Industry {
  slug: string;
  name: string;
  shortDescription: string;
  heroHeadline: string;
  photo: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  cta: string;
}

export const industriesData: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    shortDescription: "Precision at scale: ERP, supply chain visibility and production analytics.",
    heroHeadline: "Optimise Production Lines & Secure Your Supply Chain.",
    photo: "/images/tech-workspace.jpg",
    challenges: [
      "Siloed demand forecasting leading to inventory stockouts or costly overstock.",
      "Lack of real-time visibility into machine downtime and OEE (Overall Equipment Effectiveness).",
      "Manual production costing models that erode product margins."
    ],
    solutions: [
      "Deploy comprehensive ERP systems (Odoo, SAP) integrating floor operations with back-office finance.",
      "Automate procurement workflows triggered by predictive AI demand modelling.",
      "Implement IoT-ready manufacturing modules for real-time production tracking."
    ],
    outcomes: [
      "25% reduction in carrying costs.",
      "99.9% inventory accuracy across multiple warehouses.",
      "Real-time product lifecycle costing."
    ],
    cta: "Book a Manufacturing Assessment"
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    shortDescription: "Modernise core banking, automate compliance and close audit cycles faster.",
    heroHeadline: "Modernise Core Banking & Fortify Compliance Operations.",
    photo: "/images/success-team.jpg",
    challenges: [
      "Legacy core banking arrays preventing rapid deployment of digital financial products.",
      "Increasingly complex AML/KYC regulatory requirements requiring manual oversight.",
      "Fragmented risk management and auditing reporting cycles."
    ],
    solutions: [
      "Integrate modern API-driven middle layers to safely expose legacy financial data.",
      "Automate regulatory reporting workflows with embedded AML screening AI.",
      "Standardise enterprise risk frameworks and streamline IT audits."
    ],
    outcomes: [
      "40% faster time-to-market for new credit products.",
      "Zero-defect regulatory reporting submissions.",
      "Automated continuous auditing workflows."
    ],
    cta: "Explore Financial IT Frameworks"
  },
  {
    slug: "logistics",
    name: "Logistics",
    shortDescription: "Intelligent routing, fleet telemetry and same-day digital invoicing.",
    heroHeadline: "Intelligent Fleet Management & Vansales Automation.",
    photo: "/images/digital-transformation.jpg",
    challenges: [
      "Inefficient routing causing excess fuel consumption and delayed deliveries.",
      "Paper-based dispatch and proof-of-delivery causing invoice turnaround delays.",
      "Lack of real-time tracking for cold-chain and high-value cargo."
    ],
    solutions: [
      "Implement dynamic route optimisation algorithms linked to live traffic conditions.",
      "Deploy mobile vansales ERPs for immediate digital invoicing and inventory reconciliation.",
      "Integrate unified fleet telemetry dashboards for live performance monitoring."
    ],
    outcomes: [
      "18% reduction in annual fleet fuel expenditure.",
      "Same-day invoice processing and reconciliation.",
      "Total visibility over asset utilization."
    ],
    cta: "Automate Your Fleet"
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortDescription: "Integrated HMIS, zero-defect billing and secure patient data governance.",
    heroHeadline: "Secure Patient Data & Seamless HMIS Deployments.",
    photo: "/images/business-growth.jpg",
    challenges: [
      "Disconnected clinical and billing systems causing revenue leakage and claim rejections.",
      "Data privacy vulnerabilities complying with health data protection acts.",
      "Cumbersome patient onboarding and discharge bottlenecks."
    ],
    solutions: [
      "Deploy integrated Hospital Management Information Systems (HMIS) bridging clinical and financial data.",
      "Implement zero-trust security architectures to protect sensitive patient records.",
      "Automate insurance claim scrubbing and submission workflows."
    ],
    outcomes: [
      "30% reduction in insurance claim denial rates.",
      "100% compliance with local health data regulations.",
      "Vastly improved patient wait times."
    ],
    cta: "Modernise Your Clinic Operations"
  },
  {
    slug: "ngos",
    name: "NGOs & Donors",
    shortDescription: "Real-time M&E, transparent donor reporting and field-ready fund tracking.",
    heroHeadline: "Transparent Impact Reporting & M&E Automation.",
    photo: "/images/innovation-lab.jpg",
    challenges: [
      "Manual, spreadsheet-based donor reporting lacking real-time data integrity.",
      "Difficulty tracking multi-currency fund utilisation across decentralized field offices.",
      "Inconsistent Monitoring & Evaluation (M&E) data collection methodologies."
    ],
    solutions: [
      "Implement cloud-based fund accounting systems optimized for restrict/unrestricted grant tracking.",
      "Deploy mobile-first M&E data collection tools with offline capabilities for field workers.",
      "Build live, transparent dashboard portals for instant donor visibility."
    ],
    outcomes: [
      "Effortless compliance with USAID/FCDO reporting standards.",
      "Real-time budget vs. actual tracking across all programs.",
      "Digitally native impact assessments."
    ],
    cta: "Digitise Your M&E"
  },
  {
    slug: "government",
    name: "Government",
    shortDescription: "GRP deployment, e-government portals and transparent public procurement.",
    heroHeadline: "Digital Governance & Public Finance Management.",
    photo: "/images/professional-discussion.jpg",
    challenges: [
      "Fragmented legacy civil service directories causing payroll leakages.",
      "Inefficient revenue collection systems with high citizen friction.",
      "Opaque public procurement processes prone to compliance failures."
    ],
    solutions: [
      "Deploy centralized Government Resource Planning (GRP) systems for unified HR and payroll.",
      "Build citizen-facing e-government portals for frictionless service delivery and fee collection.",
      "Implement automated, transparent e-procurement workflows."
    ],
    outcomes: [
      "Elimination of ghost workers through biometric integrations.",
      "Boosted public revenue collection rates.",
      "Enhanced transparency and citizen trust."
    ],
    cta: "Transform Public Services"
  },
  {
    slug: "education",
    name: "Education",
    shortDescription: "Integrated SIS, automated fee collection and AI-assisted timetabling.",
    heroHeadline: "Scale Academic Excellence with Automated Administration.",
    photo: "/images/business-analysis.jpg",
    challenges: [
      "Disconnect between student enrollment systems and fee collection ledgers.",
      "Manual alumni tracking and engagement limiting fundraising potential.",
      "Cumbersome semester scheduling and resource allocations."
    ],
    solutions: [
      "Implement modern Student Information Systems (SIS) fully integrated with core finance.",
      "Deploy automated tuition billing, payment gateways, and reconciliation bots.",
      "Utilize AI to optimize classroom utilization and timetabling."
    ],
    outcomes: [
      "Automated fee collection and immediate ledger updates.",
      "Streamlined admissions pipelines.",
      "Data-driven student retention interventions."
    ],
    cta: "Upgrade Your Campus Tech"
  },
  {
    slug: "retail",
    name: "Retail & FMCG",
    shortDescription: "Unified POS, predictive inventory and rapid end-of-day cash reconciliation.",
    heroHeadline: "Omnichannel Point-of-Sale & Predictive Inventory.",
    photo: "/images/team-brainstorm.jpg",
    challenges: [
      "Disconnect between physical POS systems and e-commerce inventory.",
      "Inability to predict seasonal velocity, leading to markdowns on dead stock.",
      "Slow, manual cash reconciliation at the end of retail shifts."
    ],
    solutions: [
      "Deploy unified omnichannel commerce platforms syncing web and physical stores instantly.",
      "Implement AI-driven demand forecasting algorithms for optimized purchasing.",
      "Automate daily physical cash and digital payment reconciliations."
    ],
    outcomes: [
      "Real-time inventory visibility across all branches.",
      "Optimized working capital through precise purchasing.",
      "Rapid end-of-day financial closes."
    ],
    cta: "Modernise Retail Ops"
  }
];
