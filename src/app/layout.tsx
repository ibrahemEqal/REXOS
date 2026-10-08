import type { Metadata } from "next";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rexos Cafe & Restaurant | Nablus, Rafidia",
  description: "Rexos Cafe & Restaurant in Rafidia, Nablus. Explore our full menu, order through WhatsApp, and contact us.",
  keywords: ["Rexos", "Rexos Cafe", "Rexos Restaurant", "Nablus restaurant", "Rafidia cafe", "مطعم نابلس", "مطاعم رفيديا"],
  openGraph: {
    title: "Rexos Cafe & Restaurant | Nablus, Rafidia",
    description: "Good food, great atmosphere, and a table waiting for you in Rafidia.",
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/brand/rexos-logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-rexos-primary text-rexos-text font-sans antialiased relative">
      <LanguageProvider> 
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <a href="https://wa.me/970597600024" target="_blank" rel="noreferrer" aria-label="WhatsApp REXOS" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-lg shadow-black/30 transition hover:scale-110 md:bottom-7 md:right-7">
              <span aria-hidden className="text-sm font-bold">WA</span>
            </a>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
