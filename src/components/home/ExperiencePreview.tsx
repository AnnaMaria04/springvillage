"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACTIVITIES } from "@/content/activities";

function scrollToCard(el: HTMLElement, card: HTMLElement, smooth: boolean) {
  const offset = el.scrollLeft + card.getBoundingClientRect().left - el.getBoundingClientRect().left;
  if (smooth) {
    el.scrollTo({ left: offset, behavior: "smooth" });
  } else {
    el.scrollLeft = offset;
  }
}

export function ExperiencePreview() {
  const items = ACTIVITIES.summer;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const go = useCallback((dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;

    const isWrap = (dir === "next" && idx === items.length - 1) ||
                   (dir === "prev" && idx === 0);
    const newIdx = dir === "next"
      ? (idx + 1) % items.length
      : (idx - 1 + items.length) % items.length;

    setIdx(newIdx);
    const card = el.children[newIdx] as HTMLElement | undefined;
    if (card) scrollToCard(el, card, !isWrap);
  }, [idx, items.length]);

  return (
    <section className="py-24 lg:py-32 bg-background overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Развлечения
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Озеро, лес и баня
            </h2>
          </div>
          <Link
            href="/aktivnosti"
            className="shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            Все активности <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => go("prev")}
            aria-label="Предыдущее"
            className="absolute left-0 lg:-translate-x-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-scroll scrollbar-hide">
            {items.map((a, i) => (
              <Link
                key={i}
                href={`/aktivnosti/${a.slug}`}
                className="group flex-none w-full lg:w-[calc((100%-2rem)/3)] block"
              >
                <div className="media relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <div
                    className="media-img absolute inset-0 bg-stone-300 bg-cover bg-center"
                    style={{ backgroundImage: `url('${a.photo}')` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(20,28,22,0.7),transparent)]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-display text-xl font-bold text-white leading-tight">{a.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => go("next")}
            aria-label="Следующее"
            className="absolute right-0 lg:translate-x-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
