"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const photos = [
  { src: "/images/IMG_DF41196D43C2-17.jpeg", label: "Луна над озером", wide: true },
  { src: "/images/IMG_DF41196D43C2-5.jpeg", label: "Коттедж осенью" },
  { src: "/images/IMG_DF41196D43C2-15.jpeg", label: "Территория у воды" },
  { src: "/images/IMG_DF41196D43C2-19.jpeg", label: "Лето на берегу", wide: true },
  { src: "/images/IMG_DF41196D43C2-18.jpeg", label: "Прогулка на лодке" },
  { src: "/images/IMG_DF41196D43C2-20.jpeg", label: "Собака на лодке" },
  { src: "/images/IMG_DF41196D43C2-7.jpeg", label: "Причал" },
  { src: "/images/IMG_DF41196D43C2-16.jpeg", label: "Рыбалка" },
  { src: "/images/IMG_DF41196D43C2-8.jpeg", label: "Белый гриб" },
  { src: "/images/IMG_DF41196D43C2-9.jpeg", label: "Брусника" },
  { src: "/images/IMG_DF41196D43C2-23.jpeg", label: "Сосновый лес" },
  { src: "/images/IMG_DF41196D43C2-22.jpeg", label: "Сад" },
  { src: "/images/IMG_DF41196D43C2-2.jpeg", label: "Осенний лес" },
  { src: "/images/7ebe738e-638e-4b81-87a5-2ed702b81da8.JPG", label: "Зима на причале" },
  { src: "/images/b3d82f36-945d-4490-8355-85017ec15cd8.JPG", label: "Тур база" },
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[220px] lg:auto-rows-[280px]">
          {photos.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="media group relative rounded-3xl overflow-hidden"
              style={{ gridColumn: p.wide ? "span 2" : undefined }}
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                className="object-cover object-center media-img"
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
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
            <div className="relative w-full bg-stone-900" style={{ aspectRatio: "16/9" }}>
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].label}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
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
