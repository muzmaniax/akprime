export function MarqueeTicker() {
  const items = [
    "ERP Implementation",
    "AI Automation",
    "Digital Transformation",
    "Financial Strategy",
    "Enterprise Project Delivery",
    "Business Analysis",
    "Change Management",
    "Audit & Compliance",
    "Interim CFO",
    "Data Analytics",
    "Odoo · SAP B1 · Dynamics 365",
    "Power BI · LangChain · Azure AI",
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="py-4 bg-[#0E3E3E]/60 border-y border-white/6 overflow-hidden">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-2">
            <span className="text-sm font-medium text-white/55 tracking-wide whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4] opacity-60 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
