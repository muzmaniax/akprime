import { SmoothScrollHero } from "@/components/sections/AboutHero";
import { Metadata } from "next";
import { AboutValues } from "@/components/sections/AboutValues";

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

      <AboutValues />
    </div>
  );
}

