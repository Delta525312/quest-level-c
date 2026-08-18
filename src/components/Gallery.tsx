import AssetImage from "@/components/AssetImage";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site-config";

// มุมเอียงสลับกันให้ฟีลรูปโพลารอยด์แปะผนัง
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];

export default function Gallery() {
  const { gallery } = siteConfig;

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-3xl font-semibold text-rose-900 sm:text-4xl">
          {gallery.heading}
        </h2>
        <p className="mt-3 text-rose-500/90">{gallery.subheading}</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.photos.map((photo, i) => (
          <Reveal key={i} delay={(i % 3) * 0.12}>
            <figure
              className={`group rounded-xl bg-white p-3 pb-5 shadow-xl shadow-rose-100 transition-transform duration-300 hover:z-10 hover:scale-105 hover:rotate-0 ${tilts[i % tilts.length]}`}
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <AssetImage
                  src={photo.src}
                  alt={photo.caption}
                  placeholderLabel={`วางรูปที่ public/images/photo-${i + 1}.jpg`}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <figcaption className="font-display mt-4 text-center text-sm text-rose-600 italic">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
