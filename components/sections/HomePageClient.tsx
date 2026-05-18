"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BookingModal } from "@/components/ui/BookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/MidSections";
import { ServicesSection } from "@/components/sections/ServicesSection";

// Below-fold sections — dynamically imported so they're excluded from the
// initial JS bundle and only loaded when the browser is idle / user scrolls.
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessAndIndustries").then(m => ({ default: m.ProcessSection })),
  { ssr: true }
);
const IndustriesSection = dynamic(
  () => import("@/components/sections/ProcessAndIndustries").then(m => ({ default: m.IndustriesSection })),
  { ssr: true }
);
const CaseStudiesSection = dynamic(
  () => import("@/components/sections/CaseAndPackages").then(m => ({ default: m.CaseStudiesSection })),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsInsightsCTA").then(m => ({ default: m.TestimonialsSection })),
  { ssr: true }
);
const InsightsSection = dynamic(
  () => import("@/components/sections/TestimonialsInsightsCTA").then(m => ({ default: m.InsightsSection })),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import("@/components/sections/TestimonialsInsightsCTA").then(m => ({ default: m.FAQSection })),
  { ssr: true }
);
const CTABannerSection = dynamic(
  () => import("@/components/sections/TestimonialsInsightsCTA").then(m => ({ default: m.CTABannerSection })),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })),
  { ssr: true }
);

export function HomePageClient() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <HeroSection onBooking={openBooking} />
      <ProblemSection onBooking={openBooking} />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <InsightsSection />
      <FAQSection />
      <CTABannerSection onBooking={openBooking} />
      <ContactSection />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
