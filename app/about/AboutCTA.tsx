"use client";

import { useState } from "react";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { BookingModal } from "@/components/ui/BookingModal";

export function AboutCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CTABannerSection onBooking={() => setOpen(true)} />
      <BookingModal open={open} onOpenChange={setOpen} />
    </>
  );
}
