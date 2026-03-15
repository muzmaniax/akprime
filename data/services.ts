export type ServiceCategory =
  | "Systems & Technology"
  | "Finance & Compliance"
  | "Strategy & Transformation"
  | "Growth & Impact";

export interface ServiceData {
  id: string;
  slug: string;
  category: ServiceCategory;
  name: string;
  icon: string; // fallback icon name or emoji
  photo: string;
  shortDescription: string;
  heroHeadline: string;
  painPoints: string[];
  solution: string;
  outcomes: string[];
  process: { title: string; desc: string }[];
  tools: string;
  cta: string;
}

export const servicesData: ServiceData[] = [
  // --- SYSTEMS & TECHNOLOGY ---
  {
    id: "erp",
    slug: "erp-implementation",
    category: "Systems & Technology",
    name: "ERP Implementation",
    icon: "database",
    photo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    shortDescription: "We manage the full ERP journey — from vendor selection to go-live training. Unify your operations.",
    heroHeadline: "Stop Wrestling with Data. Unify Your Operations with ERP.",
    painPoints: [
      "Month-end close takes 15+ days due to manual reconciliations.",
      "Inventory is tracked on disparate, error-prone spreadsheets.",
      "Leadership lacks real-time visibility into cashflow and operational metrics.",
    ],
    solution: "We implement modern ERP systems tailored for Pan-African enterprises. By replacing siloed software with a single, unified platform, we automate your core processes and deliver a single source of truth for your entire organisation.",
    outcomes: [
      "40–60% reduction in month-end close time",
      "Real-time finance and operations visibility",
      "90%+ user adoption at 60 days post go-live",
      "Business process reengineering (BPR) included",
    ],
    process: [
      { title: "Discovery & Blueprint", desc: "We map your current processes and define the target operating model before touching any software." },
      { title: "System Configuration", desc: "Agile sprints to build and configure the ERP to match your approved blueprint." },
      { title: "Data Migration & Testing", desc: "Rigorous cleansing of legacy data and comprehensive User Acceptance Testing." },
      { title: "Training & Go-Live", desc: "Role-based training programmes ensuring your team is confident from day one." }
    ],
    tools: "Odoo · SAP Business One · Microsoft Dynamics 365 · Oracle NetSuite",
    cta: "Book an ERP Assessment",
  },
  {
    id: "ai",
    slug: "ai-integration-automation",
    category: "Systems & Technology",
    name: "AI Integration & Automation",
    icon: "cpu",
    photo: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    shortDescription: "Pragmatic AI deployments that automate workflows and predict demand, governed by strict ethics.",
    heroHeadline: "Turn AI from a Buzzword into a Bottom-Line Advantage.",
    painPoints: [
      "High volume of repetitive, manual data entry leading to costly errors.",
      "Inability to accurately forecast demand based on historical and external data.",
      "Uncertainty around AI data privacy, security, and ethical implementation.",
    ],
    solution: "We bypass the hype to deliver pragmatic AI solutions. Starting with a low-risk proof of concept, we deploy machine learning models and intelligent automation that directly reduce operational costs and improve forecasting accuracy.",
    outcomes: [
      "30–60 hours/week saved on manual processing",
      "Predictive forecasting accuracy improvement",
      "Automated workflows across finance and ops",
      "Ethics review and data governance framework included",
    ],
    process: [
      { title: "AI Readiness Assessment", desc: "Evaluating your data quality, infrastructure, and identifying high-ROI use cases." },
      { title: "Proof of Concept (POC)", desc: "Building a targeted, low-risk automated workflow to prove business value quickly." },
      { title: "Integration & Scaling", desc: "Deploying the solution across the enterprise with full API integrations." },
      { title: "Governance & Handoff", desc: "Establishing ethical guidelines, monitoring tools, and training your internal team." }
    ],
    tools: "OpenAI / GPT · Azure AI · LangChain · Power BI",
    cta: "Explore AI Opportunities",
  },
  {
    id: "training",
    slug: "systems-training",
    category: "Systems & Technology",
    name: "Training Services",
    icon: "graduation-cap",
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    shortDescription: "Role-based ERP and systems training that drives real adoption — not just awareness.",
    heroHeadline: "Software Only Works If Your People Know How to Use It.",
    painPoints: [
      "Low adoption rates following heavy investments in new software systems.",
      "Employees reverting to old, manual methods out of frustration.",
      "Lack of standardized operating procedures (SOPs) for onboarding new hires.",
    ],
    solution: "We design and deliver role-based training programmes that drive genuine competence, not just attendance. Through blended learning and comprehensive documentation, we ensure your workforce embraces new technology.",
    outcomes: [
      "Role-based curriculum design",
      "Classroom, e-learning and blended delivery",
      "Standard Operating Procedures (SOP) production",
      "Post-training competency assessment",
    ],
    process: [
      { title: "Needs Analysis", desc: "Assessing current skill levels and defining the required competencies per role." },
      { title: "Curriculum Design", desc: "Developing customized training materials, quick-reference guides, and SOPs." },
      { title: "Delivery Execution", desc: "Conducting dynamic, hands-on training sessions via classroom or digital platforms." },
      { title: "Competency Measurement", desc: "Administering practical assessments to ensure knowledge retention and readiness." }
    ],
    tools: "Moodle · TalentLMS · Zoom · Custom Manuals",
    cta: "Plan Your Training Programme",
  },

  // --- STRATEGY & TRANSFORMATION ---
  {
    id: "pm",
    slug: "project-management",
    category: "Strategy & Transformation",
    name: "Project Management",
    icon: "kanban",
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    shortDescription: "Structured governance from initiation to close. Deliver on time and on budget.",
    heroHeadline: "Deliver Complex Projects Without the Chaos.",
    painPoints: [
      "Projects consistently missing deadlines and exceeding approved budgets.",
      "Scope creep derailing strategic initiatives due to poor change control.",
      "Lack of visibility into project health and resource allocation at the executive level.",
    ],
    solution: "We provide rigorous, end-to-end project management. By establishing a dedicated Project Management Office (PMO) structure, we enforce stage-gate reviews, risk registers, and formal change control to guarantee delivery certainty.",
    outcomes: [
      "PMO setup and ongoing governance support",
      "Risk register and milestone tracking throughout",
      "Formal change control and reporting",
      "Post-project lessons-learned review",
    ],
    process: [
      { title: "Project Initiation", desc: "Defining the project charter, scope baselines, and identifying key stakeholders." },
      { title: "Governance Setup", desc: "Establishing the PMO, communication cadences, and risk management frameworks." },
      { title: "Execution & Monitoring", desc: "Managing daily deliverables, tracking milestones, and resolving blockers." },
      { title: "Closure & Handover", desc: "Formal sign-off, transition to operations, and post-implementation reviews." }
    ],
    tools: "MS Project · Asana · Jira · Primavera · MS Teams",
    cta: "Discuss Your Project",
  },
  {
    id: "ba",
    slug: "business-analysis",
    category: "Strategy & Transformation",
    name: "Business Analysis",
    icon: "file-search",
    photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    shortDescription: "Translating stakeholder needs into clear specifications so developers build the right thing.",
    heroHeadline: "Bridge the Gap Between Business Strategy and IT Delivery.",
    painPoints: [
      "Misalignment between what the business requested and what IT delivered.",
      "Costly rework due to missed requirements discovered late in the project.",
      "Undocumented, tribal-knowledge processes that hinder system design.",
    ],
    solution: "Our Business Analysts act as the critical translator between operations and technology. We conduct deep-dive workshops to capture exact requirements, delivering clear BPMN process maps and functional specifications that guarantee accuracy.",
    outcomes: [
      "Stakeholder workshops and requirements capture",
      "Current state and future state process maps",
      "Functional specs and acceptance criteria",
      "UAT planning and sign-off support",
    ],
    process: [
      { title: "Elicitation Workshops", desc: "Engaging with users across departments to capture pain points and needs." },
      { title: "Process Mapping", desc: "Documenting 'As-Is' and designing optimised 'To-Be' business workflows." },
      { title: "Specification Drafting", desc: "Writing unambiguous functional requirements and user stories." },
      { title: "Validation & UAT", desc: "Ensuring built solutions accurately address the defined business problems." }
    ],
    tools: "BPMN · Bizagi · Lucidchart · Jira · Confluence",
    cta: "Request BA Scoping",
  },
  {
    id: "restructuring",
    slug: "company-restructuring",
    category: "Strategy & Transformation",
    name: "Company Restructuring",
    icon: "network",
    photo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
    shortDescription: "Reorganise for efficiency, tax optimisation, or post-merger integration readiness.",
    heroHeadline: "Realign Your Organisation for Sustainable Growth.",
    painPoints: [
      "Bloated operating structures reducing agility and profit margins.",
      "Complex, historical entity structures creating unnecessary tax burdens.",
      "Cultural and operational friction during post-merger integrations.",
    ],
    solution: "We guide enterprises through complex reorganisations. Whether reacting to financial stress, optimizing for tax efficiency, or integrating a new acquisition, we provide the org design, legal coordination, and change management required for smooth transitions.",
    outcomes: [
      "Org design and operating model redesign",
      "Tax and legal structure optimisation",
      "Post-merger integration roadmap",
      "Change management and stakeholder communication",
    ],
    process: [
      { title: "Strategic Audit", desc: "Analyzing current structures against your strategic goals and market realities." },
      { title: "Future-State Design", desc: "Developing optimized org charts, role definitions, and entity mappings." },
      { title: "Transition Planning", desc: "Creating the step-by-step roadmap for legal, financial, and operational shifts." },
      { title: "Change Management Execution", desc: "Managing communications to maintain morale and productivity throughout." }
    ],
    tools: "HR / Org Design Consultants · Tax Advisors · Corporate Lawyers",
    cta: "Discuss Restructuring Options",
  },
  {
    id: "vc",
    slug: "vc-fundraising-advisory",
    category: "Strategy & Transformation",
    name: "VC & Fundraising Advisory",
    icon: "trending-up",
    photo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    shortDescription: "Get investment-ready. From pitch deck to financial model and investor matching.",
    heroHeadline: "Secure the Capital to Accelerate Your Vision.",
    painPoints: [
      "Struggling to translate complex business models into compelling investor pitches.",
      "Financial models failing to withstand rigorous VC due diligence.",
      "Lack of warm introductions to active investors matching your thesis.",
    ],
    solution: "We prepare high-growth companies to successfully raise capital. By stress-testing your financial models, refining your pitch deck, and managing the data room, we make you unequivocally 'investor-ready'—and leverage our networks for targeted introductions.",
    outcomes: [
      "Investor-ready pitch deck and financial model",
      "Valuation guidance and term sheet review",
      "Investor mapping and warm introductions",
      "Success fee on funds raised",
    ],
    process: [
      { title: "Readiness Diagnostic", desc: "Identifying gaps in your narrative, financials, and unit economics." },
      { title: "Asset Creation", desc: "Building institutional-grade pitch decks, data rooms, and financial forecasts." },
      { title: "Investor Outreach", desc: "Mapping the ecosystem and initiating warm dialogues with targeted funds." },
      { title: "Diligence & Deal Support", desc: "Navigating Q&A, term sheet negotiations, and closing procedures." }
    ],
    tools: "VC Networks · Angel Groups · Pitch Platforms · Legal Counsel",
    cta: "Start Fundraising Prep",
  },

  // --- FINANCE & COMPLIANCE ---
  {
    id: "finance",
    slug: "financial-management",
    category: "Finance & Compliance",
    name: "Financial Management (FP&A)",
    icon: "pie-chart",
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    shortDescription: "Actionable financial planning, rolling forecasts, and live dashboards for decision support.",
    heroHeadline: "Navigate Uncertainty with Precision Financial Planning.",
    painPoints: [
      "Relying on static annual budgets that become obsolete by Q2.",
      "Inability to run quick scenario analyses (e.g., pricing changes, market shocks).",
      "Lack of senior finance leadership to guide strategic commercial decisions.",
    ],
    solution: "We transform finance from a reporting function into a strategic partner. We build robust financial models, implement rolling forecasts, and deploy live KPI dashboards. For growing firms, we provide highly experienced Interim CFO services.",
    outcomes: [
      "Annual budget and rolling forecast models",
      "Cash management policies and controls",
      "Financial performance dashboards (Power BI)",
      "Interim CFO engagement available",
    ],
    process: [
      { title: "Financial Diagnostic", desc: "Reviewing historical performance and current reporting cadences." },
      { title: "Model Architecture", desc: "Building dynamic, multi-scenario financial models tailored to your drivers." },
      { title: "Dashboard Implementation", desc: "Connecting your data sources to powerful visual dashboards for executive review." },
      { title: "Strategic Advisory", desc: "Ongoing monthly reviews to interpret data and guide commercial strategy." }
    ],
    tools: "Power BI · Excel Models · Adaptive Planning Tools",
    cta: "Explore Financial Advisory",
  },
  {
    id: "cashflow",
    slug: "cashflow-optimisation",
    category: "Finance & Compliance",
    name: "Cashflow Optimisation",
    icon: "banknote",
    photo: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&q=80",
    shortDescription: "Improve working capital, extend supplier terms, and build 13-week cash forecasts.",
    heroHeadline: "Unlock Trapped Cash Working within Your Operations.",
    painPoints: [
      "Rapid revenue growth masking dangerously thin actual liquidity.",
      "Chronically late-paying customers stretching Days Sales Outstanding (DSO).",
      "Lack of forward visibility into impending cash shortfalls.",
    ],
    solution: "We implement aggressive but sustainable working capital improvements. By renegotiating supplier terms, tightening collection protocols, and installing rigorous 13-week cash forecasting, we unlock liquidity to fund your continued growth.",
    outcomes: [
      "Cash diagnostic and working capital analysis",
      "DSO and DPO improvement initiatives",
      "13-week rolling cash forecast",
      "Outcome-linked fee options available",
    ],
    process: [
      { title: "Working Capital Audit", desc: "Identifying bottlenecks across Accounts Receivable, Payable, and Inventory." },
      { title: "Process Redesign", desc: "Implementing stricter credit policies and automated collections workflows." },
      { title: "Forecasting Setup", desc: "Deploying a rigorous, rolling 13-week cash visibility framework." },
      { title: "Execution Tracking", desc: "Monitoring cash conversion cycle improvements against established baselines." }
    ],
    tools: "Cash Forecasting Modules · Collections Software · Factoring Partners",
    cta: "Request a Cash Diagnostic",
  },
  {
    id: "audit",
    slug: "audit-assurance",
    category: "Finance & Compliance",
    name: "Audit Services",
    icon: "shield-check",
    photo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    shortDescription: "Independent assurance on financials and internal controls to build stakeholder confidence.",
    heroHeadline: "Protect Value with Rigorous Independent Assurance.",
    painPoints: [
      "Undetected control failures leading to financial leakage or fraud.",
      "Lack of investor or donor confidence due to unaudited financial statements.",
      "Internal teams overwhelmed, lacking the bandwidth for objective auditing.",
    ],
    solution: "We provide comprehensive internal and external audit services. Delivering clear findings and actionable remediation plans, we assure stakeholders that your operations are compliant, secure, and financially sound.",
    outcomes: [
      "Internal, financial and IT audit coverage",
      "Risk assessment and control mapping",
      "Remediation roadmap with clear ownership",
      "Annual internal audit retainer available",
    ],
    process: [
      { title: "Audit Planning", desc: "Scoping the engagement based on inherent risks and stakeholder requirements." },
      { title: "Fieldwork & Testing", desc: "Rigorous evaluation of controls, substantive testing, and evidence gathering." },
      { title: "Reporting", desc: "Delivering a clear, prioritised management letter outlining findings and risks." },
      { title: "Remediation Support", desc: "Assisting teams in closing audit gaps and strengthening control environments." }
    ],
    tools: "CaseWare · ACL / IDEA · Excel · ISO / IIA Frameworks",
    cta: "Schedule an Audit",
  },
  {
    id: "it-audit",
    slug: "it-systems-audit",
    category: "Finance & Compliance",
    name: "System & IT Audits",
    icon: "server-crash",
    photo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    shortDescription: "Identify structural vulnerabilities, fraud risks, and access violations in your ERP.",
    heroHeadline: "Secure Your Digital Core Against Hidden Threats.",
    painPoints: [
      "Segregation of Duties (SOD) conflicts allowing single users to bypass financial controls.",
      "Uncertainty around the recoverability of data in the event of a ransomware attack.",
      "Over-privileged 'super users' retaining access long after their role requires it.",
    ],
    solution: "We conduct deep-dive technical audits of your ERP and infrastructure. By identifying access vulnerabilities, testing disaster recovery protocols, and mapping fraud vectors, we help you harden your vital systems before incidents occur.",
    outcomes: [
      "ERP access rights and SOD violation review",
      "Data integrity and backup / recovery testing",
      "Vulnerability assessment report",
      "Prioritised remediation roadmap",
    ],
    process: [
      { title: "Architecture Review", desc: "Mapping your network, cloud environments, and core ERP components." },
      { title: "Vulnerability Scanning", desc: "Automated and manual testing of access controls and security protocols." },
      { title: "SOD Analysis", desc: "Detailed review of user permissions against established financial conflict matrices." },
      { title: "Harden & Resolve", desc: "Actionable guidance to patch vulnerabilities and secure your infrastructure." }
    ],
    tools: "Nessus · ERP Security Checklists · Network Audit Tools",
    cta: "Request a System Audit",
  },
  {
    id: "bookkeeping",
    slug: "cloud-accounting",
    category: "Finance & Compliance",
    name: "Bookkeeping & Cloud Accounting",
    icon: "calculator",
    photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    shortDescription: "Accurate, timely books that keep you tax-ready and management-informed.",
    heroHeadline: "Flawless Financial Records, Fully Outsourced.",
    painPoints: [
      "Falling months behind on bank reconciliations and VAT filings.",
      "Founders spending valuable time wrestling with accounting software instead of growing the business.",
      "Messy chart of accounts making it impossible to understand true profitability.",
    ],
    solution: "We take the burden of daily accounting off your shoulders. Utilizing modern cloud platforms, our team manages your transactions, payroll, and reconciliations to deliver pristine management accounts on time, every month.",
    outcomes: [
      "Monthly management accounts delivered on time, every month",
      "Bank reconciliation and VAT filing",
      "Payroll processing support",
      "Tiered monthly subscription pricing",
    ],
    process: [
      { title: "System Setup", desc: "Configuring your cloud accounting platform and optimizing the Chart of Accounts." },
      { title: "Data Ingestion", desc: "Connecting bank feeds and establishing automated receipt-capture workflows." },
      { title: "Monthly Processing", desc: "Reconciling transactions, running payroll, and preparing statutory tax filings." },
      { title: "Reporting", desc: "Delivering clear, actionable monthly management packs to leadership." }
    ],
    tools: "QuickBooks · Xero · Sage · Wave",
    cta: "Get a Bookkeeping Quote",
  },
  {
    id: "risk",
    slug: "risk-compliance",
    category: "Finance & Compliance",
    name: "Risk & Compliance Advisory",
    icon: "scale",
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    shortDescription: "Build practical enterprise risk frameworks covering AML, data privacy, and regulations.",
    heroHeadline: "Turn Compliance from a Burden into a Competitive Advantage.",
    painPoints: [
      "Navigating rapidly changing regulatory environments (e.g., Data Protection Acts).",
      "Cumbersome compliance processes that slow down commercial operations.",
      "Lack of a formalized incident response or crisis management protocol.",
    ],
    solution: "We design Risk and Compliance frameworks that protect the firm without stifling agility. From AML/KYC to GDPR alignment, we integrate pragmatic compliance controls directly into your daily operations.",
    outcomes: [
      "Risk register and risk appetite framework",
      "AML and KYC compliance programs",
      "Data privacy (GDPR / Kenya DPA) assessments",
      "Ongoing compliance monitoring and reporting",
    ],
    process: [
      { title: "Regulatory Mapping", desc: "Identifying all statutory and industry obligations relevant to your footprint." },
      { title: "Gap Analysis", desc: "Comparing your current operations against required compliance standards." },
      { title: "Framework Design", desc: "Drafting policies, procedures, and risk appetite statements." },
      { title: "Training & Rollout", desc: "Embedding compliance culture across the organisation through active training." }
    ],
    tools: "ERM Frameworks · AML Tools · ISO 31000 · GDPR / Kenya DPA Guidance",
    cta: "Request a Risk Assessment",
  },
  {
    id: "secretarial",
    slug: "company-secretarial",
    category: "Finance & Compliance",
    name: "Company Secretarial",
    icon: "briefcase",
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    shortDescription: "Keep your corporate compliance, filings, and board governance in perfect order.",
    heroHeadline: "Seamless Corporate Governance and Statutory Compliance.",
    painPoints: [
      "Incurring penalties for missed annual returns or statutory reporting deadlines.",
      "Disorganized share registers complicating fundraising or equity events.",
      "Poorly structured board meetings lacking clear minutes and action tracking.",
    ],
    solution: "We provide professional Company Secretarial services ensuring strict adherence to corporate law. We manage statutory filings, maintain registers, draft resolutions, and prepare comprehensive board packs, enabling flawless governance.",
    outcomes: [
      "Annual returns and statutory filings",
      "Board pack preparation and minute-taking",
      "Share register and transfer management",
      "Corporate governance advisory",
    ],
    process: [
      { title: "Compliance Audit", desc: "Reviewing company records to ensure historical filings are intact and accurate." },
      { title: "Statutory Management", desc: "Filing annual returns, director changes, and maintaining the share register." },
      { title: "Board Support", desc: "Drafting agendas, compiling board packs, and recording formal minutes." },
      { title: "Advisory", desc: "Providing ongoing guidance on directorship duties and corporate governance." }
    ],
    tools: "Local Registrars · e-Filing Portals · Legal Counsel",
    cta: "Set Up Secretarial Support",
  },

  // --- GROWTH & IMPACT ---
  {
    id: "marketing",
    slug: "digital-marketing",
    category: "Growth & Impact",
    name: "Digital Marketing",
    icon: "megaphone",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    shortDescription: "Brand identity, SEO, and paid performance campaigns managed by one cohesive team.",
    heroHeadline: "Drive Demand with Cohesive Digital Marketing.",
    painPoints: [
      "Inconsistent branding confusing market positioning and eroding trust.",
      "Low volume of qualified inbound leads forcing reliance on outbound sales.",
      "Wasted ad spend due to poorly targeted, un-optimised digital campaigns.",
    ],
    solution: "We act as your outsourced growth engine. By aligning high-end brand design with rigorous performance marketing (SEO, PPC, Social), we generate measurable, sustainable pipeline for your sales teams.",
    outcomes: [
      "Brand identity: logo, colour system, typography",
      "Website design and development",
      "SEO, SEM and paid social campaigns",
      "Monthly retainer with analytics reporting",
    ],
    process: [
      { title: "Brand & Strategy", desc: "Defining your identity, target personas, and core messaging." },
      { title: "Asset Build", desc: "Developing websites, collateral, and ad creatives optimized for conversion." },
      { title: "Campaign Launch", desc: "Deploying targeted activity across Google, Meta, LinkedIn, and organic search." },
      { title: "Optimise & Scale", desc: "A/B testing ad copy, analyzing conversion rates, and scaling profitable channels." }
    ],
    tools: "Google Ads · Meta Ads · HubSpot · Mailchimp · GA4",
    cta: "Discuss Your Digital Growth",
  },
  {
    id: "me",
    slug: "monitoring-evaluation",
    category: "Growth & Impact",
    name: "M&E / Impact Assessment",
    icon: "target",
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    shortDescription: "Design M&E frameworks that prove impact and satisfy stringent donor requirements.",
    heroHeadline: "Measure and Prove the Real Impact of Your Interventions.",
    painPoints: [
      "Struggling to articulate program impact to demanding international donors.",
      "Data collection relying on fragmented, paper-based surveys leading to lag times.",
      "Lack of a clear 'Theory of Change' linking activities to long-term outcomes.",
    ],
    solution: "We design robust Monitoring and Evaluation systems for NGOs, CSR wings, and development agencies. Leveraging digital data collection tools, we provide the empirical evidence required to secure funding and guide strategic decisions.",
    outcomes: [
      "Theory of change and logical frameworks",
      "Indicator selection and baseline surveys",
      "Midline and endline evaluations",
      "Donor-ready impact dashboards",
    ],
    process: [
      { title: "Framework Design", desc: "Constructing the Theory of Change, LogFrame, and identifying key indicators." },
      { title: "Data architecture", desc: "Setting up digital mobile data collection tools like KOBO or ODK." },
      { title: "Field Execution", desc: "Deploying enumerators for rigorous baseline, midline, and endline surveys." },
      { title: "Reporting & Visualization", desc: "Translating raw data into compelling donor reports and live dashboards." }
    ],
    tools: "LogFrame · KOBO · Power BI · Excel Dashboards",
    cta: "Discuss M&E Design",
  },
];
