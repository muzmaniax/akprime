import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const services = [
  { label: "ERP Implementation", href: "/services/erp-implementation" },
  { label: "AI Integration", href: "/services/ai-integration-automation" },
  { label: "Financial Management", href: "/services/financial-management" },
  { label: "Business Analysis", href: "/services/business-analysis" },
  { label: "Audit Services", href: "/services/audit-assurance" },
  { label: "Project Management", href: "/services/project-management" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-[#061818] text-white">
      <div className="container-x pt-20 pb-10">
        {/* Top row: brand + CTA */}
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center h-12">
              <img
                src="/ak-logo.png"
                alt="AK Prime"
                className="h-full w-auto"
              />
            </div>
            <p className="text-[15px] text-white/65 max-w-md leading-relaxed">
              Strategic consulting for organisations navigating complexity. We make
              informed decisions and build systems that scale.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin size={16} /></SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter"><Twitter size={16} /></SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram"><Instagram size={16} /></SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol title="Services" items={services} />
            <FooterCol title="Company" items={company} />
            <div>
              <div className="eyebrow mb-5">Contact</div>
              <ul className="space-y-3 text-[14px] text-white/70">
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="mt-1 text-[#37B4B4] shrink-0" />
                  <a href="mailto:info@akprime.co.ke" className="hover:text-white transition-colors">info@akprime.co.ke</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={14} className="mt-1 text-[#37B4B4] shrink-0" />
                  <a href="tel:+254118001001" className="hover:text-white transition-colors">0118 001 001</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-1 text-[#37B4B4] shrink-0" />
                  <span>Mombasa · Nairobi · Dubai</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-8">
          <div className="text-[18px] sm:text-[22px] text-white/85 max-w-xl leading-snug">
            Ready to bring clarity to your operations?
          </div>
          <Link href="/contact" className="btn-cta self-start sm:self-auto">
            Start the conversation <ArrowUpRight size={16} strokeWidth={2.25} />
          </Link>
        </div>

        {/* Oversized wordmark */}
        <div className="pt-6 pb-2">
          <div
            aria-hidden
            className="select-none leading-none font-medium tracking-[-0.04em] text-white/[0.07] hover:text-[#37B4B4]/30 transition-colors duration-700"
            style={{ fontSize: "clamp(5rem, 18vw, 17rem)" }}
          >
            AK PRIME
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-6 border-t border-white/10 text-[12px] text-white/50">
          <div>© {new Date().getFullYear()} AK Prime Consulting. All rights reserved.</div>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="eyebrow mb-5">{title}</div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="text-[14px] text-white/70 hover:text-white transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full border border-white/15 hover:border-[#37B4B4] hover:text-[#37B4B4] text-white/70 inline-flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}
