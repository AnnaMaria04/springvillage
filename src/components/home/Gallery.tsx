"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const photos = [
  // Exterior
  { src: "/images/exterior-frost-dawn.jpeg", label: "Рассвет зимой", wide: true, position: "center 50%" },
  { src: "/images/exterior-sunset-front.jpg", label: "Коттедж на закате", position: "center 50%" },
  { src: "/images/exterior-dusk-side.jpg", label: "Вечер", position: "center 50%" },
  { src: "/images/exterior-spring-front.jpg", label: "Весна", position: "center 50%" },
  { src: "/images/exterior-spring-back.jpg", label: "Задний фасад", position: "center 50%" },
  // Lifestyle
  { src: "/images/lifestyle-couple-loft.jpg", label: "Лофт", wide: true, position: "center 25%" },
  { src: "/images/lifestyle-couple-lake.jpg", label: "На озере", position: "center 20%" },
  { src: "/images/lifestyle-woman-dock.jpg", label: "На пирсе", position: "center 15%" },
  { src: "/images/lifestyle-couple-kiss-forest.jpg", label: "В лесу", position: "center 20%" },
  { src: "/images/lifestyle-couple-forest-walk.jpg", label: "Прогулка", position: "center 20%" },
  { src: "/images/lifestyle-couple-windows.jpg", label: "У окон", position: "center 20%" },
  { src: "/images/lifestyle-loft-bedroom.webp", label: "Спальня в лофте", position: "center 40%" },
  { src: "/images/lifestyle-couple-stone-path.jpg", label: "Тропа", position: "center 20%" },
  // Interior
  { src: "/images/feature-interior-window.jpeg", label: "Панорамное окно", wide: true, position: "center 50%" },
  { src: "/images/interior-bedroom-loft.jpeg", label: "Спальня лофт", position: "center 40%" },
  { src: "/images/interior-bedroom-ground.jpeg", label: "Спальня", position: "center 50%" },
  { src: "/images/interior-staircase.jpeg", label: "Лестница", position: "center 30%" },
  // Nature & territory
  { src: "/images/feature-lake-sunset.jpg", label: "Закат на озере", wide: true, position: "center 50%" },
  { src: "/images/lake-panorama-autumn.jpeg", label: "Озеро осенью", position: "center 50%" },
  { src: "/images/dock-morning-mist.jpg", label: "Утро на пирсе", position: "center 50%" },
  { src: "/images/feature-pond-spring.jpeg", label: "Родник", position: "center 40%" },
  { src: "/images/activity-boat-lake.jpeg", label: "На лодке", position: "center 50%" },
  { src: "/images/activity-forest-walk.jpg", label: "Лесная тропа", position: "center 30%" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    []
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % photos.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[260px] lg:auto-rows-[320px]">
          {photos.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="media group relative rounded-3xl overflow-hidden"
              style={{ gridColumn: p.wide ? "span 2" : undefined }}
            >
              <Image
                src={p.src}
                fill
                alt={p.label}
                style={{ objectFit: "cover", objectPosition: p.position }}
                className="transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 z-10 text-xs font-medium text-white/85 bg-black/30 rounded-full px-2.5 py-1 backdrop-blur-sm">
                {p.label}
              </span>
              <button
                onClick={() => setLightbox(i)}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
                aria-label={`Открыть фото: ${p.label}`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          className="animate-fade-in fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{
            background: "rgba(12,17,14,0.92)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={close}
        >
          {/* Panel */}
          <div
            className="animate-lightbox relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full bg-stone-900 bg-cover bg-center"
              style={{
                backgroundImage: `url('${photos[lightbox].src}')`,
                aspectRatio: "16/9",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/65 to-transparent">
              <p className="text-white font-medium text-sm">{photos[lightbox].label}</p>
              <p className="text-white/45 text-xs mt-0.5">
                {lightbox + 1} / {photos.length}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            style={{ transition: "background-color var(--dur-hover) var(--ease)" }}
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            style={{ transition: "background-color var(--dur-hover) var(--ease)" }}
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            style={{ transition: "background-color var(--dur-hover) var(--ease)" }}
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
