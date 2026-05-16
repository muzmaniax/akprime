"use client";

import { useState } from "react";
import { BookingModal } from "@/components/ui/BookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/MidSections";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection, IndustriesSection } from "@/components/sections/ProcessAndIndustries";
import { CaseStudiesSection } from "@/components/sections/CaseAndPackages";
import {
  TestimonialsSection,
  InsightsSection,
  FAQSection,
  CTABannerSection,
} from "@/components/sections/TestimonialsInsightsCTA";
import { ContactSection } from "@/components/sections/ContactSection";

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
