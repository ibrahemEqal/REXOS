import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600"],
  variable: '--font-cormorant'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "REXOS | Where Taste Becomes Art",
  description: "A Michelin-level luxury culinary experience.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} bg-rexos-primary text-rexos-text font-sans antialiased relative`}>
      <LanguageProvider> 
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}