import Link from "next/link";
import { ArrowRight } from "lucide-react";

const photos = [
  { src: "/images/gallery-exterior.jpg", label: "Коттедж снаружи" },
  { src: "/images/gallery-interior.jpg", label: "Гостиная" },
  { src: "/images/gallery-sauna.jpg",    label: "Баня у воды" },
  { src: "/images/gallery-lake.jpg",     label: "Вид на озеро" },
  { src: "/images/gallery-sunset.jpg",   label: "Закат с террасы" },
  { src: "/images/gallery-winter.jpg",   label: "Зима" },
];

type SlotProps = { src: string; label: string; className?: string };

function Slot({ src, label, className = "" }: SlotProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-stone-300 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
    >
      <span className="absolute bottom-3 left-3 text-xs font-medium text-white/70 bg-black/25 rounded-full px-2.5 py-1 backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="section-y bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              Фотогалерея
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
              Коттедж в деталях
            </h2>
          </div>
          <Link
            href="/dom"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-[--primary] hover:underline"
          >
            Все фото и описание <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid: 1 large + 5 small */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[440px] sm:h-[520px] lg:h-[580px]">
          <Slot {...photos[0]} className="col-span-2 row-span-2" />
          <Slot {...photos[1]} />
          <Slot {...photos[2]} />
          <Slot {...photos[3]} className="col-span-1" />
          {/* Overlay on last slot for "show all" CTA */}
          <div
            className="relative rounded-3xl overflow-hidden bg-stone-300 bg-cover bg-center"
            style={{ backgroundImage: `url('${photos[4].src}')` }}
          >
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white/70 bg-black/25 rounded-full px-2.5 py-1 backdrop-blur-sm">
              {photos[4].label}
            </span>
            <Link
              href="/dom"
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
            >
              <div className="text-center text-white">
                <div className="text-3xl font-bold font-display mb-1">+{photos.length - 4}</div>
                <div className="text-sm font-medium opacity-80">Смотреть все</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
