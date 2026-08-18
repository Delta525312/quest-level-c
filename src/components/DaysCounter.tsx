"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

function diffFromAnniversary(now: Date) {
  const { year, month, day } = siteConfig.couple.anniversaryDate;
  const start = new Date(year, month - 1, day);
  const ms = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(ms / 86_400_000));
  const hours = Math.max(0, Math.floor((ms % 86_400_000) / 3_600_000));
  const minutes = Math.max(0, Math.floor((ms % 3_600_000) / 60_000));
  const seconds = Math.max(0, Math.floor((ms % 60_000) / 1_000));
  return { days, hours, minutes, seconds };
}

export default function DaysCounter() {
  const [time, setTime] = useState<ReturnType<typeof diffFromAnniversary> | null>(null);

  useEffect(() => {
    const tick = () => setTime(diffFromAnniversary(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "วัน", value: time?.days },
    { label: "ชั่วโมง", value: time?.hours },
    { label: "นาที", value: time?.minutes },
    { label: "วินาที", value: time?.seconds },
  ];

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold text-rose-900 sm:text-4xl">
          เราคบกันมาแล้ว
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-3xl border border-rose-200/70 bg-white/70 p-6 shadow-lg shadow-rose-100 backdrop-blur"
            >
              <div className="font-display text-4xl font-bold text-rose-500 tabular-nums sm:text-5xl">
                {u.value ?? "–"}
              </div>
              <div className="mt-2 text-sm font-medium tracking-wide text-rose-400">{u.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-rose-500/90">…และจะนับต่อไปเรื่อยๆ ด้วยกันนะ 💞</p>
      </Reveal>
    </section>
  );
}
