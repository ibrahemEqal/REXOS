"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function ContactPage() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].contact || translations.en.contact;

  return (
    <main className="min-h-screen bg-rexos-primary pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col items-center text-center mb-24">
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
            className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl text-rexos-text mb-8"
          >
            {t.title}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-rexos-accent/50" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-accent mb-4">
                {t.addressTitle}
              </h3>
              <p className="text-rexos-text/70 font-light leading-relaxed max-w-sm">
                {t.address}
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-accent mb-4">
                {t.hoursTitle}
              </h3>
              <p className="text-rexos-text/70 font-light leading-relaxed mb-1">
                {t.hours1}
              </p>
              <p className="text-rexos-text/70 font-light leading-relaxed">
                {t.hours2}
              </p>
            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-rexos-secondary/30 border border-rexos-secondary p-8 md:p-12"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-text mb-8">
              {t.formTitle}
            </h3>
            
            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); window.open("https://wa.me/972594084898?text=REXOS%20website%20inquiry", "_blank"); }}>
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  className={`w-full bg-transparent border-b border-rexos-text/20 py-3 text-rexos-text outline-none transition-colors focus:border-rexos-accent peer ${isRtl ? 'text-right' : 'text-left'}`}
                  placeholder=" "
                />
                <label className={`absolute top-3 ${isRtl ? 'right-0' : 'left-0'} text-rexos-text/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-rexos-accent peer-valid:-top-4 peer-valid:text-xs pointer-events-none`}>
                  {t.name}
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  required
                  rows={4}
                  className={`w-full bg-transparent border-b border-rexos-text/20 py-3 text-rexos-text outline-none transition-colors focus:border-rexos-accent peer resize-none ${isRtl ? 'text-right' : 'text-left'}`}
                  placeholder=" "
                />
                <label className={`absolute top-3 ${isRtl ? 'right-0' : 'left-0'} text-rexos-text/50 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-rexos-accent peer-valid:-top-4 peer-valid:text-xs pointer-events-none`}>
                  {t.message}
                </label>
              </div>

              <button 
                type="submit"
                className="mt-4 border border-rexos-accent/50 text-rexos-accent hover:bg-rexos-accent hover:text-rexos-primary transition-all duration-300 py-4 uppercase tracking-[0.2em] text-xs font-semibold"
              >
                {t.submit}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
