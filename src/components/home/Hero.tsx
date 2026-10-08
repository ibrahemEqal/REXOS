"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Hero() {
  const { language, isRtl } = useLanguage();
  const t = translations[language].hero;
  const sectionRef = useRef<HTMLElement>(null);

  // gentle parallax — video and content drift at slightly different
  // speeds as the visitor scrolls past, standard for a filmic hero
  // but worth doing properly: eased, capped, and reduced-motion safe.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

const reduceMotion = useSyncExternalStore(
  (callback) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    mq.addEventListener("change", callback);

    return () => mq.removeEventListener("change", callback);
  },
  () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  () => false
);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // title letters reveal individually — the one deliberate "signature"
  // moment for this section. Splits on spaces so multi-word titles
  // still wrap naturally.
  const titleWords = t.title.split(" ");

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-rexos-primary">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={reduceMotion ? undefined : { y: videoY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <video autoPlay loop muted playsInline className="object-cover w-full h-full">
          <source src="/videos/hero-video.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-rexos-primary/30 via-rexos-primary/50 to-rexos-primary/90" />
        {/* subtle vignette for a more cinematic, considered frame */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.p
          variants={itemVariants}
          className="uppercase tracking-[0.3em] text-rexos-accent text-xs md:text-sm mb-6 font-semibold"
        >
          {t.subtitle}
        </motion.p>

        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-8xl lg:text-9xl font-light tracking-wider mb-4 flex flex-wrap justify-center gap-x-5">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.25 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.h2
          variants={itemVariants}
          className="font-[family-name:var(--font-cormorant)] text-2xl md:text-4xl italic text-rexos-text/80 mb-6"
        >
          {t.tagline}
        </motion.h2>

        {/* ornamental mark — same signature divider used on the menu
            page, so the two screens read as one identity */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 w-36 mb-12">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rexos-accent/60" />
          <span className="w-1.5 h-1.5 rotate-45 bg-rexos-accent" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rexos-accent/60" />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 items-center">
          <Link
            href="/menu"
            className="group relative px-8 py-4 border border-rexos-accent/30 bg-rexos-accent/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-rexos-accent hover:bg-rexos-accent text-rexos-text hover:text-rexos-primary uppercase tracking-widest text-xs"
          >
            {/* shimmer sweep, matching the menu page CTA language */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">{t.explore}</span>
          </Link>

          <a href="https://wa.me/970597600024" target="_blank" rel="noreferrer" className="px-8 py-4 bg-rexos-accent text-rexos-primary uppercase tracking-widest text-xs font-semibold transition hover:bg-rexos-text">
            {t.whatsapp}
          </a>
          <Link
            href="/contact"
            className="group px-8 py-4 text-rexos-text uppercase tracking-widest text-xs transition-colors hover:text-rexos-accent flex items-center gap-2"
          >
            {t.discover}
            <div
              className={`h-[1px] w-12 bg-rexos-accent/50 scale-x-[0.67] group-hover:scale-x-100 group-hover:bg-rexos-accent transition-transform duration-300 ease-out ${
                isRtl ? "origin-right" : "origin-left"
              }`}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll cue — quiet, single moving element rather than a
          generic bouncing chevron; ties directly to the page's act
          of scrolling rather than decorating for its own sake */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="uppercase tracking-[0.3em] text-[10px] text-rexos-text/50">
          {isRtl ? "مرر للأسفل" : "Scroll"}
        </span>
        <div className="w-px h-10 bg-rexos-text/20 overflow-hidden relative">
          <motion.span
            className="absolute top-0 left-0 w-full h-1/2 bg-rexos-accent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
