import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

export default function VideoSection() {
  const { video } = siteConfig;

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold text-rose-900 sm:text-4xl">
          {video.heading}
        </h2>
        <p className="mt-3 text-rose-500/90">{video.subheading}</p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-rose-200/70 bg-white/70 p-3 shadow-xl shadow-rose-100 backdrop-blur">
          <div className="aspect-video overflow-hidden rounded-2xl">
            {video.src ? (
              <video
                controls
                playsInline
                poster={video.poster || undefined}
                className="h-full w-full object-cover"
              >
                <source src={video.src} />
                เบราว์เซอร์ของคุณไม่รองรับวิดีโอ
              </video>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-2xl shadow-lg shadow-rose-200">
                  ▶️
                </span>
                <p className="px-6 text-center text-xs font-medium tracking-wide text-rose-400">
                  วางวิดีโอที่ public/videos/for-you.mp4 แล้วใส่ path ใน site-config.ts
                </p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
