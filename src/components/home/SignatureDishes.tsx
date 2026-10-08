"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const signatureDishesData = {
  en: [
    {
      id: 1,
      name: "Wagyu A5 Truffle",
      description:
        "Charcoal-grilled A5 Japanese Wagyu, black winter truffle, smoked bone marrow reduction.",
      price: "$185",
      image: "/dishes/wagyu.jpeg",
    },
    {
      id: 2,
      name: "Black Pearl Caviar",
      description:
        "Imperial Beluga Caviar, crème fraîche, cured egg yolk, gold leaf, house-made blinis.",
      price: "$240",
      image: "/dishes/caviar.jpeg",
    },
    {
      id: 3,
      name: "Midnight Cacao",
      description:
        "72% dark Valrhona chocolate, espresso caviar, toasted hazelnut, smoked vanilla bean ice cream.",
      price: "$45",
      image: "/dishes/cacao.jpeg",
    },
  ],

  ar: [
    {
      id: 1,
      name: "واغيو A5 بالترافل",
      description:
        "لحم واغيو ياباني A5 مشوي على الفحم، ترافل الشتاء الأسود، مع اختزال نخاع العظم المدخن.",
      price: "$185",
      image: "/dishes/wagyu.jpeg",
    },
    {
      id: 2,
      name: "كافيار اللؤلؤة السوداء",
      description:
        "كافيار بيلوجا إمبراطوري، كريم فريش، صفار بيض معتق، رقائق الذهب الخالص، وبليني محلي الصنع.",
      price: "$240",
      image: "/dishes/caviar.jpeg",
    },
    {
      id: 3,
      name: "كاكاو منتصف الليل",
      description:
        "شوكولاتة فالرونا الداكنة 72%، كافيار الإسبريسو، بندق محمص، وآيس كريم الفانيليا المدخنة.",
      price: "$45",
      image: "/dishes/cacao.jpeg",
    },
  ],
};

type Dish = (typeof signatureDishesData)["en"][number];

/* ---------------------------------------------------------
   Single dish card
--------------------------------------------------------- */

