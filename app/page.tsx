"use client";

import { useState } from "react";
import { BookingModal } from "@/components/ui/BookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { TickerBand, PhotoStrip, ProblemSection } from "@/components/sections/MidSections";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection, IndustriesSection } from "@/components/sections/ProcessAndIndustries";
import { CaseStudiesSection } from "@/components/sections/CaseAndPackages";
import { TestimonialsSection, InsightsSection, CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      {/* 1. Hero — DARK */}
      <HeroSection onBooking={openBooking} />

      {/* 2. Ticker Band */}
      <TickerBand />

      {/* 3. Photo Strip */}
      <PhotoStrip />

      {/* 4. Problem — LIGHT */}
      <ProblemSection onBooking={openBooking} />

      {/* 5. Services Overview — DARK */}
      <ServicesSection />

      {/* 6. Process Steps — TINT */}
      <ProcessSection />

      {/* 7. Industries — LIGHT */}
      <IndustriesSection />

      {/* 8. Case Studies — DARK */}
      <CaseStudiesSection onBooking={openBooking} />


      {/* 10. Testimonials — TINT */}
      <TestimonialsSection />

      {/* 11. Insights — LIGHT */}
      <InsightsSection />

      {/* 12. CTA Banner — DARK */}
      <CTABannerSection onBooking={openBooking} />

      {/* 13. Contact Form — LIGHT */}
      <ContactSection />

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
