"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/feature-interior-window.jpeg", label: "Панорамное окно", wide: true, position: "center 50%" },
  { src: "/images/hero-fireplace.jpg", label: "Камин", position: "center 40%" },
  { src: "/images/interior-bedroom-loft.jpeg", label: "Спальня лофт", position: "center 40%" },
  { src: "/images/interior-staircase.jpeg", label: "Лестница", position: "center 30%" },
  { src: "/images/interior-bedroom-ground.jpeg", label: "Спальня", position: "center 50%" },
  { src: "/images/lifestyle-couple-loft.jpg", label: "Лофт", wide: true, position: "center 30%" },
];

export function DomGallery() {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[220px] lg:auto-rows-[260px]">
        {photos.map((p, i) => (
          <div
            key={i}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
              gridColumn: p.wide ? "span 2" : undefined,
              gridRow: p.wide ? "span 2" : undefined,
            }}
            onClick={() => setLightbox(i)}
          >
            <Image
              src={p.src}
              fill
              alt={p.label}
              style={{ objectFit: "cover", objectPosition: p.position }}
              className="transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <span className="absolute bottom-3 left-3 z-10 text-xs font-medium text-white/80 bg-black/25 rounded-full px-2.5 py-1 backdrop-blur-sm">
              {p.label}
            </span>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          className="animate-fade-in fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{ background: "rgba(12,17,14,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          onClick={close}
        >
          <div
            className="animate-lightbox relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full bg-stone-900 bg-cover bg-center"
              style={{ backgroundImage: `url('${photos[lightbox].src}')`, aspectRatio: "16/9" }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/65 to-transparent">
              <p className="text-white font-medium text-sm">{photos[lightbox].label}</p>
              <p className="text-white/45 text-xs mt-0.5">{lightbox + 1} / {photos.length}</p>
            </div>
          </div>

          <button onClick={close} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer" style={{ transition: "background-color 0.2s" }} aria-label="Закрыть">
            <X className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer" style={{ transition: "background-color 0.2s" }} aria-label="Предыдущее фото">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer" style={{ transition: "background-color 0.2s" }} aria-label="Следующее фото">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
