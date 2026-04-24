import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { label: "ERP Implementation", href: "/services#erp" },
  { label: "AI Integration", href: "/services#ai" },
  { label: "Financial Management", href: "/services#finance" },
  { label: "Business Analysis", href: "/services#ba" },
  { label: "Audit Services", href: "/services#audit" },
  { label: "Bookkeeping", href: "/services#bookkeeping" },
  { label: "Risk & Compliance", href: "/services#risk" },
  { label: "Project Management", href: "/services#pm" },
  { label: "Digital Marketing", href: "/services#marketing" },
  { label: "Training Services", href: "/services#training" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer style={{ background: "#040f0f" }}>
      {/* Teal glow separator */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(55,180,180,.5) 40%, rgba(41,224,200,.7) 60%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-5">
              <Image
                src="/ak-logo.png"
                alt="AK Prime Consulting"
                width={150}
                height={40}
                className="h-10 w-auto object-contain pb-[5px] transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-white/45 text-[0.9375rem] leading-relaxed mb-5">
              Modernise Your Business Operations With AI, ERP &amp; Strategic Advisory. Headquartered in Nairobi, Kenya — with a branch in Mombasa.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/40 text-xs">All systems operational</span>
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-white font-semibold text-[0.85rem] mb-5">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-[0.9375rem] hover:text-[#37B4B4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-[0.85rem] mb-5">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-[0.9375rem] hover:text-[#37B4B4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-[0.85rem] mb-5">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@akprime.co.ke" className="text-white/45 text-sm hover:text-[#37B4B4] transition-colors break-all">
                  info@akprime.co.ke
                </a>
              </li>
              <li>
                <a href="tel:0118001001" className="text-white/45 text-sm hover:text-[#37B4B4] transition-colors">
                  0118001001
                </a>
              </li>
              <li className="text-white/45 text-sm">
                Nairobi · Mombasa · Middle East
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-white/30 text-xs mb-3 font-medium">Free resources</p>
              <Link
                href="/resources"
                className="inline-block text-xs px-4 py-2 rounded-lg border border-[#37B4B4]/30 text-[#37B4B4] hover:bg-[#37B4B4]/10 transition-colors"
              >
                Download Guides →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2026 AK Prime Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/30 text-xs hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
