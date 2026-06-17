import Link from "next/link";
import { ArrowRight } from "lucide-react";

const photos = [
  "/images/gallery-exterior.jpg",
  "/images/gallery-interior.jpg",
  "/images/gallery-lake.jpg",
];

export function GalleryPreview() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Галерея
          </h2>
          <Link
            href="/galereya"
            className="shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            Все фото <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Edge-to-edge photo row */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 sm:px-8 lg:px-12 pb-2">
        {photos.map((src, i) => (
          <Link
            key={i}
            href="/galereya"
            className="media group flex-none w-[78vw] sm:w-[46vw] lg:w-[32vw] aspect-[4/3] rounded-3xl"
          >
            <div
              className="media-img w-full h-full bg-stone-300 bg-cover bg-center"
              style={{ backgroundImage: `url('${src}')` }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
