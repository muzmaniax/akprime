"use client";
import { Target, Handshake, Zap, Lock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AboutValues() {
  return (
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
  );
}

function ValueItem({ v }: { v: any }) {
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
