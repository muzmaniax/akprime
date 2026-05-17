import { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Privacy Policy | AK Prime Consulting",
  description: "How AK Prime Consulting collects, uses, and protects your personal information.",
  alternates: { canonical: "https://akprime.co.ke/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "1 May 2025";

export default function PrivacyPage() {
  return (
    <section className="section-dark min-h-screen" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 48px)", paddingBottom: "80px" }}>
      <div className="container-x max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-white" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.4rem)", lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p className="mt-2 text-[13px] text-white/40">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-[15px] text-white/70 leading-relaxed">

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">1. Who We Are</h2>
            <p>
              AK Prime Consulting (&quot;AK Prime&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a strategic consulting firm
              with offices in Mombasa, Nairobi (Kenya) and Dubai (UAE). Our registered website is{" "}
              <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline">akprime.co.ke</a>.
              For any privacy-related enquiries, contact us at{" "}
              <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline">info@akprime.co.ke</a>.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information in the following ways:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white/90 font-medium">Contact form submissions</span> — your first and last name,
                email address, phone number (optional), and message content when you reach out to us via our website.
              </li>
              <li>
                <span className="text-white/90 font-medium">Booking requests</span> — details provided when scheduling
                a consultation, including name, email, and preferred time.
              </li>
              <li>
                <span className="text-white/90 font-medium">Usage data</span> — standard server logs including IP address,
                browser type, pages visited, and referring URLs. This data is aggregated and not linked to individuals.
              </li>
              <li>
                <span className="text-white/90 font-medium">Cookies</span> — essential cookies required for the website to function.
                We do not use advertising or tracking cookies.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use collected information solely to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your enquiries and service requests.</li>
              <li>Schedule and manage consultations.</li>
              <li>Send relevant service information you have requested.</li>
              <li>Improve the quality and performance of our website.</li>
              <li>Comply with legal obligations applicable in Kenya and the UAE.</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">4. Legal Basis for Processing</h2>
            <p>
              We process your personal data on the basis of your consent (when you submit a form), our legitimate
              interests in operating a business and responding to enquiries, and compliance with applicable laws.
              You may withdraw consent at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">5. Data Sharing</h2>
            <p className="mb-3">
              We share your data only where necessary with trusted service providers who assist us in operating
              our website and delivering services:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="text-white/90 font-medium">Resend</span> — transactional email delivery.</li>
              <li><span className="text-white/90 font-medium">Vercel</span> — website hosting and infrastructure.</li>
              <li><span className="text-white/90 font-medium">Cal.com</span> — consultation scheduling (if applicable).</li>
            </ul>
            <p className="mt-3">
              All service providers are contractually required to handle your data securely and only for the
              purposes we specify.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">6. Data Retention</h2>
            <p>
              We retain contact and enquiry records for up to 24 months from the date of your last interaction
              with us, after which they are securely deleted. You may request earlier deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Withdraw consent at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline">info@akprime.co.ke</a>.
              We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal information
              against unauthorised access, disclosure, alteration, or destruction. Our website is served over
              HTTPS and data at rest is stored on encrypted infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices of those sites and encourage you to review their policies independently.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of
              this page reflects the most recent revision. Continued use of our website following any changes
              constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">11. Contact Us</h2>
            <p>
              For any questions about this Privacy Policy, please contact us at:
            </p>
            <address className="mt-3 not-italic space-y-1 text-white/60">
              <p className="text-white/90 font-medium">AK Prime Consulting</p>
              <p>Mombasa, Kenya · Nairobi, Kenya · Dubai, UAE</p>
              <p>
                <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline">info@akprime.co.ke</a>
              </p>
              <p>
                <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline">akprime.co.ke</a>
              </p>
            </address>
          </div>

        </div>
      </div>
    </section>
  );
}
