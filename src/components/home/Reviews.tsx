"use client";

import { useRef, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { REVIEWS, type Review } from "@/content/reviews";
import { CONTACT, SITE } from "@/content/site";

function scrollToCard(el: HTMLElement, card: HTMLElement, smooth: boolean) {
  // offsetLeft is stable even mid-scroll-animation; getBoundingClientRect is not
  if (smooth) {
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  } else {
    el.scrollLeft = card.offsetLeft;
  }
}

const CLAMP_THRESHOLD = 200;

function ReviewCard({ r, expanded, onToggle }: { r: Review; expanded: boolean; onToggle: () => void }) {
  const isLong = r.body.length > CLAMP_THRESHOLD;

  return (
    <div className="flex-none w-[80vw] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] flex flex-col bg-white rounded-3xl border border-border p-8 card-hover" style={{ scrollSnapAlign: "start" }}>
      <Stars n={r.rating} />
      <div className="mt-5 flex-1 flex flex-col">
        <p className={`font-display text-xl text-foreground leading-snug${!expanded && isLong ? " line-clamp-4" : ""}`}>
          «{r.body}»
        </p>
        {isLong && (
          <button
            onClick={onToggle}
            className="mt-3 self-start text-sm font-medium text-pine hover:text-pine/70 transition-colors cursor-pointer"
          >
            {expanded ? "Свернуть" : "Читать полностью"}
          </button>
        )}
      </div>
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
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < n ? "fill-wood text-wood" : "fill-border text-border"}`} />
      ))}
    </div>
  );
}

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [allExpanded, setAllExpanded] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartScrollLeft = useRef(0);
  const isDraggingRef = useRef(false);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return; // native scroll handles touch
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    isDraggingRef.current = false;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (!isDraggingRef.current && Math.abs(diff) > 5) {
      isDraggingRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (isDraggingRef.current && scrollRef.current) {
      scrollRef.current.scrollLeft = dragStartScrollLeft.current - diff;
    }
  }

  function onPointerUp() {
    dragStartX.current = null;
    isDraggingRef.current = false;
  }

  function onPointerCancel() {
    dragStartX.current = null;
    isDraggingRef.current = false;
  }

  const go = useCallback((dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;

    const isWrap = (dir === "next" && idx === REVIEWS.length - 1) ||
                   (dir === "prev" && idx === 0);
    const newIdx = dir === "next"
      ? (idx + 1) % REVIEWS.length
      : (idx - 1 + REVIEWS.length) % REVIEWS.length;

    setIdx(newIdx);
    const card = el.children[newIdx] as HTMLElement | undefined;
    if (card) scrollToCard(el, card, !isWrap);
  }, [idx]);

  return (
    <section className="bg-cream py-20 lg:py-28 overflow-x-clip">
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

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-scroll scrollbar-hide px-6 sm:px-8 lg:px-12 pb-2 max-w-7xl mx-auto select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-x", scrollSnapType: "x proximity" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {REVIEWS.map((r, i) => (
          <ReviewCard key={i} r={r} expanded={allExpanded} onToggle={() => setAllExpanded(v => !v)} />
        ))}
      </div>
    </section>
  );
}
