import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, CheckCircle2, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | AK Prime Consulting",
  description: "Thank you for reaching out. A member of our team will be in touch within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#082121] pt-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <div className="w-16 h-16 rounded-full bg-[#37B4B4]/15 border border-[#37B4B4]/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={28} className="text-[#37B4B4]" />
        </div>

        <h1 className="text-4xl font-medium text-white mb-4">
          We'll be in touch soon!
        </h1>
        <p className="text-white/55 text-lg leading-relaxed mb-10">
          Thank you for reaching out to AK Prime Consulting. A member of our team will review your enquiry and respond within 24 hours.
        </p>

        <div className="glass-card rounded-2xl p-6 mb-10 text-left space-y-4">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-3">What happens next?</p>
          {[
            { icon: <Mail size={16} />, text: "You'll receive a confirmation email shortly" },
            { icon: <Calendar size={16} />, text: "Our team will review your needs and reach out within 24 hours" },
            { icon: <CheckCircle2 size={16} />, text: "We'll schedule a discovery call at a time that works for you" },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-center text-white/60 text-sm">
              <span className="text-[#37B4B4] shrink-0">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Home size={16} /> Return to Home
          </Link>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 border border-white/15 text-white hover:bg-white/5 px-6 py-3 rounded-xl transition-colors"
          >
            Read Our Insights <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
