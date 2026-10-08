"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Footer() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="w-full bg-rexos-primary border-t border-rexos-secondary pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
        
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-rexos-text">
            REXOS
          </h2>
          <p className="text-rexos-text/50 text-sm font-light leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-widest text-rexos-accent text-xs font-semibold mb-2">
              {t.explore}
            </h4>
            <Link href="/" className="text-rexos-text/70 hover:text-rexos-accent transition-colors text-sm">
              {isRtl ? "الرئيسية" : "Home"}
            </Link>
            <Link href="/menu" className="text-rexos-text/70 hover:text-rexos-accent transition-colors text-sm">
              {isRtl ? "القائمة" : "Menu"}
            </Link>
            <Link href="/#discover" className="text-rexos-text/70 hover:text-rexos-accent transition-colors text-sm">
              {isRtl ? "الفلسفة" : "Philosophy"}
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-widest text-rexos-accent text-xs font-semibold mb-2">
              {t.connect}
            </h4>
            <a href="#" className="text-rexos-text/70 hover:text-rexos-accent transition-colors text-sm">
              {isRtl ? "إنستغرام" : "Instagram"}
            </a>
            <a href="#" className="text-rexos-text/70 hover:text-rexos-accent transition-colors text-sm">
              {isRtl ? "فيسبوك" : "Facebook"}
            </a>
            <Link href="/contact" className="text-rexos-text/70 hover:text-rexos-accent transition-colors text-sm">
              {isRtl ? "تواصل معنا" : "Contact"}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-rexos-secondary/50 text-rexos-text/40 text-xs">
        <p>© {new Date().getFullYear()} REXOS. {t.rights}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-rexos-text transition-colors">
            {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
          <Link href="/terms" className="hover:text-rexos-text transition-colors">
            {isRtl ? "شروط الخدمة" : "Terms of Service"}
          </Link>
        </div>
      </div>
    </footer>
  );
}