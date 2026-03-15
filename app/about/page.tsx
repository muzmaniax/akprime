import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AK Prime Consulting",
  description: "Learn about AK Prime Consulting's mission to modernise business operations across Africa with ERP and AI solutions.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0E3E3E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">About AK Prime Consulting</h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          We are a strategic advisory firm headquartered in Nairobi, Kenya, helping organisations across Pan-Africa modernise their operations through powerful software and proven management methodologies.
        </p>
      </div>
    </div>
  );
}
