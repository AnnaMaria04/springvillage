"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";

import { CONTACT } from "@/content/site";
import { useBooking } from "@/context/booking-context";


const SLIDES = [
  {
    image: "/images/exterior/exterior-winter-snow.jpg",
    position: "center 60%",
    label: "A-frame коттедж",
    title: "Тихая вода,\nкарельский лес",
    subtitle: "Частный A-frame на берегу Михалёвского озера. Два часа от Петербурга.",
    book: true as const,
  },
  {
    image: "/images/lake/cottage-pontoon-mist-1920.webp",
    position: "center 55%",
    label: "Новый понтон у коттеджа",
    title: "Новый понтон,\nлодка и SUP",
    subtitle: "Купание, рыбалка, SUP и прогулки на лодке — прямо с вашего берега.",
    book: false as const,
    href: "/dom#pontoon",
    ctaLabel: "О новом понтоне",
  },
  {
    image: "/images/exterior/exterior-night-glow.jpeg",
    position: "center 50%",
    label: "Вечер у коттеджа",
    title: "Огни в темноте\nкарельского леса",
    subtitle: "A-frame освещён, ужин готов, озеро в ста метрах. Именно так выглядит вечер здесь.",
    book: false as const,
    href: "/dom",
    ctaLabel: "О коттедже",
  },
  {
    image: "/images/territory/territory-spring-steps.jpeg",
    position: "center 40%",
    label: "Природа",
    title: "Сосновый лес\nи финский родник",
    subtitle: "Грибы, ягоды, лесные тропы. Полное единение с карельской природой.",
    book: false as const,
    href: "/aktivnosti/rodnik",
    ctaLabel: "О роднике",
  },
  {
    image: "/images/exterior/exterior-couple-window.jpg",
    position: "center 35%",
    label: "Коттедж WILD",
    title: "A-frame\nс мансардой",
    subtitle: "Два этажа, мансардные окна, дровяной камин — всё для полного уединения.",
    book: false as const,
    href: "/dom",
    ctaLabel: "О коттедже",
  },
  {
    image: "/images/interior/hero-fireplace.jpg",
    position: "center 40%",
    label: "Уют и комфорт",
    title: "Камин\nи панорамные окна",
    subtitle: "Дровяной камин, тёплые полы, панорамный вид на воду — всё для отдыха.",
    book: false as const,
    href: "/dom",
    ctaLabel: "О коттедже",
  },
  {
    image: "/images/territory/territory-glamping-tent.jpg",
    position: "center 40%",
    label: "Тур база рядом",
    title: "Тур база\nМихалёвское",
    subtitle: "В 1,5 км: 500 м берега с песчаным пляжем, кемпинг у воды, аренда лодок.",
    book: false as const,
    href: "/turbaza",
    ctaLabel: "Узнать подробнее",
  },
];

const AUTOPLAY_MS = 7000;

export function Hero() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const autoPlay = !paused && !reduceMotion;
  const { openBooking } = useBooking();

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => setCur((current) => (current + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [cur, autoPlay]);

  return (
    <section aria-label="Spring Village — отдых у озера" aria-roledescription="карусель" className="relative h-[100svh] min-h-[680px] md:min-h-[620px] overflow-hidden bg-[#0c110e]">
      <h1 className="sr-only">Spring Village — коттедж WILD у Михалёвского озера</h1>
      {/* Background images — cross-fade with Ken Burns zoom per slide */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== cur}
          inert={i !== cur}
          className={`absolute inset-0 overflow-hidden bg-[#0c110e] transition-opacity duration-700 ease-in-out ${
            i === cur ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Inner div remounts when slide activates, restarting the zoom animation */}
          <div
            key={i === cur ? `${i}-active` : i}
            className="absolute inset-0"
            style={{ animation: reduceMotion ? undefined : "hero-zoom 5s ease-out forwards" }}
          >
            {(i === 0 || i === cur || i === (cur + 1) % SLIDES.length) && (
              <Image
                src={slide.image}
                fill
                alt=""
                style={{ objectFit: "cover", objectPosition: slide.position }}
                preload={i === 0}
                sizes="100vw"
              />
            )}
          </div>
        </div>
      ))}

      {/* Dark scrim — strong at bottom where text lives, fades to top */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(12,18,14,0.96)_0%,rgba(12,18,14,0.75)_30%,rgba(12,18,14,0.35)_60%,transparent_100%)]" />

      {/* Top scrim — the transparent header sits here; without it the white
          wordmark washes out against bright slides (snow, sky) */}
      <div className="absolute inset-x-0 top-0 h-40 z-10 bg-[linear-gradient(to_bottom,rgba(12,18,14,0.55)_0%,rgba(12,18,14,0.25)_55%,transparent_100%)]" />

      {/* Slide content */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== cur}
          inert={i !== cur}
          onFocusCapture={() => setPaused(true)}
          className={`absolute inset-0 z-20 transition-opacity duration-700 ease-in-out ${
            i === cur ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-x-0 bottom-0">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-56 md:pb-20">
            <p className="text-white/70 text-[13px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
              {CONTACT.addressShort} · {slide.label}
            </p>
            <p className="font-display font-bold text-white leading-[0.93] tracking-tight mb-4" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}>
              {slide.title.split("\n").map((line, j, arr) => (
                <span key={j}>{line}{j < arr.length - 1 && <>{" "}<br className="hidden sm:block" /></>}</span>
              ))}
            </p>
            <p className="text-white/80 text-base leading-relaxed max-w-md mb-7" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {slide.book ? (
                <>
                  <button
                    onClick={() => openBooking()}
                    className="btn-lux h-14 px-10 rounded-full bg-wood text-white text-base font-semibold hover:bg-wood/90 inline-flex items-center cursor-pointer shadow-lg"
                  >
                    Забронировать
                  </button>
                  <Link href="/dom" className="text-white/80 hover:text-white text-sm font-medium link-underline py-2 px-1 -mx-1">
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
        </div>
      ))}

      {/* Dots — pushed above mobile booking bar */}
      <div className="absolute bottom-36 md:bottom-5 left-6 md:left-auto md:right-28 z-30 flex items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCur(i); setPaused(true); }}
            aria-pressed={i === cur}
            aria-label={`Слайд ${i + 1}`}
            className="flex items-center justify-center w-7 md:w-11 h-11 cursor-pointer focus-ring-sand"
          >
            <span className={`rounded-full transition-all duration-300 block ${
              i === cur ? "bg-white w-6 h-2" : "bg-white/50 w-2 h-2 hover:bg-white/70"
            }`} />
          </button>
        ))}
        <button type="button" aria-label={autoPlay ? "Остановить слайд-шоу" : "Включить слайд-шоу"} disabled={!!reduceMotion} onClick={() => setPaused(autoPlay)} className="w-10 h-11 ml-1 flex items-center justify-center text-white/80 hover:text-white cursor-pointer disabled:opacity-40 focus-ring-sand">
          {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
