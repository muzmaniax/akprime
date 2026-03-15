import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | AK Prime Consulting",
  description: "Read the latest thought leadership on ERP implementation, AI automation, and financial management.",
};

import { InsightsSection } from "@/components/sections/TestimonialsInsightsCTA";

export default function InsightsPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#FFFFFF]">
      <InsightsSection />
    </div>
  );
}
