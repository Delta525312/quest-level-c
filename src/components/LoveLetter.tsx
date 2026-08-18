import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

export default function LoveLetter() {
  const { loveLetter } = siteConfig;

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl">
        <div className="relative rounded-[2rem] border border-rose-200/80 bg-[#fffaf7]/90 p-8 shadow-xl shadow-rose-100 backdrop-blur sm:p-12">
          {/* ตราประทับหัวจดหมาย */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-rose-400 px-6 py-2 text-sm font-semibold tracking-widest text-white shadow-lg shadow-rose-200">
            💌 LOVE LETTER
          </div>

          <h2 className="font-display mt-4 text-center text-2xl font-semibold text-rose-900 sm:text-3xl">
            {loveLetter.heading}
          </h2>

          <div className="mt-8 space-y-5 text-base leading-8 text-rose-800/90 sm:text-lg">
            {loveLetter.paragraphs.map((p, i) => (
              <p key={i} className="first-letter:text-2xl first-letter:font-semibold">
                {p}
              </p>
            ))}
          </div>

          <p className="font-display mt-10 text-right text-lg text-rose-500 italic">
            — {loveLetter.signature}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
