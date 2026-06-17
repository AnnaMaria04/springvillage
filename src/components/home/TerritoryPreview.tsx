"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GAP = 16;
const CLONES = 3;

const tiles = [
  { title: "Финский родник", sub: "Питьевая вода на территории", photo: "/images/territory-spring.jpg" },
  { title: "Пирс и водная станция", sub: "Лодки, SUP, рыбалка", photo: "/images/territory-pier.jpg" },
  { title: "Мангальная зона", sub: "Дрова и решётка включены", photo: "/images/territory-bbq.jpg" },
  { title: "Лесные тропы", sub: "Грибы, ягоды, сосновый лес", photo: "/images/territory-forest.jpg" },
];

function getCardsPerView(w: number): number {
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
}

export function TerritoryPreview() {
  const N = tiles.length;
  const extended = [...tiles.slice(-CLONES), ...tiles, ...tiles.slice(0, CLONES)];

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [pos, setPos] = useState(CLONES);
  const [animated, setAnimated] = useState(true);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cpv = getCardsPerView(containerW);
  const cardW = containerW > 0 ? (containerW - (cpv - 1) * GAP) / cpv : 0;
  const step = cardW + GAP;
  const trackX = containerW > 0 ? (containerW - cardW) / 2 - pos * step : 0;

  const go = useCallback((dir: "prev" | "next") => {
    setAnimated(true);
    setPos(p => p + (dir === "next" ? 1 : -1));
  }, []);

  function onTransitionEnd() {
    if (pos >= N + CLONES) {
      setAnimated(false);
      setPos(p => p - N);
    } else if (pos < CLONES) {
      setAnimated(false);
      setPos(p => p + N);
    }
  }

  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(diff) > 48) go(diff < 0 ? "next" : "prev");
  }

  const realIdx = ((pos - CLONES) % N + N) % N;

  return (
    <section className="bg-background py-20 lg:py-28 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Территория
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Большой лесной участок
            </h2>
          </div>
          <Link
            href="/dom#territory"
            className="shrink-0 text-foreground font-medium link-underline inline-flex items-center gap-2"
          >
            Подробнее о коттедже
          </Link>
        </div>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => go("prev")}
            aria-label="Назад"
            className="absolute left-0 lg:-translate-x-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Clipping container */}
          <div
            ref={containerRef}
            className={`overflow-hidden transition-opacity duration-300 ${containerW > 0 ? "opacity-100" : "opacity-0"}`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {/* Sliding track */}
            <div
              className="flex select-none"
              style={{
                gap: GAP,
                transform: containerW > 0 ? `translateX(${trackX}px)` : undefined,
                transition: animated && containerW > 0 ? "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
                willChange: "transform",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {extended.map((t, i) => {
                const isActive = i === pos;
                return (
                  <Link
                    key={i}
                    href="/dom"
                    className="group flex-none"
                    style={{ width: cardW > 0 ? cardW : undefined }}
                    draggable={false}
                  >
                    <div
                      className="media relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500"
                      style={{
                        opacity: isActive ? 1 : 0.6,
                        transform: isActive ? "scale(1)" : "scale(0.94)",
                      }}
                    >
                      <div
                        className="media-img absolute inset-0 bg-stone-300 bg-cover bg-center"
                        style={{ backgroundImage: `url('${t.photo}')` }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(20,28,22,0.65),transparent)]" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="font-display text-xl font-bold text-white leading-tight">{t.title}</p>
                        <p className="text-white/65 text-sm mt-1">{t.sub}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go("next")}
            aria-label="Вперёд"
            className="absolute right-0 lg:translate-x-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {tiles.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimated(true); setPos(CLONES + i); }}
              aria-label={`Слайд ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === realIdx ? "bg-foreground w-6 h-2" : "bg-foreground/20 w-2 h-2 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
