"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingModal } from "@/components/ui/BookingModal";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { industriesData } from "@/data/industries";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";

export default function IndustriesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>Industries</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance max-w-[20ch]" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}>
              Industries we serve.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              We work across industries where decisions carry real financial, operational,
              and strategic consequences.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-dark section-py">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industriesData.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 6) * 60}>
                <Link href={`/industries/${ind.slug}`} className="group block card-dark overflow-hidden">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${ind.photo})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082121] via-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white group-hover:text-[#37B4B4] transition-colors">{ind.name}</h3>
                    <p className="mt-2 text-[13px] text-white/55 leading-relaxed line-clamp-2">{ind.shortDescription}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#37B4B4]">
                      View industry <ArrowUpRight size={13} strokeWidth={2.25} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection onBooking={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
