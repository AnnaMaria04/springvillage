"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tiles = [
  { title: "Финский родник", sub: "Питьевая вода на территории", photo: "/images/territory-spring.jpg" },
  { title: "Пирс и водная станция", sub: "Лодки, SUP, рыбалка", photo: "/images/territory-pier.jpg" },
  { title: "Мангальная зона", sub: "Дрова и решётка включены", photo: "/images/territory-bbq.jpg" },
  { title: "Лесные тропы", sub: "Грибы, ягоды, сосновый лес", photo: "/images/territory-forest.jpg" },
];

// Extended array for infinite circular scroll: [last-clone, ...tiles, first-clone]
const extended = [tiles[tiles.length - 1], ...tiles, tiles[0]];

const TRANSITION_MS = 420;

export function TerritoryPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // idx tracks position in the *real* tiles array (0-based)
  const [idx, setIdx] = useState(0);
  const busy = useRef(false);

  // On mount: snap to position 1 in extended (first real tile), no animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[1] as HTMLElement | undefined;
    if (card) el.scrollLeft = card.offsetLeft;
  }, []);

  const go = useCallback((dir: "prev" | "next") => {
    if (busy.current) return;
    const el = scrollRef.current;
    if (!el) return;
    busy.current = true;

    // Current extended position = idx + 1
    const extPos = idx + 1;
    const newExtPos = dir === "next" ? extPos + 1 : extPos - 1;

    // Smooth scroll to the target (clone or real)
    const target = el.children[newExtPos] as HTMLElement | undefined;
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });

    setTimeout(() => {
      if (newExtPos === 0) {
        // Hit the last-clone — jump instantly to the real last tile
        const realLast = el.children[tiles.length] as HTMLElement | undefined;
        if (realLast) el.scrollLeft = realLast.offsetLeft;
        setIdx(tiles.length - 1);
      } else if (newExtPos === extended.length - 1) {
        // Hit the first-clone — jump instantly to the real first tile
        const realFirst = el.children[1] as HTMLElement | undefined;
        if (realFirst) el.scrollLeft = realFirst.offsetLeft;
        setIdx(0);
      } else {
        setIdx(newExtPos - 1);
      }
      busy.current = false;
    }, TRANSITION_MS + 60);
  }, [idx]);

  return (
    <section className="bg-background py-20 lg:py-28">
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
          <button
            onClick={() => go("prev")}
            aria-label="Назад"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-scroll scrollbar-hide"
          >
            {extended.map((t, i) => (
              <Link
                key={i}
                href="/dom"
                className="group flex-none w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] block"
              >
                <div className="media relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <div
                    className="media-img absolute inset-0 bg-stone-300 bg-cover bg-center"
                    style={{ backgroundImage: `url('${t.photo}')` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(20,28,22,0.65),transparent)]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-display text-lg font-bold text-white leading-tight">{t.title}</p>
                    <p className="text-white/70 text-xs mt-1">{t.sub}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => go("next")}
            aria-label="Вперёд"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
