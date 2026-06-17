"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { CONTACT, SITE } from "@/content/site";

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

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

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
              onClick={() => scroll("left")}
              aria-label="Предыдущий отзыв"
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Следующий отзыв"
              className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center hover:bg-background hover:border-foreground/20 transition-colors"
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

      {/* Scrollable row — bleeds to edges for peek effect */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pl-6 sm:pl-8 lg:pl-12 pr-6 pb-2"
      >
        {REVIEWS.map((r) => (
          <div
            key={r.author}
            className="flex-none w-[320px] sm:w-[380px] snap-start flex flex-col bg-white rounded-3xl border border-border p-8 hover:shadow-[0_16px_40px_-20px_rgba(30,35,31,0.18)] transition-shadow"
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

        {/* Ghost card — link to all reviews */}
        <a
          href={CONTACT.yandexOrgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none w-[220px] snap-start flex flex-col items-center justify-center bg-pine/5 border border-dashed border-pine/25 rounded-3xl p-8 text-center hover:bg-pine/10 transition-colors group"
        >
          <Star className="w-8 h-8 fill-wood text-wood mb-4" />
          <p className="font-display text-lg font-bold text-pine leading-tight mb-2">
            {SITE.reviewCount - REVIEWS.length}+ отзывов
          </p>
          <p className="text-xs text-muted-foreground">на Яндекс Картах</p>
          <ArrowRight className="w-4 h-4 text-pine mt-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
