import { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Terms of Service | AK Prime Consulting",
  description: "Terms and conditions governing the use of AK Prime Consulting's website and services.",
  alternates: { canonical: "https://akprime.co.ke/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "1 May 2025";

export default function TermsPage() {
  return (
    <section className="section-dark min-h-screen" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 48px)", paddingBottom: "80px" }}>
      <div className="container-x max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-white" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.4rem)", lineHeight: 1.1 }}>
          Terms of Service
        </h1>
        <p className="mt-2 text-[13px] text-white/40">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-[15px] text-white/70 leading-relaxed">

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website at{" "}
              <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline">akprime.co.ke</a>{" "}
              (&quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree,
              please do not use the Site. These Terms apply to all visitors, users, and others who access the Site.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">2. About AK Prime Consulting</h2>
            <p>
              AK Prime Consulting (&quot;AK Prime&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a strategic consulting firm
              providing ERP implementation, financial advisory, technology transformation, and related professional
              services to organisations in Kenya, the UAE, and across Africa and the Middle East.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">3. Use of the Site</h2>
            <p className="mb-3">You agree to use the Site only for lawful purposes and in a manner that does not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Violate any applicable local, national, or international law or regulation.</li>
              <li>Infringe the rights of any third party, including intellectual property rights.</li>
              <li>Transmit unsolicited or unauthorised advertising or promotional material.</li>
              <li>Attempt to gain unauthorised access to any part of the Site or its related systems.</li>
              <li>Interfere with the proper functioning of the Site.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">4. Intellectual Property</h2>
            <p>
              All content on this Site — including text, graphics, logos, images, case studies, and software — is
              the property of AK Prime Consulting and is protected by applicable intellectual property laws. You
              may not reproduce, distribute, modify, or create derivative works without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">5. Professional Services Disclaimer</h2>
            <p>
              Content published on this Site is for general informational purposes only and does not constitute
              professional consulting, financial, legal, or technical advice. Engaging AK Prime Consulting for
              professional services is governed by a separate written engagement agreement. No information on
              this Site creates a client relationship between you and AK Prime Consulting.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">6. Enquiries and Contact Forms</h2>
            <p>
              Submitting an enquiry via our contact form or booking a consultation does not constitute an offer
              or guarantee of services. All engagements are subject to mutual agreement on scope, fees, and
              terms as documented in a formal engagement letter or contract.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">7. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites or services. These are provided for convenience
              only. AK Prime Consulting has no control over, and assumes no responsibility for, the content,
              privacy policies, or practices of any third-party sites.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, AK Prime Consulting shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of, or inability to
              use, the Site or its content — even if we have been advised of the possibility of such damages.
              Our aggregate liability for any claim arising out of your use of the Site shall not exceed USD 100.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">9. Disclaimer of Warranties</h2>
            <p>
              The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind,
              either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or
              free of viruses or other harmful components.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of Kenya.
              Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction
              of the courts of Kenya, without prejudice to any mandatory consumer protection provisions
              applicable in the UAE for users accessing the Site from that jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">11. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes take effect immediately upon
              posting to the Site. The &quot;Last updated&quot; date at the top of this page reflects the most recent
              revision. Your continued use of the Site after any changes constitutes your acceptance of the
              updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">12. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:
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
