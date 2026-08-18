"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

export default function FinalMessage() {
  const { finalMessage, couple } = siteConfig;

  return (
    <section className="relative z-10 px-6 pt-20 pb-16 sm:pt-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-5xl"
          aria-hidden
        >
          ❤️
        </motion.div>

        <h2 className="font-display mt-8 text-3xl leading-snug font-semibold text-rose-900 sm:text-4xl">
          {finalMessage.heading}
        </h2>
        <p className="mt-6 text-lg leading-8 text-rose-700/90">{finalMessage.message}</p>
        <p className="font-display mt-10 text-xl text-rose-500 italic">
          — {finalMessage.signature} —
        </p>

        <div className="mt-16 border-t border-rose-200/70 pt-8 text-sm text-rose-400">
          {couple.yourName} ❤️ {couple.partnerName} · Made with love
        </div>
      </Reveal>
    </section>
  );
}
