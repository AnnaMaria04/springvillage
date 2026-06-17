"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tiles = [
  { title: "Финский родник", sub: "Питьевая вода на территории", photo: "/images/territory-spring.jpg" },
  { title: "Пирс и водная станция", sub: "Лодки, SUP, рыбалка", photo: "/images/territory-pier.jpg" },
  { title: "Мангальная зона", sub: "Дрова и решётка включены", photo: "/images/territory-bbq.jpg" },
  { title: "Лесные тропы", sub: "Грибы, ягоды, сосновый лес", photo: "/images/territory-forest.jpg" },
];

export function TerritoryPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const visibleCount = 3;
  const maxIdx = tiles.length - visibleCount; // 1

  const go = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const newIdx = dir === "next" ? Math.min(maxIdx, idx + 1) : Math.max(0, idx - 1);
    setIdx(newIdx);
    const card = el.children[newIdx] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  };

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
            disabled={idx === 0}
            aria-label="Назад"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden"
          >
            {tiles.map((t) => (
              <Link
                key={t.title}
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
            disabled={idx >= maxIdx}
            aria-label="Вперёд"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
