import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AK Prime Consulting. Headquartered in Nairobi with a branch in Mombasa — delivering ERP, AI, and strategic advisory.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#082121]">
      <ContactSection />
    </div>
  );
}
