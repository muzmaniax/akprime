"use client";

import { useState } from "react";
import { BookingModal } from "@/components/ui/BookingModal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industriesData } from "@/data/industries";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";

export default function IndustriesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <div className="min-h-screen bg-[#F4FAFA]">
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#0E3E3E] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#082121]/50 mix-blend-multiply pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span
            className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(55,180,180,0.12)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.3)" }}
          >
            Sectors We Serve
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
            Industry Transformation
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
            We deliver highly specialised enterprise solutions tailored to the unique regulatory, operational, and scaling needs of your specific sector.
          </p>
        </div>
      </section>

      {/* ── Industry Grid ── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image Header */}
                <div className="h-60 relative overflow-hidden">
                  {/* Overlay to ensure text/icons can overlay but visually it's just the image */}
                  <div className="absolute inset-0 bg-[#082121]/30 group-hover:bg-[#082121]/10 transition-colors duration-500 z-10" />
                  <img 
                    src={ind.photo} 
                    alt={ind.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Teal Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#37B4B4] to-[#29E0C8] z-20" />
                </div>
                
                {/* Content Box */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#082121] mb-2 group-hover:text-[#37B4B4] transition-colors">{ind.name}</h3>
                  <p className="text-sm text-[#3a5a5a] mb-6 leading-relaxed flex-1">
                    {ind.shortDescription}
                  </p>
                  
                  <div className="flex items-center text-[#37B4B4] font-semibold text-xs tracking-wide">
                    Explore Solutions 
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABannerSection onBooking={openBooking} />
    </div>
  );
}
