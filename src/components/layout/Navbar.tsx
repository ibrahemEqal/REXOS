"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { language, toggleLanguage, isRtl } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-rexos-primary/95 backdrop-blur-md border-rexos-secondary/80 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
          
          {/* الشعار */}
          <Link href="/" className="relative z-[60] block h-12 w-32 md:h-14 md:w-40">
            <Image src="/brand/rexos-logo.svg" alt="REXOS Restaurant & Cafe" fill className="object-contain brightness-0 invert" priority />
          </Link>

          {/* روابط سطح المكتب */}
          <div className="hidden md:flex items-center gap-10">
            {/* الروابط النصية */}
            <Link
              href="/"
              className="text-rexos-text/80 hover:text-rexos-gold uppercase tracking-[0.15em] text-xs transition-colors"
            >
              {isRtl ? "الرئيسية" : "Home"}
            </Link>
            <Link
              href="/menu"
              className="text-rexos-text/80 hover:text-rexos-gold uppercase tracking-[0.15em] text-xs transition-colors"
            >
              {isRtl ? "القائمة" : "Menu"}
            </Link>

            {/* الأزرار */}
            <div className="flex items-center gap-5 border-l border-rexos-secondary pl-8">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 border border-rexos-text/30 hover:border-rexos-gold px-4 py-2 transition-all text-xs text-rexos-gold"
              >
                <Globe size={16} />
                <span>{language === "en" ? "عربي" : "EN"}</span>
              </button>
            </div>
          </div>

          {/* أزرار قائمة الهاتف */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 border border-rexos-text/30 px-3 py-1.5 text-xs text-rexos-gold relative z-[60]"
            >
              <span>{language === "en" ? "عربي" : "EN"}</span>
            </button>
            <button
              className="text-rexos-text relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={32} strokeWidth={1} />
              ) : (
                <Menu size={32} strokeWidth={1} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* قائمة الهاتف المنبثقة */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-rexos-primary flex flex-col items-center justify-center gap-10"
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-[family-name:var(--font-cormorant)] text-5xl text-rexos-text hover:text-rexos-gold transition-colors"
            >
              {isRtl ? "الرئيسية" : "Home"}
            </Link>
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-[family-name:var(--font-cormorant)] text-5xl text-rexos-text hover:text-rexos-gold transition-colors"
            >
              {isRtl ? "القائمة" : "Menu"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
