"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function PrivateDiningPage() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].privateDining || translations.en.privateDining;

  return (
    <main className="min-h-screen bg-rexos-primary pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col items-center text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.4em] text-rexos-accent text-xs mb-6 font-semibold"
          >
            {t.tag}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-cormorant)] text-6xl md:text-8xl text-rexos-text mb-4"
          >
            {t.title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-rexos-accent italic mb-8"
          >
            {t.subtitle}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[60vh] md:h-[700px] w-full overflow-hidden group"
          >
            <div className="absolute inset-0 bg-rexos-primary/10 z-10 group-hover:bg-transparent transition-colors duration-700" />
            <Image
              src="https://images.unsplash.com/photo-1572297127976-554178553fbe?q=80&w=1974&auto=format&fit=crop"
              alt="Private Dining at REXOS"
              fill
              className="object-cover grayscale-[20%] transition-transform duration-[2s] group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-rexos-accent" />
            </div>
            
            <p className="text-rexos-text/70 font-light text-lg md:text-xl leading-relaxed mb-12">
              {t.description}
            </p>

            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-text mb-4">
              {t.capacityTitle}
            </h3>
            <p className="text-rexos-text/60 font-light text-sm md:text-base leading-relaxed mb-12">
              {t.capacityDesc}
            </p>

            <div>
              <Link 
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 border border-rexos-accent/30 overflow-hidden transition-all duration-500 hover:border-rexos-accent hover:bg-rexos-accent/5 text-rexos-text uppercase tracking-[0.2em] text-xs"
              >
                <span className="relative z-10 group-hover:text-rexos-accent transition-colors duration-500">
                  {t.inquireBtn}
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}