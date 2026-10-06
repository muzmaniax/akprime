import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Image CMS | AK Prime Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-[#082121] text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
