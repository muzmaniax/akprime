import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | AK Prime Consulting",
  description: "Solutions built for your industry. Discover how we support Manufacturing, Financial Services, Logistics, Healthcare, and NGOs.",
};

import { IndustriesSection } from "@/components/sections/ProcessAndIndustries";

export default function IndustriesPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#FFFFFF]">
      <IndustriesSection />
    </div>
  );
}
