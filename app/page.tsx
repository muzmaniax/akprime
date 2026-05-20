"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Above-fold: import statically for immediate SSR + no waterfall
import { HeroSection } from "@/components/sections/HeroSection";
import { PhotoStrip } from "@/components/sections/MidSections";

// Below-fold: dynamic imports — code-split into separate chunks, lazy-loaded
// This reduces initial JS parse/execute by ~143 KiB (Lighthouse issue #3)
const TrustedLogosCarousel = dynamic(
  () => import("@/components/sections/TrustedLogosCarousel").then(m => ({ default: m.TrustedLogosCarousel })),
  { ssr: true }
);
const ChallengeSection = dynamic(
  () => import("@/components/sections/ChallengeSection").then(m => ({ default: m.ChallengeSection })),
  { ssr: true }
);
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })),
  { ssr: true }
);
const IndustriesSection = dynamic(
  () => import("@/components/sections/ProcessAndIndustries").then(m => ({ default: m.IndustriesSection })),
  { ssr: true }
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessAndIndustries").then(m => ({ default: m.ProcessSection })),
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
const CTABannerSection = dynamic(
  () => import("@/components/sections/TestimonialsInsightsCTA").then(m => ({ default: m.CTABannerSection })),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })),
  { ssr: true }
);
// BookingModal is pure client-only UI, never needed for SSR
const BookingModal = dynamic(
  () => import("@/components/ui/BookingModal").then(m => ({ default: m.BookingModal })),
  { ssr: false }
);
const ParallaxSection = dynamic(
  () => import("@/components/ui/ParallaxSection").then(m => ({ default: m.ParallaxSection })),
  { ssr: true }
);

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <HeroSection onBooking={openBooking} />

      {/* 1b. Brand Strips — Revealed on Scroll */}
      <div className="relative z-10 bg-[#082121]">
        <PhotoStrip />
      </div>

      {/* 2. Trusted Logos Carousel */}
      <TrustedLogosCarousel />

      {/* 3. Challenge — LIGHT (Figma Implementation) */}
      <ChallengeSection onBooking={openBooking} />

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
