"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative w-full py-40 flex items-center justify-center bg-rexos-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rexos-secondary/20 via-rexos-primary to-rexos-primary" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="uppercase tracking-[0.3em] text-rexos-accent text-xs mb-8 font-semibold"
        >
          The Experience Awaits
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl text-rexos-text mb-12"
        >
          Your table is waiting.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Link 
            href="/contact"
            className="group relative inline-flex items-center justify-center px-10 py-5 border border-rexos-text/20 overflow-hidden transition-all duration-500 hover:border-rexos-accent hover:bg-rexos-accent/5 text-rexos-text uppercase tracking-[0.2em] text-xs"
          >
            <span className="relative z-10 group-hover:text-rexos-accent transition-colors duration-500">
              Contact Us
            </span>
            <div className="absolute inset-0 bg-rexos-accent/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}