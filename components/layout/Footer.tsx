import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { label: "ERP Implementation",        href: "/services#erp" },
  { label: "AI Integration",            href: "/services#ai" },
  { label: "Financial Management",      href: "/services#finance" },
  { label: "Business Analysis",         href: "/services#ba" },
  { label: "Audit Services",            href: "/services#audit" },
  { label: "Bookkeeping",               href: "/services#bookkeeping" },
  { label: "Risk & Compliance",         href: "/services#risk" },
  { label: "Project Management",        href: "/services#pm" },
  { label: "Digital Marketing",         href: "/services#marketing" },
  { label: "Training Services",         href: "/services#training" },
];

const companyLinks = [
  { label: "About Us",        href: "/about" },
  { label: "Case Studies",    href: "/case-studies" },
  { label: "Industries",      href: "/industries" },
  { label: "Insights",        href: "/insights" },
  { label: "Contact",         href: "/contact" },
  { label: "Privacy Policy",  href: "/privacy" },
  { label: "Terms of Service",href: "/terms" },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center group mb-4">
              <Image 
                src="/logo-primary.png" 
                alt="AK Prime Consulting" 
                width={160} 
                height={35} 
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              Modernise Your Business Operations With AI, ERP &amp; Strategic Advisory. Headquartered in Nairobi, Kenya — delivering across Africa.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/40 text-xs">All systems operational</span>
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-sm hover:text-[#37B4B4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-sm hover:text-[#37B4B4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@akprimeconsulting.com" className="text-white/45 text-sm hover:text-[#37B4B4] transition-colors break-all">
                  hello@akprimeconsulting.com
                </a>
              </li>
              <li>
                <a href="tel:+254700000000" className="text-white/45 text-sm hover:text-[#37B4B4] transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="text-white/45 text-sm">
                Nairobi, Kenya<br />
                <span className="text-white/30 text-xs">Pan-Africa Delivery</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-white/30 text-xs mb-3 uppercase tracking-wider">Free Resources</p>
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
            <Link href="/terms"   className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
