"use client";

import { useState } from "react";
import { CaseStudiesSection } from "@/components/sections/CaseAndPackages";
import { BookingModal } from "@/components/ui/BookingModal";

export default function CaseStudiesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <div className="pt-20 min-h-screen bg-[#082121]">
      <CaseStudiesSection onBooking={openBooking} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
