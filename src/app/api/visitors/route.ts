import { createHmac } from "node:crypto";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VISITOR_SET_KEY = "quest-level-c:visitors";
const TOTAL_VISITORS_KEY = "total_visitors";
const VISITOR_DETAILS_KEY = "quest-level-c:visitor-details";

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Visitor storage is not configured");
  return new Redis({ url, token });
}

function getClientIp(request: Request) {
  return request.headers.get("x-real-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

function getDeviceInfo(userAgent: string) {
  const os = /Android/i.test(userAgent) ? "Android"
    : /iPhone|iPad|iPod/i.test(userAgent) ? "iOS"
      : /Windows/i.test(userAgent) ? "Windows"
        : /Mac OS X|Macintosh/i.test(userAgent) ? "macOS"
          : /Linux/i.test(userAgent) ? "Linux"
            : "Unknown";
  const browser = /Edg\//i.test(userAgent) ? "Edge"
    : /OPR\//i.test(userAgent) ? "Opera"
      : /Chrome\//i.test(userAgent) ? "Chrome"
        : /Firefox\//i.test(userAgent) ? "Firefox"
          : /Safari\//i.test(userAgent) ? "Safari"
            : "Unknown";
  return { os, browser };
}

async function updateVisitorStore(request: Request, visitorId: string) {
  const redis = getRedis();
  const ip = getClientIp(request);
  const secret = process.env.KV_REST_API_TOKEN!;
  const identity = ip === "unknown" ? visitorId : ip;
  const visitorHash = createHmac("sha256", secret).update(identity).digest("hex");
  const ipHash = createHmac("sha256", secret).update(ip).digest("hex");
  const userAgent = request.headers.get("user-agent") ?? "Unknown";
  const device = getDeviceInfo(userAgent);
  const now = new Date().toISOString();

  const isNew = await redis.sadd(VISITOR_SET_KEY, visitorHash);
  const existingDetails = isNew === 0
    ? await redis.hget<string>(VISITOR_DETAILS_KEY, visitorHash)
    : null;
  let firstSeen = now;

  if (existingDetails) {
    try {
      const parsed = JSON.parse(existingDetails) as { first_seen?: unknown };
      if (typeof parsed.first_seen === "string") firstSeen = parsed.first_seen;
    } catch {
      // Keep the current timestamp if legacy metadata is unreadable.
    }
  }

  let totalVisitors: number;

  if (isNew === 1) {
    totalVisitors = await redis.incr(TOTAL_VISITORS_KEY);
  } else {
    const savedTotal = await redis.get<number | string>(TOTAL_VISITORS_KEY);
    totalVisitors = Number(savedTotal);
    if (!Number.isFinite(totalVisitors)) {
      totalVisitors = await redis.scard(VISITOR_SET_KEY);
      await redis.set(TOTAL_VISITORS_KEY, totalVisitors);
    }
  }

  await redis.hset(VISITOR_DETAILS_KEY, {
    [visitorHash]: JSON.stringify({
      ip_hash: ipHash,
      os: device.os,
      browser: device.browser,
      country: request.headers.get("x-vercel-ip-country") ?? "Unknown",
      city: request.headers.get("x-vercel-ip-city") ?? "Unknown",
      first_seen: firstSeen,
      last_seen: now,
    }),
  });

  return { totalVisitors, isNew: isNew === 1 };
}

export async function POST(request: Request) {
  try {
    // body อาจมาไม่ครบถ้า request ถูก abort กลางทาง — ตอบ 400 แทนที่จะ crash เป็น 500
    let body: { visitorId?: unknown };
    try {
      body = await request.json() as { visitorId?: unknown };
    } catch {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }
    if (typeof body.visitorId !== "string" || !/^[a-zA-Z0-9-]{16,80}$/.test(body.visitorId)) {
      return Response.json({ error: "Invalid visitor id" }, { status: 400 });
    }

    const result = await updateVisitorStore(request, body.visitorId);
    return Response.json(
      { total_visitors: result.totalVisitors, is_new_visitor: result.isNew },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("Unable to update visitor count", error);
    return Response.json({ error: "Unable to update visitor count" }, { status: 500 });
  }
}
