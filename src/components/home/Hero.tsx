"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { CONTACT } from "@/content/site";
import { useBooking } from "@/context/booking-context";


const SLIDES = [
  {
    image: "/images/exterior-winter-snow.jpg",
    position: "center 60%",
    label: "A-frame коттедж",
    title: "Тихая вода,\nкарельский лес",
    subtitle: "Частный A-frame на берегу Михалёвского озера. Два часа от Петербурга.",
    book: true as const,
  },
  {
    image: "/images/feature-lake-sunset.jpg",
    position: "center 40%",
    label: "Вода и активности",
    title: "Пирс, лодки\nи чистое озеро",
    subtitle: "Купание, рыбалка, SUP и прогулки на лодке — прямо с вашего берега.",
    book: false as const,
    href: "/aktivnosti",
    ctaLabel: "Все активности",
  },
  {
    image: "/images/feature-pond-spring.jpeg",
    position: "center 50%",
    label: "Природа",
    title: "Сосновый лес\nи финский родник",
    subtitle: "Грибы, ягоды, лесные тропы. Полное единение с карельской природой.",
    book: false as const,
    href: "/dom#territory",
    ctaLabel: "О территории",
  },
  {
    image: "/images/hero-fireplace.jpg",
    position: "center 40%",
    label: "Уют и комфорт",
    title: "Камин\nи панорамные окна",
    subtitle: "Дровяной камин, тёплые полы, панорамный вид на воду — всё для отдыха.",
    book: false as const,
    href: "/dom",
    ctaLabel: "О коттедже",
  },
  {
    image: "/images/exterior-frost-dawn.jpeg",
    position: "center 60%",
    label: "Новая Тур база",
    title: "Тур база\nМихалёвское",
    subtitle: "В 1.5 км: слип к озеру, аренда палаток у воды, аренда лодок и панорамные закаты.",
    book: false as const,
    href: "/kontakty",
    ctaLabel: "Узнать подробнее",
  },
];

const AUTOPLAY_MS = 7000;

export function Hero() {
  const [cur, setCur] = useState(0);
  const [animTick, setAnimTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const t = setTimeout(() => setCur((c) => (c + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [cur]);

  // Increment animTick each time the active slide changes to restart the zoom animation
  useEffect(() => {
    setAnimTick(t => t + 1);
  }, [cur]);

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden bg-pine">
      {/* Background images — cross-fade with Ken Burns zoom per slide */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== cur}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-in-out ${
            i === cur ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Inner div remounts when slide activates, restarting the zoom animation */}
          <div
            key={i === cur ? `${i}-${animTick}` : i}
            className="absolute inset-0"
            style={{ animation: "hero-zoom 5s ease-out forwards" }}
          >
            <Image
              src={slide.image}
              fill
              alt={slide.label}
              style={{ objectFit: "cover", objectPosition: slide.position }}
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Dark scrim — only bottom half */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] z-10 bg-[linear-gradient(to_top,rgba(15,22,17,0.85),transparent)]" />

      {/* Slide content */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 z-20 flex items-end transition-opacity duration-700 ease-in-out ${
            i === cur ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 lg:pb-20">
            <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.22em] mb-3">
              {CONTACT.addressShort} · {slide.label}
            </p>
            {i === 0 ? (
              <h1
                className="font-display font-bold text-white leading-[0.93] tracking-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
              >
                {slide.title.split("\n").map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br className="hidden sm:block" />}</span>
                ))}
              </h1>
            ) : (
              <p
                className="font-display font-bold text-white leading-[0.93] tracking-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
              >
                {slide.title.split("\n").map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br className="hidden sm:block" />}</span>
                ))}
              </p>
            )}
            <p className="text-white/65 text-base leading-relaxed max-w-md mb-7">
              {slide.subtitle}
            </p>
            <div className="flex items-center gap-5">
              {slide.book ? (
                <>
                  <button
                    onClick={() => openBooking()}
                    className="btn-lux h-12 px-8 rounded-full bg-white text-pine text-sm font-semibold hover:bg-white/90 inline-flex items-center cursor-pointer"
                  >
                    Забронировать
                  </button>
                  <Link href="/dom" className="text-white/80 hover:text-white text-sm font-medium link-underline">
                    О коттедже
                  </Link>
                </>
              ) : (
                <Link
                  href={slide.href}
                  className="btn-lux h-12 px-8 rounded-full bg-white text-pine text-sm font-semibold hover:bg-white/90 inline-flex items-center"
                >
                  {slide.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-30 flex items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); setCur(i); }}
            aria-label={`Слайд ${i + 1}`}
            className="flex items-center justify-center w-11 h-11 cursor-pointer"
          >
            <span className={`rounded-full transition-all duration-300 block ${
              i === cur ? "bg-white w-6 h-2" : "bg-white/40 w-2 h-2 hover:bg-white/65"
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