function DishCard({
  dish,
  isRtl,
  language,
  reduceMotion,
  index,
}: {
  dish: Dish;
  isRtl: boolean;
  language: "en" | "ar";
  reduceMotion: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);

  const rX = useSpring(rotateX, {
    stiffness: 160,
    damping: 18,
  });

  const rY = useSpring(rotateY, {
    stiffness: 160,
    damping: 18,
  });

  const iX = useSpring(imgX, {
    stiffness: 100,
    damping: 16,
  });

  const iY = useSpring(imgY, {
    stiffness: 100,
    damping: 16,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (reduceMotion) return;

    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const px =
      (e.clientX - rect.left) / rect.width - 0.5;

    const py =
      (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * 8);
    rotateX.set(py * -8);

    imgX.set(px * -14);
    imgY.set(py * -14);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    imgX.set(0);
    imgY.set(0);
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group cursor-pointer"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: reduceMotion ? 0 : rX,
          rotateY: reduceMotion ? 0 : rY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[60vh] md:h-[500px] w-full overflow-hidden mb-6 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-shadow duration-500"
      >
        {/* Corner brackets */}
        {[
          "top-4 left-4 border-t border-l",
          "top-4 right-4 border-t border-r",
          "bottom-4 left-4 border-b border-l",
          "bottom-4 right-4 border-b border-r",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute ${pos} w-8 h-8 border-rexos-accent/0 group-hover:border-rexos-accent/70 transition-all duration-500 z-20 pointer-events-none`}
          />
        ))}

        {/* Signature label */}
        <motion.div
          initial={{
            opacity: 0,
            x: isRtl ? 8 : -8,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3 + index * 0.1,
            duration: 0.5,
          }}
          className={`absolute top-4 ${
            isRtl ? "right-4" : "left-4"
          } z-20 bg-rexos-primary/80 backdrop-blur-md border border-rexos-accent/30 px-3 py-1.5 overflow-hidden`}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-rexos-accent/25 to-transparent" />

          <span className="relative uppercase tracking-[0.2em] text-rexos-accent text-[10px] font-semibold">
            {language === "ar" ? "طبق خاص" : "Signature"}
          </span>
        </motion.div>

        {/* Base overlay */}
        <div className="absolute inset-0 bg-rexos-primary z-10 opacity-10 group-hover:opacity-0 transition-opacity duration-500" />

        {/* Parallax image layer */}
        <motion.div
          style={{
            x: reduceMotion ? 0 : iX,
            y: reduceMotion ? 0 : iY,
            scale: 1.15,
          }}
          className="absolute inset-0"
        >
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            priority={index === 0}
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Dark hover overlay */}
        <div className="absolute inset-0 bg-rexos-primary/0 group-hover:bg-rexos-primary/30 transition-colors duration-500 z-10" />

        {/* Gold hover cast */}
        <div className="absolute inset-0 bg-rexos-accent/0 group-hover:bg-rexos-accent/[0.05] mix-blend-overlay transition-colors duration-500 z-10 pointer-events-none" />

        {/* Center reveal */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            animate={{}}
            className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out flex flex-col items-center gap-3"
          >
            <span className="w-12 h-12 rounded-full border border-rexos-accent/70 flex items-center justify-center bg-rexos-primary/40 backdrop-blur-sm">
              <Plus
                size={16}
                className="text-rexos-accent"
              />
            </span>

            <span className="uppercase tracking-[0.3em] text-[10px] text-rexos-text/80">
              {language === "ar"
                ? "عرض التفاصيل"
                : "View Dish"}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Dish information */}
      <div
        className="flex flex-col"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="relative font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-rexos-text group-hover:text-rexos-accent transition-colors duration-500">
            {dish.name}

            <span
              className={`absolute -bottom-1 ${
                isRtl ? "right-0" : "left-0"
              } h-px bg-rexos-accent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}
              style={{
                transformOrigin: isRtl
                  ? "right"
                  : "left",
              }}
            />
          </h3>

          <motion.span
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4 + index * 0.1,
              duration: 0.4,
              type: "spring",
              stiffness: 200,
            }}
            className="font-[family-name:var(--font-cormorant)] text-xl text-rexos-accent whitespace-nowrap"
          >
            {dish.price}
          </motion.span>
        </div>

        <p className="text-rexos-text/60 text-sm font-light leading-relaxed">
          {dish.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Signature Dishes Section
--------------------------------------------------------- */

export default function SignatureDishes() {
  const { language, isRtl } = useLanguage();

  const t = translations[language].signature;
  const dishes = signatureDishesData[language];

  /*
   * Reduced-motion preference
   *
   * Initial value is calculated during initialization instead
   * of calling setState synchronously inside useEffect.
   */
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  });

  /*
   * Listen for changes to the user's reduced-motion setting.
   */
  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const listener = () => {
      setReduceMotion(mq.matches);
    };

    mq.addEventListener("change", listener);

    return () => {
      mq.removeEventListener("change", listener);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section className="relative w-full bg-rexos-secondary py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Ambient diagonal gold hairlines */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-[-20%] opacity-[0.03] z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, var(--rexos-accent, #D4AF37) 0px, var(--rexos-accent, #D4AF37) 1px, transparent 1px, transparent 90px)",
          }}
          animate={{
            x: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{
              opacity: 0,
              x: isRtl ? 30 : -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-[1px] w-12 bg-rexos-accent origin-left"
              />

              <span className="uppercase tracking-[0.2em] text-rexos-accent text-xs font-semibold">
                {t.tag}
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl text-rexos-text">
              {t.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: isRtl ? -30 : 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <Link
              href="/menu"
              className="group uppercase tracking-widest text-xs text-rexos-text/70 hover:text-rexos-accent transition-colors flex items-center gap-2"
            >
              <motion.span
                whileHover={{
                  x: isRtl ? -3 : 3,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                {t.fullMenu}
              </motion.span>

              <div
                className={`h-[1px] w-12 bg-rexos-text/30 scale-x-[0.67] group-hover:scale-x-100 group-hover:bg-rexos-accent transition-transform duration-300 ease-out ${
                  isRtl
                    ? "origin-right"
                    : "origin-left"
                }`}
              />
            </Link>
          </motion.div>
        </div>

        {/* Dish grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {dishes.map((dish, index) => (
            <DishCard
              key={dish.id}
              dish={dish}
              isRtl={isRtl}
              language={language as "en" | "ar"}
              reduceMotion={reduceMotion}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}