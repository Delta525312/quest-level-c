/* eslint-disable @next/next/no-img-element */

type AssetImageProps = {
  src: string;
  alt: string;
  /** ข้อความบอกว่าให้วางไฟล์ชื่ออะไร เมื่อยังไม่มีรูป */
  placeholderLabel?: string;
  className?: string;
};

// แสดงรูปจริงถ้ามี src — ถ้ายังไม่มี แสดง placeholder สวยๆ พร้อมบอกตำแหน่งวางไฟล์
export default function AssetImage({ src, alt, placeholderLabel, className = "" }: AssetImageProps) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 ${className}`}
    >
      <span className="text-4xl" aria-hidden>
        📷
      </span>
      <p className="px-4 text-center text-xs font-medium tracking-wide text-rose-400">
        {placeholderLabel ?? "วางรูปที่ public/images/"}
      </p>
    </div>
  );
}
