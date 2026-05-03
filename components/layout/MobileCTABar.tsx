"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface MobileCTABarProps {
  onBooking: () => void;
}

export function MobileCTABar({ onBooking }: MobileCTABarProps) {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
      const contact = document.getElementById("contact");
      if (contact) {
        const rect = contact.getBoundingClientRect();
        setHidden(rect.top < window.innerHeight * 0.9);
      } else {
        setHidden(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out ${visible && !hidden ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="px-4 pb-4 pt-8" style={{ background: "linear-gradient(to top, rgba(8,33,33,0.97) 0%, transparent 100%)" }}>
        <button
          onClick={onBooking}
          className="w-full h-[52px] btn-cta justify-center text-[15px]"
        >
          Book a strategy call <ArrowUpRight size={16} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
