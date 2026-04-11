import { SmoothScrollHero } from "@/components/sections/AboutHero";
import { Metadata } from "next";
import { Target, Handshake, Zap, Lock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const metadata: Metadata = {
  title: "About Us | AK Prime Consulting",
  description: "Learn about AK Prime Consulting — headquartered in Nairobi with a branch in Mombasa. We modernise business operations with ERP, AI and strategic advisory.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#082121]">
      <SmoothScrollHero />
      
      {/* ── Story ── */}
      <section className="py-16 px-4 bg-white rounded-t-[44px] -mt-16 relative z-30 shadow-2xl">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-overline mb-6 inline-block">
              Our story
            </span>
            <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-[1.1]" style={{ color: "#082121", letterSpacing: "-0.04em" }}>
              Built from real enterprise <br />experience
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: "#3a5a5a" }}>
              AK Prime Consulting was founded with one mission: to give organisations <span className="text-[#37B4B4] font-medium">access to the same calibre of technology advisory</span> that's typically reserved for large multinationals.
            </p>
            <p className="text-lg leading-relaxed mb-6 font-medium" style={{ color: "#082121" }}>
              Headquartered in <span className="text-[#37B4B4]">Nairobi</span> with a branch in <span className="text-[#37B4B4]">Mombasa</span>, we serve clients across multiple sectors — from manufacturing to government.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { stat: "200+", label: "Projects" },
              { stat: "50+", label: "Clients" },
              { stat: "16", label: "Service Lines" },
              { stat: "8", label: "Industries" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[18px] p-6 text-center bg-[#F4FAFA] border border-[#37B4B4]/10 shadow-sm"
              >
                <p className="text-3xl md:text-4xl font-medium mb-1 text-[#37B4B4]">{s.stat}</p>
                <p className="text-xs font-medium tracking-tight text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-overline mb-4 inline-block">
              Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-[#082121]">
              What drives us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { id: 1, icon: Target, title: "Precision", desc: "We deliver exact outcomes — no scope creep, no guesswork." },
              { id: 2, icon: Handshake, title: "Partnership", desc: "We embed with your team and build lasting capability." },
              { id: 3, icon: Zap, title: "Impact", desc: "Measured by the business results it produces." },
              { id: 4, icon: Lock, title: "Trust", desc: "Transparent governance and data integrity." },
            ].map((v) => (
              <ValueItem key={v.id} v={v} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}function ValueItem({ v }: { v: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      {/* Desktop view: Card */}
      <div className="hidden sm:block rounded-[24px] p-8 text-left transition-all duration-300 bg-transparent border border-transparent shadow-none hover:bg-[#F4FAFA] hover:border-[#37B4B4]/20 hover:shadow-md group h-full">
        <div className="mb-4 text-[#37B4B4]/50 group-hover:text-[#37B4B4] transition-colors">
          <v.icon size={32} />
        </div>
        <h3 className="font-medium text-xl mb-3" style={{ color: "#082121" }}>{v.title}</h3>
        <p className="text-base leading-relaxed text-[#3a5a5a]">{v.desc}</p>
      </div>

      {/* Mobile view: Accordion */}
      <div className="block sm:hidden border border-[#37B4B4]/10 rounded-2xl bg-[#f9fdfd] overflow-hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 text-left active:bg-[#F4FAFA]"
        >
          <div className="flex items-center gap-4">
            <div className="text-[#37B4B4]"><v.icon size={20} /></div>
            <span className="font-semibold text-[#082121]">{v.title}</span>
          </div>
          <ChevronDown size={18} className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="px-5 pb-5 pt-0">
                <p className="text-sm leading-relaxed text-[#3a5a5a]">{v.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
