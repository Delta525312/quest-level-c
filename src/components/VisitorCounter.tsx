"use client";

import { useEffect, useState } from "react";

const VISITOR_STORAGE_KEY = "quest-lv-c-visitor-id-v1";

function getVisitorId() {
  const savedId = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  if (savedId) return savedId;

  const visitorId = window.crypto.randomUUID();
  window.localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
  return visitorId;
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function registerVisitor() {
      try {
        const visitorId = getVisitorId();
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json() as { total_visitors?: unknown };
        if (typeof data.total_visitors === "number") setCount(data.total_visitors);
      } catch {
        // The counter stays unobtrusive when storage or the endpoint is unavailable.
      }
    }

    void registerVisitor();
    return () => controller.abort();
  }, []);

  return (
    <div className="visitor-counter" title="จำนวนผู้เข้าชมทั้งหมด โดยนับผู้ใช้เดิมเพียงครั้งเดียว">
      <span aria-hidden="true">♦</span>
      <small>VISITORS</small>
      <strong>{count ?? "--"}</strong>
    </div>
  );
}
