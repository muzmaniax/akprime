import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AK Prime Consulting. We are headquartered in Nairobi, Kenya, delivering ERP, AI, and strategic advisory across Africa.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#082121]">
      <ContactSection />
    </div>
  );
}
