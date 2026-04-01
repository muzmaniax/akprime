"use client";

import { useState } from "react";
import { BookingModal } from "@/components/ui/BookingModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedLogosCarousel } from "@/components/sections/TrustedLogosCarousel";
import { ProblemSection, TickerBand, PhotoStrip } from "@/components/sections/MidSections";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection, IndustriesSection } from "@/components/sections/ProcessAndIndustries";
import { CaseStudiesSection } from "@/components/sections/CaseAndPackages";
import { TestimonialsSection, InsightsSection, CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { ContactSection } from "@/components/sections/ContactSection";
import { ParallaxSection } from "@/components/ui/ParallaxSection";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <HeroSection onBooking={openBooking} />
      
      {/* 1b. Brand Strips — Revealed on Scroll */}
      <div className="relative z-10 bg-[#082121]">
        <TickerBand />
        <PhotoStrip />
      </div>

      {/* 2. Trusted Logos Carousel */}
      <TrustedLogosCarousel />

      {/* 3. Problem — LIGHT */}
      <ProblemSection onBooking={openBooking} />

      {/* 5. Services Overview — DARK */}
      <ParallaxSection offset={50} fadeIn>
        <ServicesSection />
      </ParallaxSection>

      {/* 6. Industries — Animated Ticker Carousel */}
      <ParallaxSection offset={30} fadeIn>
        <IndustriesSection />
      </ParallaxSection>

      {/* 7. Process Steps — TINT */}
      <ParallaxSection offset={45} fadeIn>
        <ProcessSection />
      </ParallaxSection>

      {/* 8. Case Studies — DARK */}
      <ParallaxSection offset={40} fadeIn>
        <CaseStudiesSection />
      </ParallaxSection>

      {/* 9. Testimonials — TINT */}
      <ParallaxSection offset={35} fadeIn scaleFrom={0.97}>
        <TestimonialsSection />
      </ParallaxSection>

      {/* 10. Insights — LIGHT */}
      <ParallaxSection offset={40} fadeIn>
        <InsightsSection />
      </ParallaxSection>

      {/* 11. CTA Banner — DARK */}
      <ParallaxSection offset={30} fadeIn scaleFrom={0.98}>
        <CTABannerSection onBooking={openBooking} />
      </ParallaxSection>

      {/* 12. Contact Form — LIGHT */}
      <ParallaxSection offset={35} fadeIn>
        <ContactSection />
      </ParallaxSection>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
