export type MemoryAssetType = "sea" | "aquarium" | "dam" | "camera" | "island" | "dinner" | "shabu" | "chill" | "star" | "atv" | "temple" | "pagoda" | "cave" | "market" | "goldGift" | "bag" | "heart" | "bbq" | "nausea" | "sheep" | "cafe" | "movie" | "trip" | "flowers" | "home";

export type MemoryEntry = {
  id: string;
  title?: string;
  text?: string;
  emoji?: string;
  asset?: MemoryAssetType;
  image?: {
    src: string;
    alt: string;
  };
};

const MEMORY_IMAGE_COUNT = 26;

// ใช้ข้อความที่ผู้ใช้ส่งมาเพียงข้อความเดียวต่อรูป ไม่สร้างหัวข้อหรือคำบรรยายซ้ำ
const memoryDetails: Partial<Record<number, Pick<MemoryEntry, "text" | "emoji" | "asset">>> = {
  1: {
    text: "ไปเที่ยวทะเลด้วยกันครั้งเเรก",
    emoji: "🌊",
    asset: "sea",
  },
  2: {
    text: "ครบรอบ 1 เดือนไปเที่ยวอยุธยาด้วยกัน",
    emoji: "🛕",
    asset: "temple",
  },
  3: {
    text: "2 เดือนละรักเหมือนเดิม",
    emoji: "💗",
    asset: "heart",
  },
  4: {
    text: "BBQ จ้า",
    emoji: "🥓",
    asset: "bbq",
  },
  5: {
    text: "พาเเฟนไปถ่ายรูปกับดอกไม้",
    emoji: "🌷",
    asset: "flowers",
  },
  6: {
    text: "ขับรถขึ้นเขาใหญ่จะอ้วก",
    emoji: "🤢",
    asset: "nausea",
  },
  7: {
    text: "ให้อาหารเเกะ",
    emoji: "🐑",
    asset: "sheep",
  },
  8: {
    text: "ไหว้พระ ภูเขาทอง",
    emoji: "🛕",
    asset: "pagoda",
  },
  9: {
    text: "มุดถ้ำครั้งเเรกในชีวิต",
    emoji: "🕳️",
    asset: "cave",
  },
  10: {
    text: "ตลาดน้ำดำเนินสะดวก (เดินไม่ค่อยสะดวก)",
    emoji: "🛶",
    asset: "market",
  },
  11: {
    text: "ของขวัญให้เเฟนวันครบรอบ",
    emoji: "🎁",
    asset: "goldGift",
  },
  12: {
    text: "เเฟนซื้อให้จ้า",
    emoji: "👜",
    asset: "bag",
  },
  13: {
    text: "ไปพิพิธภัณฑ์สัตว์น้ำ",
    emoji: "🦈",
    asset: "aquarium",
  },
  14: {
    text: "ของโปรดเเฟน",
    emoji: "🥓",
    asset: "bbq",
  },
  15: {
    text: "วันชิวๆ",
    emoji: "💤",
    asset: "chill",
  },
  16: {
    text: "วันวาเลนไทน์",
    emoji: "⭐",
    asset: "star",
  },
  17: {
    text: "พาเเฟนไปเลอะ",
    emoji: "🏍️",
    asset: "atv",
  },
  18: {
    text: "เขื่อนวิวสวยมาก",
    emoji: "🌊",
    asset: "dam",
  },
  19: {
    text: "ถ่ายรูปสวยๆให้เเฟน",
    emoji: "📷",
    asset: "camera",
  },
  20: {
    text: "บางเเสน",
    emoji: "🌊",
    asset: "sea",
  },
  21: {
    text: "เเฟนอยากมา",
    emoji: "🛕",
    asset: "temple",
  },
  22: {
    text: "เกาะเกร็ด",
    emoji: "🏝️",
    asset: "island",
  },
  23: {
    text: "พาเเฟนไปกินข้าวกับพ่อเเม่",
    emoji: "🍽️",
    asset: "dinner",
  },
  24: {
    text: "เเดกไรไม่รู้เเฟนน่ารัก",
    emoji: "🍲",
    asset: "shabu",
  },
  25: {
    text: "พาเเฟนมาคาเฟ่กับครอบครับ",
    emoji: "☕",
    asset: "cafe",
  },
  26: {
    text: "Buffet with u is the best",
    emoji: "💗",
    asset: "heart",
  },
};

// รูปใน public/images/lv.3 ใช้ชื่อ memory-1.jpg, memory-2.jpg ... ตามลำดับ
// เมื่อนำรูปใหม่มาเพิ่ม ให้ตั้งชื่อเลขถัดไปและแก้ MEMORY_IMAGE_COUNT เท่านั้น
export const memories: readonly MemoryEntry[] = Array.from(
  { length: MEMORY_IMAGE_COUNT },
  (_, index) => {
    const memoryNumber = index + 1;
    const paddedNumber = String(memoryNumber).padStart(2, "0");
    const details = memoryDetails[memoryNumber];

    return {
      id: `memory-${paddedNumber}`,
      text: details?.text ?? "พื้นที่สำหรับข้อความอธิบายความทรงจำ — รอใส่ข้อความและของตกแต่ง",
      emoji: details?.emoji,
      asset: details?.asset,
      image: {
        src: `/images/lv.3/memory-${memoryNumber}.jpg`,
        alt: `ภาพความทรงจำของเรา ลำดับที่ ${memoryNumber}`,
      },
    };
  },
);
