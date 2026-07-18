"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = { src: string; alt: string; pos?: string };

export function TurbazaGallery({ images }: { images: GalleryImage[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isOpen = openIdx !== null;

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-label="Открыть фото"
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
          >
            <Image
              src={img.src}
              fill
              alt={img.alt}
              style={{ objectFit: "cover", objectPosition: img.pos ?? "center 50%" }}
              className="transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-pine/0 group-hover:bg-pine/10 transition-colors" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={close}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(23,36,32,.92)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Предыдущее фото"
                className="absolute left-3 sm:left-6 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Следующее фото"
                className="absolute right-3 sm:right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <figure className="relative z-10 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[openIdx!].src}
              alt={images[openIdx!].alt}
              className="max-w-[92vw] max-h-[84vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
            />
            <figcaption className="text-center text-white/70 text-sm mt-3 max-w-[92vw] px-4">
              {images[openIdx!].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
