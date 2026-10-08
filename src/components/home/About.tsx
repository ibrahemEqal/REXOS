"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function About() {
  const { language } = useLanguage();
  const t = translations[language].about;

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

const reduceMotion = useSyncExternalStore(
  (callback) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    mq.addEventListener("change", callback);

    return () => mq.removeEventListener("change", callback);
  },
  () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  () => false
);

  /* ---------- section-wide cursor spotlight (opulent, subtle) ---------- */
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotXSpring = useSpring(spotX, { stiffness: 60, damping: 20, mass: 0.5 });
  const spotYSpring = useSpring(spotY, { stiffness: 60, damping: 20, mass: 0.5 });

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  /* ---------- scroll-linked parallax for the hero image ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  /* ---------- pointer tilt for the hero image (editorial, restrained) ---------- */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 150, damping: 18 });

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(py * -10);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const textContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const textItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  // headline lines animate as independent masked reveals with a gold
  // sheen sweep — the section's one big signature move.
  const headlineLines = [
    { text: t.headline1, style: "" },
    { text: t.headline2, style: "italic text-rexos-text/50" },
    { text: t.headline3, style: "" },
  ];

  return (
    <section
      ref={sectionRef}
      id="discover"
      onMouseMove={handleSectionMouseMove}
      className="relative w-full bg-rexos-primary text-rexos-text py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* cursor-follow spotlight — extremely soft, reads as ambient
          light shifting rather than an obvious effect */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute w-[700px] h-[700px] rounded-full opacity-[0.05] z-0"
          style={{
            left: spotXSpring,
            top: spotYSpring,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, var(--rexos-accent, #D4AF37) 0%, transparent 70%)",
          }}
        />
      )}

      {/* giant serif watermark ampersand — a quiet piece of set
          dressing that nods to fine typography without competing
          with the real headline */}
      <motion.span
        aria-hidden
        style={reduceMotion ? undefined : { y: watermarkY }}
        className="pointer-events-none select-none absolute -top-10 md:-top-24 right-0 md:right-12 font-[family-name:var(--font-cormorant)] text-[220px] md:text-[420px] leading-none text-rexos-accent/[0.04] italic z-0"
      >
        &
      </motion.span>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-5 relative h-[60vh] md:h-[80vh] w-full"
          style={{ perspective: "1200px" }}
        >
          {/* corner brackets — draw themselves in around the frame,
              a fine-dining menu-card motif rather than a plain border */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((pos, i) => (
            <motion.span
              key={pos}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className={`absolute ${pos} w-10 h-10 border-rexos-accent/70 z-20 pointer-events-none`}
            />
          ))}

          <motion.div
            ref={imageRef}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={resetTilt}
            style={{
              rotateX: reduceMotion ? 0 : tiltXSpring,
              rotateY: reduceMotion ? 0 : tiltYSpring,
              transformStyle: "preserve-3d",
              y: reduceMotion ? undefined : imageParallaxY,
            }}
            className="absolute inset-0"
          >
            {/* curtain-wipe reveal on scroll-in */}
            <motion.div
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              whileInView={{ clipPath: "inset(0 0 0 0%)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-rexos-secondary/20 z-10" />
              <Image
                src="/dishes/hook.jpeg"
                alt="Chef preparing a luxurious dish"
                fill
                quality={80}
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover grayscale-[30%] contrast-125"
              />
              {/* faint gold cast over the image for cohesion with the palette */}
              <div className="absolute inset-0 bg-rexos-accent/[0.06] mix-blend-overlay" />
            </motion.div>

            {/* gold sweep that trails the curtain wipe, like a foil
                edge catching light as it opens */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "-120%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
              className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-rexos-accent/70 via-rexos-accent/20 to-transparent z-20 pointer-events-none"
            />
          </motion.div>
        </motion.div>

        <div className="hidden lg:block lg:col-span-1" />

        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-6 flex flex-col justify-center mt-8 lg:mt-32"
        >
          <motion.div variants={textItem} className="flex items-center gap-4 mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] w-12 bg-rexos-accent origin-left"
            />
            <span className="uppercase tracking-[0.2em] text-rexos-accent text-xs font-semibold">{t.tag}</span>
          </motion.div>

          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-12">
            {headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block relative ${line.style}`}
                >
                  {line.text}
                  {/* gold sheen sweeping across each line as it lands */}
                  <motion.span
                    initial={{ x: "-120%" }}
                    whileInView={{ x: "220%" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1, delay: 0.35 + 0.15 * i, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-rexos-accent/25 to-transparent skew-x-[-20deg] pointer-events-none"
                  />
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            variants={textItem}
            className="text-rexos-text/70 leading-relaxed max-w-lg mb-10 font-light text-sm md:text-base"
          >
            {t.desc}
          </motion.p>

          <motion.div
            variants={textItem}
            whileHover={reduceMotion ? undefined : { y: -6, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative w-full max-w-sm h-48 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          >
            {/* thin gold frame that tightens on hover, echoing the
                hero image's corner brackets at a smaller scale */}
            <div className="absolute -inset-2 border border-rexos-accent/0 hover:border-rexos-accent/40 transition-colors duration-500 pointer-events-none z-20" />
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop"
              alt="Culinary details"
              fill
              className="object-cover grayscale-[50%] brightness-75"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}