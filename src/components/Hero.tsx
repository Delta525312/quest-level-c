"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";

export default function Hero() {
  const { couple, hero } = siteConfig;

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* พื้นหลัง: รูปคู่ (ถ้ามี) + gradient ทับให้อ่านตัวหนังสือง่าย */}
      {hero.backgroundImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 via-rose-100/70 to-rose-50/95" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100 via-pink-50 to-rose-50" />
      )}

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-6 rounded-full border border-rose-300/60 bg-white/60 px-5 py-2 text-sm font-medium tracking-[0.2em] text-rose-500 uppercase backdrop-blur"
        >
          ✦ {hero.badge} ✦
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display max-w-3xl text-5xl leading-tight font-semibold text-rose-950 sm:text-6xl md:text-7xl"
        >
          {hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-6 flex items-center gap-4 text-2xl font-medium text-rose-700 sm:text-3xl"
        >
          <span className="font-display italic">{couple.yourName}</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            aria-hidden
          >
            ❤️
          </motion.span>
          <span className="font-display italic">{couple.partnerName}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-6 max-w-xl text-base text-rose-600/90 sm:text-lg"
        >
          {hero.subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-rose-400"
      >
        <span className="text-xs tracking-widest">{hero.scrollHint}</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
