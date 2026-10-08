"use client";

import Link from "next/link";
import { MapPin, Phone, Clock3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Cta() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative overflow-hidden bg-rexos-primary px-6 py-24 md:px-12 md:py-32 lg:px-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rexos-secondary/40 via-rexos-primary to-rexos-primary" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-rexos-accent">{language === "ar" ? "نحن بانتظارك" : "Come visit us"}</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl text-rexos-text md:text-7xl">{language === "ar" ? "طاولتك بانتظارك." : "Your table is waiting."}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="border border-rexos-accent/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-rexos-accent transition hover:bg-rexos-accent hover:text-rexos-primary">{language === "ar" ? "شاهد المنيو" : "View menu"}</Link>
            <a href="https://wa.me/970597600024" target="_blank" rel="noreferrer" className="bg-rexos-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-rexos-primary transition hover:bg-rexos-text">{t.whatsapp}</a>
          </div>
        </div>

        <div className="grid gap-3 border-t border-rexos-text/10 pt-6 md:grid-cols-3">
          <div className="flex items-start gap-4 border border-rexos-text/10 bg-rexos-secondary/35 p-5"><MapPin className="mt-1 shrink-0 text-rexos-accent" size={20} /><div><p className="text-xs uppercase tracking-[0.15em] text-rexos-text/45">{language === "ar" ? "الموقع" : "Location"}</p><p className="mt-2 text-sm text-rexos-text/80">{t.location}</p></div></div>
          <div className="flex items-start gap-4 border border-rexos-text/10 bg-rexos-secondary/35 p-5"><Clock3 className="mt-1 shrink-0 text-rexos-accent" size={20} /><div><p className="text-xs uppercase tracking-[0.15em] text-rexos-text/45">{language === "ar" ? "ساعات العمل" : "Opening hours"}</p><p className="mt-2 text-sm leading-6 text-rexos-text/80">{t.hours}</p></div></div>
          <a href="tel:+970597600024" className="flex items-start gap-4 border border-rexos-text/10 bg-rexos-secondary/35 p-5 transition hover:border-rexos-accent"><Phone className="mt-1 shrink-0 text-rexos-accent" size={20} /><div><p className="text-xs uppercase tracking-[0.15em] text-rexos-text/45">{language === "ar" ? "اتصل بنا" : "Call us"}</p><p className="mt-2 text-sm text-rexos-text/80">0597 600 024</p></div></a>
        </div>
      </div>
    </section>
  );
}
