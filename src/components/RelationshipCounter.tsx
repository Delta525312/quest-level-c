"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const RELATIONSHIP_START = new Date("2025-04-19T00:00:00+07:00");
const COUPLE_PHOTO = "/images/lv.1/IMG_9415.jpg";

type Duration = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EMPTY_DURATION: Duration = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function addUtcYears(date: Date, years: number) {
  const next = new Date(date);
  next.setUTCFullYear(next.getUTCFullYear() + years);
  return next;
}

function addUtcMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}

function getDuration(now: Date): Duration {
  if (now <= RELATIONSHIP_START) return EMPTY_DURATION;

  let years = now.getUTCFullYear() - RELATIONSHIP_START.getUTCFullYear();
  let cursor = addUtcYears(RELATIONSHIP_START, years);
  if (cursor > now) { years -= 1; cursor = addUtcYears(RELATIONSHIP_START, years); }

  let months = (now.getUTCFullYear() - cursor.getUTCFullYear()) * 12 + now.getUTCMonth() - cursor.getUTCMonth();
  let monthCursor = addUtcMonths(cursor, months);
  if (monthCursor > now) { months -= 1; monthCursor = addUtcMonths(cursor, months); }

  let remaining = now.getTime() - monthCursor.getTime();
  const days = Math.floor(remaining / 86_400_000); remaining %= 86_400_000;
  const hours = Math.floor(remaining / 3_600_000); remaining %= 3_600_000;
  const minutes = Math.floor(remaining / 60_000); remaining %= 60_000;
  const seconds = Math.floor(remaining / 1_000);

  return { years, months, days, hours, minutes, seconds };
}

const units: Array<{ key: keyof Duration; label: string; short: string }> = [
  { key: "years", label: "ปี", short: "YRS" },
  { key: "months", label: "เดือน", short: "MOS" },
  { key: "days", label: "วัน", short: "DAY" },
  { key: "hours", label: "ชั่วโมง", short: "HRS" },
  { key: "minutes", label: "นาที", short: "MIN" },
  { key: "seconds", label: "วินาที", short: "SEC" },
];

export default function RelationshipCounter() {
  const [duration, setDuration] = useState<Duration>(EMPTY_DURATION);

  useEffect(() => {
    const update = () => setDuration(getDuration(new Date()));
    const firstFrame = window.requestAnimationFrame(update);
    const timer = window.setInterval(update, 1_000);
    return () => { window.cancelAnimationFrame(firstFrame); window.clearInterval(timer); };
  }, []);

  return (
    <div className="scene counter-scene">
      <p className="quest-badge">LV.01 • OUR TIME</p>
      <h1>เราเป็นเเฟนกัน</h1>
      <p className="counter-date">เริ่มตั้งแต่ 19 เมษายน 2025 • และยังนับต่อไปทุกวินาที</p>

      <div className="counter-layout">
        <div className="calendar-photo-frame">
          <span className="frame-ring frame-ring--one" aria-hidden="true" />
          <span className="frame-ring frame-ring--two" aria-hidden="true" />
          <div className="calendar-photo-label"><span aria-hidden="true">♥</span> เจอกันวันแรก <span aria-hidden="true">♥</span></div>
          <div className="photo-window">
            {COUPLE_PHOTO ? (
              <Image className="calendar-memory-photo" src={COUPLE_PHOTO} alt="ภาพความทรงจำวันที่เราเจอกันวันแรก" fill sizes="(max-width: 760px) 82vw, 380px" />
            ) : (
              <div className="photo-placeholder">
                <span aria-hidden="true">19 ♥ 04</span>
                <strong>พื้นที่สำหรับรูปของเรา</strong>
                <small>วางรูปไว้ใน public/images แล้วใส่ path ที่ COUPLE_PHOTO</small>
              </div>
            )}
          </div>
          <div className="calendar-frame-footer"><span>APR</span><strong>19</strong><span>2025</span></div>
        </div>

        <div className="counter-console">
          <div className="time-grid" aria-label="ระยะเวลาที่เราคบกัน">
            {units.map((unit) => (
              <div className={`time-unit time-unit--${unit.key}`} key={unit.key}>
                <span className="time-short">{unit.short}</span>
                <strong suppressHydrationWarning>{String(duration[unit.key]).padStart(2, "0")}</strong>
                <span>{unit.label}</span>
              </div>
            ))}
          </div>
          <div className="live-strip"><i aria-hidden="true" />TIME IS RUNNING</div>
          <p>เวลาเดินไปข้างหน้าเสมอ อยู่ที่จะใช้มันทำอะไร กับ ใคร</p>
        </div>

        <Image className="timekeeper-bear" src="/images/pixel-timekeeper-bear.png" width={420} height={420} alt="หมีพิกเซลผู้ดูแลเวลา" />
      </div>
    </div>
  );
}
