import { SmoothScrollHero } from "@/components/sections/AboutHero";
import { Metadata } from "next";

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
            <span
              className="inline-block text-xs font-black tracking-[0.3em] uppercase mb-6 px-5 py-2 rounded-full"
              style={{ background: "rgba(55,180,180,0.1)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.2)" }}
            >
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1]" style={{ color: "#082121", letterSpacing: "-0.04em" }}>
              Built From Real enterprise <br />Experience
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: "#3a5a5a" }}>
              AK Prime Consulting was founded with one mission: to give organisations access to the same
              calibre of technology advisory that&#39;s typically reserved for large multinationals.
            </p>
            <p className="text-lg leading-relaxed mb-6 font-medium" style={{ color: "#082121" }}>
              Headquartered in Nairobi with a branch in Mombasa, we serve clients across multiple sectors —
              from manufacturing to government.
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
                <p className="text-3xl md:text-4xl font-black mb-1 text-[#37B4B4]">{s.stat}</p>
                <p className="text-xs uppercase font-bold tracking-widest text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-black tracking-[0.3em] uppercase mb-4 text-[#37B4B4]"
            >
              Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#082121]">
              What Drives Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: "🎯", title: "Precision", desc: "We deliver exact outcomes — no scope creep, no guesswork." },
              { emoji: "🤝", title: "Partnership", desc: "We embed with your team and build lasting capability." },
              { emoji: "⚡", title: "Impact", desc: "Measured by the business results it produces." },
              { emoji: "🔒", title: "Trust", desc: "Transparent governance and data integrity." },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-[18px] p-8 text-left hover:bg-[#F4FAFA] transition-all duration-300 border border-transparent hover:border-[#37B4B4]/20 group"
              >
                <span className="text-3xl mb-4 block grayscale group-hover:grayscale-0 transition-all">{v.emoji}</span>
                <h3 className="font-black text-xl uppercase mb-3" style={{ color: "#082121" }}>{v.title}</h3>
                <p className="text-base leading-relaxed text-[#3a5a5a]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
