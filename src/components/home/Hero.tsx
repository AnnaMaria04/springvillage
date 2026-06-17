"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CONTACT } from "@/content/site";
import { BnovoModal } from "@/components/booking/BnovoModal";

const SLIDES = [
  {
    image: "/images/hero.jpg",
    label: "A-frame коттедж",
    title: "Тихая вода,\nкарельский лес",
    subtitle: "Частный A-frame на берегу Михалёвского озера. Два часа от Петербурга.",
    book: true as const,
  },
  {
    image: "/images/territory-pier.jpg",
    label: "Вода и активности",
    title: "Пирс, лодки\nи чистое озеро",
    subtitle: "Купание, рыбалка, SUP и прогулки на лодке — прямо с вашего берега.",
    book: false as const,
    href: "/aktivnosti",
    ctaLabel: "Все активности",
  },
  {
    image: "/images/territory-forest.jpg",
    label: "Природа",
    title: "Сосновый лес\nи финский родник",
    subtitle: "Грибы, ягоды, лесные тропы. Полное единение с карельской природой.",
    book: false as const,
    href: "/dom#territory",
    ctaLabel: "О территории",
  },
  {
    image: "/images/stay.jpg",
    label: "Уют и комфорт",
    title: "Камин, баня\nи панорамные окна",
    subtitle: "Дровяной камин, тёплые полы, финская баня у воды — всё для отдыха.",
    book: false as const,
    href: "/dom",
    ctaLabel: "О коттедже",
  },
  {
    image: "/images/territory-pier.jpg",
    label: "Новая Тур база",
    title: "Тур база\nМихалёвское",
    subtitle: "В 1.5 км: слип к озеру, аренда палаток у воды, аренда лодок и панорамные закаты.",
    book: false as const,
    href: "/kontakty",
    ctaLabel: "Узнать подробнее",
  },
];

const AUTOPLAY_MS = 4000;

export function Hero() {
  const [cur, setCur] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCur((c) => (c + 1) % SLIDES.length), AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cur, startTimer]);

  const go = (dir: "prev" | "next") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCur((c) =>
      dir === "next" ? (c + 1) % SLIDES.length : (c - 1 + SLIDES.length) % SLIDES.length
    );
  };

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden bg-pine">
      {/* Background images — cross-fade */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== cur}
          className={`absolute inset-0 bg-stone-700 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            i === cur ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        />
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
            <h1
              className="font-display font-bold text-white leading-[0.93] tracking-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
            >
              {slide.title.split("\n").map((line, j, arr) => (
                <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="text-white/65 text-base leading-relaxed max-w-md mb-7">
              {slide.subtitle}
            </p>
            <div className="flex items-center gap-5">
              {slide.book ? (
                <>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-lux h-12 px-8 rounded-full bg-white text-pine text-sm font-semibold hover:bg-white/90 cursor-pointer"
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

      <BnovoModal open={modalOpen} onOpenChange={setModalOpen} />

      {/* Arrows */}
      <button
        onClick={() => go("prev")}
        aria-label="Предыдущий слайд"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/15 hover:bg-white/28 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => go("next")}
        aria-label="Следующий слайд"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/15 hover:bg-white/28 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-30 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); setCur(i); }}
            aria-label={`Слайд ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === cur ? "bg-white w-6 h-2" : "bg-white/40 w-2 h-2 hover:bg-white/65"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
