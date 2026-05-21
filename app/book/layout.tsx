import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Strategy Consultation | AK Prime Consulting",
  description: "Book a free 30-minute strategy consultation with AK Prime Consulting. Get an honest assessment of your situation and a clear next step.",
  alternates: { canonical: "https://akprime.co.ke/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
