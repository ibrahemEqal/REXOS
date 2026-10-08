"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function ReservationsPage() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].reservations || translations.en.reservations;

  const [selectedGuests, setSelectedGuests] = useState<string | null>("1-4");
  const [selectedTime, setSelectedTime] = useState<string | null>("19:00");

  const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
  const guestOptions = ["1", "2", "3", "4", "5-10", "+10"];

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* نموذج الحجز */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-12"
          >
            {/* 1. عدد الضيوف (محدثة) */}
            <div>
              <h3 className="uppercase tracking-[0.2em] text-rexos-text/70 text-xs mb-6 font-semibold">
                1. {t.guests}
              </h3>
              <div className="flex flex-wrap gap-4">
                {guestOptions.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedGuests(range)}
                    className={`h-12 px-8 flex items-center justify-center border transition-all duration-300 font-sans text-sm tracking-widest ${
                      selectedGuests === range 
                        ? "border-rexos-accent bg-rexos-accent text-rexos-primary font-semibold" 
                        : "border-rexos-secondary text-rexos-text hover:border-rexos-accent/50"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. التاريخ والوقت */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="uppercase tracking-[0.2em] text-rexos-text/70 text-xs mb-6 font-semibold">
                  2. {t.date}
                </h3>
                <input 
                  type="date" 
                  className={`w-full bg-transparent border-b border-rexos-secondary py-3 text-rexos-text outline-none focus:border-rexos-accent transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
              <div>
                <h3 className="uppercase tracking-[0.2em] text-rexos-text/70 text-xs mb-6 font-semibold">
                  3. {t.time}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 border text-sm transition-all duration-300 ${
                        selectedTime === time 
                          ? "border-rexos-accent bg-rexos-accent/10 text-rexos-accent" 
                          : "border-rexos-secondary text-rexos-text/70 hover:border-rexos-accent/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. معلومات التواصل */}
            <div>
              <h3 className="uppercase tracking-[0.2em] text-rexos-text/70 text-xs mb-6 font-semibold">
                4. {t.contactInfo}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  placeholder={t.name}
                  className={`w-full bg-transparent border-b border-rexos-secondary py-3 text-rexos-text outline-none focus:border-rexos-accent transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                />
                <input 
                  type="email" 
                  placeholder={t.email}
                  className={`w-full bg-transparent border-b border-rexos-secondary py-3 text-rexos-text outline-none focus:border-rexos-accent transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                />
                <input 
                  type="tel" 
                  placeholder={t.phone}
                  className={`w-full bg-transparent border-b border-rexos-secondary py-3 text-rexos-text outline-none focus:border-rexos-accent transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                />
                <input 
                  type="text" 
                  placeholder={t.occasion}
                  className={`w-full bg-transparent border-b border-rexos-secondary py-3 text-rexos-text outline-none focus:border-rexos-accent transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>

            <button className="w-full mt-4 bg-rexos-accent text-rexos-primary py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-rexos-text transition-colors duration-500">
              {t.submit}
            </button>
          </motion.div>

          {/* سياسة الحجز والصورة */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="bg-rexos-secondary/20 p-8 md:p-10 border border-rexos-secondary mb-10">
              <h4 className="font-[family-name:var(--font-cormorant)] text-3xl text-rexos-accent mb-6">
                {t.policyTitle}
              </h4>
              <p className="text-rexos-text/70 font-light text-sm leading-relaxed">
                {t.policyText}
              </p>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-rexos-primary/20 z-10" />
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="REXOS Dining Table"
                fill
                className="object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}