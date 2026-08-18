import AssetImage from "@/components/AssetImage";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

export default function Timeline() {
  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-semibold text-rose-900 sm:text-4xl">
          Moment พิเศษของเรา
        </h2>
        <p className="mt-3 text-rose-500/90">เส้นทางความรักของเรา ทีละก้าว ทีละความทรงจำ</p>
      </Reveal>

      <div className="relative mx-auto mt-16 max-w-4xl">
        {/* เส้นกลาง timeline */}
        <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 sm:left-1/2" />

        <div className="space-y-14">
          {siteConfig.moments.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={i} delay={0.1}>
                <div
                  className={`relative flex flex-col gap-6 pl-12 sm:w-1/2 sm:pl-0 ${
                    isLeft ? "sm:mr-auto sm:pr-12" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  {/* จุดหัวใจบนเส้น */}
                  <span
                    className={`absolute top-2 left-4 z-10 -translate-x-1/2 text-xl ${
                      isLeft ? "sm:left-auto sm:-right-[0.05rem] sm:translate-x-1/2" : "sm:-left-[0.05rem] sm:-translate-x-1/2"
                    }`}
                    aria-hidden
                  >
                    💗
                  </span>

                  <div className="overflow-hidden rounded-3xl border border-rose-200/70 bg-white/80 shadow-lg shadow-rose-100 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                    <div className="aspect-[16/10]">
                      <AssetImage
                        src={m.image}
                        alt={m.title}
                        placeholderLabel={`วางรูปที่ public/images/moment-${i + 1}.jpg แล้วใส่ path ใน site-config.ts`}
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">
                        {m.date}
                      </span>
                      <h3 className="font-display mt-2 text-xl font-semibold text-rose-900">
                        {m.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-rose-700/90">{m.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
