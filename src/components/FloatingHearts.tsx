"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37 + 11) % 100,
        size: 14 + ((i * 13) % 22),
        duration: 12 + ((i * 7) % 14),
        delay: (i * 5) % 12,
        opacity: 0.25 + ((i * 3) % 4) / 10,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{ left: `${h.left}%`, fontSize: h.size, opacity: h.opacity }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh", x: [0, 22, -22, 0] }}
          transition={{
            y: { duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" },
            x: { duration: h.duration / 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {h.id % 3 === 0 ? "💗" : h.id % 3 === 1 ? "🤍" : "💕"}
        </motion.span>
      ))}
    </div>
  );
}
