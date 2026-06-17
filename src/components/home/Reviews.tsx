"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { CONTACT, SITE } from "@/content/site";

const TRANSITION_MS = 420;

// Extended for circular: [last-clone, ...REVIEWS, first-clone]
const extended = [REVIEWS[REVIEWS.length - 1], ...REVIEWS, REVIEWS[0]];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? "fill-wood text-wood" : "fill-border text-border"}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const busy = useRef(false);

  // Snap to first real card on mount (no animation)
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

    const extPos = idx + 1;
    const newExtPos = dir === "next" ? extPos + 1 : extPos - 1;

    const target = el.children[newExtPos] as HTMLElement | undefined;
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });

    setTimeout(() => {
      if (newExtPos === 0) {
        const realLast = el.children[REVIEWS.length] as HTMLElement | undefined;
        if (realLast) el.scrollLeft = realLast.offsetLeft;
        setIdx(REVIEWS.length - 1);
      } else if (newExtPos === extended.length - 1) {
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
    <section className="bg-cream py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Отзывы
            </p>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-5xl lg:text-6xl font-bold text-foreground leading-none">
                {SITE.rating}
              </span>
              <div>
                <Stars n={5} />
                <p className="text-sm text-muted-foreground mt-1.5">
                  {SITE.reviewCount} отзывов на Яндексе
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("prev")}
              aria-label="Предыдущий отзыв"
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => go("next")}
              aria-label="Следующий отзыв"
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            <a
              href={CONTACT.yandexOrgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
            >
              Все отзывы <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel — full width but cards are sized to max-w-7xl grid */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-scroll scrollbar-hide px-6 sm:px-8 lg:px-[max(3rem,calc((100vw-80rem)/2+3rem))] pb-2"
      >
        {extended.map((r, i) => (
          <div
            key={i}
            className="flex-none w-[85vw] sm:w-[60vw] lg:w-[calc(min(80rem,100vw)/3-2.5rem)] flex flex-col bg-white rounded-3xl border border-border p-8 hover:shadow-[0_16px_40px_-20px_rgba(30,35,31,0.18)] transition-shadow"
          >
            <Stars n={r.rating} />
            <p className="font-display text-xl text-foreground leading-snug mt-5 flex-1">
              «{r.body}»
            </p>
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pine flex items-center justify-center text-white text-sm font-semibold shrink-0">
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.author}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
