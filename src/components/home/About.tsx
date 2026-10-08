"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function About() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].about;
  const points = isRtl
    ? ["مكونات طازجة", "طهي بشغف", "تجربة تستحق التكرار"]
    : ["Fresh ingredients", "Cooked with care", "Worth coming back for"];

  return (
    <section id="discover" className="relative overflow-hidden bg-rexos-secondary/25 px-6 py-24 text-rexos-text md:px-12 md:py-32 lg:px-24">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-rexos-accent/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
        <motion.div initial={{ opacity: 0, x: isRtl ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-rexos-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-rexos-accent">{t.tag}</span>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl leading-tight md:text-7xl">{t.headline1}</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-rexos-text/65 md:text-lg">{t.desc}</p>
          <a href="/menu" className="mt-9 inline-flex border border-rexos-accent/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-rexos-accent transition hover:bg-rexos-accent hover:text-rexos-primary">
            {language === "ar" ? "اكتشف القائمة" : "Explore the menu"}
          </a>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-3">
          {points.map((point, index) => (
            <motion.div key={point} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.12 }} className="min-h-44 border border-rexos-text/10 bg-rexos-primary/55 p-6 transition hover:-translate-y-1 hover:border-rexos-accent/60">
              <span className="font-[family-name:var(--font-cormorant)] text-4xl text-rexos-accent">0{index + 1}</span>
              <p className="mt-10 text-sm leading-6 text-rexos-text/75">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
