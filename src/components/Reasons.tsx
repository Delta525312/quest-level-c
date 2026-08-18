import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

export default function Reasons() {
  const { reasons } = siteConfig;

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-3xl font-semibold text-rose-900 sm:text-4xl">
          {reasons.heading}
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.items.map((reason, i) => (
          <Reveal key={i} delay={(i % 3) * 0.12}>
            <div className="group flex h-full flex-col gap-4 rounded-3xl border border-rose-200/70 bg-white/75 p-7 shadow-lg shadow-rose-100 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-200">
              <span className="font-display text-3xl font-bold text-rose-200 transition-colors group-hover:text-rose-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-7 text-rose-800/90">{reason}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
