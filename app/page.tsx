"use client";

import { useState } from "react";
import { BookingModal } from "@/components/ui/BookingModal";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedLogosCarousel } from "@/components/sections/TrustedLogosCarousel";
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

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      {/* DARK   — Hero */}
      <HeroSection onBooking={openBooking} />
      {/* DARK   — Trusted logos */}
      <TrustedLogosCarousel />
      {/* LIGHT  — About + stats */}
      <ProblemSection onBooking={openBooking} />
      {/* LIGHT  — Services practice areas (photo cards) */}
      <ServicesSection />
      {/* LIGHT (tint) — 5-phase framework */}
      <ProcessSection />
      {/* DARK   — Industries (photo cards) */}
      <IndustriesSection />
      {/* DARK   — Featured case study */}
      <CaseStudiesSection />
      {/* LIGHT  — Testimonials */}
      <TestimonialsSection />
      {/* LIGHT (tint) — Insights */}
      <InsightsSection />
      {/* DARK   — FAQ */}
      <FAQSection />
      {/* DARK   — CTA banner */}
      <CTABannerSection onBooking={openBooking} />
      {/* LIGHT  — Contact form */}
      <ContactSection />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <MobileCTABar onBooking={openBooking} />
    </>
  );
}
