import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VisitorStore = {
  version: 1;
  visitors: string[];
};

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "visitors.json");
const temporaryFile = path.join(dataDirectory, "visitors.tmp.json");
let writeQueue: Promise<void> = Promise.resolve();

async function readStore(): Promise<VisitorStore> {
  try {
    const content = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(content) as Partial<VisitorStore>;
    return {
      version: 1,
      visitors: Array.isArray(parsed.visitors) ? parsed.visitors.filter((value): value is string => typeof value === "string") : [],
    };
  } catch {
    return { version: 1, visitors: [] };
  }
}

async function saveStore(store: VisitorStore) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(temporaryFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await rename(temporaryFile, dataFile);
}

function updateVisitorStore(visitorId: string): Promise<number> {
  const operation = writeQueue.then(async () => {
    const store = await readStore();
    const visitorHash = createHash("sha256").update(visitorId).digest("hex");
    if (!store.visitors.includes(visitorHash)) {
      store.visitors.push(visitorHash);
      await saveStore(store);
    }
    return store.visitors.length;
  });

  writeQueue = operation.then(() => undefined, () => undefined);
  return operation;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { visitorId?: unknown };
    if (typeof body.visitorId !== "string" || !/^[a-zA-Z0-9-]{16,80}$/.test(body.visitorId)) {
      return Response.json({ error: "Invalid visitor id" }, { status: 400 });
    }

    const count = await updateVisitorStore(body.visitorId);
    return Response.json({ count }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Unable to update visitor count" }, { status: 500 });
  }
}
