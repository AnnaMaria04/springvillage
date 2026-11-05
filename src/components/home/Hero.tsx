"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useBooking } from "@/context/booking-context";

const SLIDES = [
  { image: "/images/exterior/exterior-winter-snow.jpg", position: "center 60%", label: "Коттедж WILD", title: "Тихая вода.\nКарельский лес.", subtitle: "Частный A-frame у Михалёвского озера. Свой берег, тепло камина и время для себя.", href: "/dom", cta: "О коттедже" },
  { image: "/images/lake/cottage-pontoon-morning-1920.webp", position: "center 60%", label: "Новый просторный понтон", title: "Больше места.\nБлиже к озеру.", subtitle: "У коттеджа WILD — новый, более просторный понтон. Для утреннего кофе, рыбалки и неспешных дней у воды.", href: "/dom#pontoon", cta: "О новом понтоне" },
  { image: "/images/interior/hero-fireplace.jpg", position: "center 40%", label: "Тепло вашего дома", title: "Никуда\nне спешить.", subtitle: "Две спальни, панорамные окна и дровяной камин. Всё, чтобы остаться подольше.", href: "/dom", cta: "Заглянуть в дом" },
];

export function Hero() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const { openBooking } = useBooking();
  const autoPlay = !paused && !reduceMotion;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => setCur((i) => (i + 1) % SLIDES.length), 8000);
    return () => clearTimeout(timer);
  }, [cur, autoPlay]);

  return (
    <section aria-label="Spring Village — отдых у озера" aria-roledescription="карусель" className="relative h-[100svh] min-h-[680px] md:min-h-[620px] max-h-[1100px] overflow-hidden bg-pine text-white">
      <h1 className="sr-only">Spring Village — коттедж WILD у Михалёвского озера</h1>
      {SLIDES.map((slide, i) => (
        <div key={slide.image} aria-hidden={i !== cur} inert={i !== cur} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${i === cur ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {(i === 0 || i === cur || i === (cur + 1) % SLIDES.length) && <Image src={slide.image} alt="" fill preload={i === 0} loading={i === 0 ? undefined : "lazy"} sizes="100vw" className="object-cover" style={{ objectPosition: slide.position }} />}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,16,0.4)_0%,rgba(10,22,16,0.05)_30%,rgba(10,22,16,0.78)_100%)]" />
          <div className="absolute inset-0 bg-black/25 md:bg-transparent" />
          <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-36 md:pb-28 lg:pb-36">
            <p className="text-white/80 text-[11px] sm:text-xs uppercase tracking-[0.24em] mb-6">Spring Village <span className="mx-2 text-white/50">/</span> {slide.label}</p>
            <p className="font-display font-medium text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.98] tracking-[-0.025em] whitespace-pre-line max-w-3xl">{slide.title}</p>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md mt-6 mb-8">{slide.subtitle}</p>
            <div onFocusCapture={() => setPaused(true)} className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={() => openBooking()} className="inline-flex items-center justify-center h-13 px-7 sm:px-9 bg-cream text-pine rounded-sm text-sm font-medium hover:bg-white transition-colors cursor-pointer">Выбрать даты</button>
              <Link href={slide.href} className="inline-flex items-center gap-2 text-white text-sm border-b border-white/40 hover:border-white py-3">{slide.cta}<ArrowUpRight className="w-4 h-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-[76px] md:bottom-8 inset-x-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-end justify-between gap-4">
        <p className="hidden lg:block text-white/70 text-xs tracking-[0.08em]">Михалёвское озеро <span className="mx-3">·</span> 127 км от Петербурга</p>
        <div className="flex items-center gap-0 md:gap-3 mr-16 md:mr-0 md:ml-auto shrink-0">
          <span className="hidden md:block shrink-0 whitespace-nowrap text-xs tabular-nums text-white/70 mr-2">0{cur + 1} / 03</span>
          {SLIDES.map((slide, i) => <button key={slide.image} type="button" aria-label={`Слайд ${i + 1}: ${slide.label}`} aria-pressed={i === cur} onClick={() => { setCur(i); setPaused(true); }} className="w-11 h-11 flex items-center justify-center cursor-pointer"><span className={`h-px w-9 transition-colors ${i === cur ? "bg-white" : "bg-white/35"}`} /></button>)}
          <button type="button" aria-label={autoPlay ? "Остановить слайд-шоу" : "Включить слайд-шоу"} aria-pressed={!autoPlay} onClick={() => setPaused(autoPlay)} disabled={!!reduceMotion} className="w-11 h-11 flex items-center justify-center border border-white/35 rounded-full cursor-pointer disabled:opacity-40">{autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}</button>
        </div>
      </div>
    </section>
  );
}
