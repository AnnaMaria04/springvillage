"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACTIVITIES } from "@/content/activities";

const TRANSITION_MS = 420;

export function ExperiencePreview() {
  const items = ACTIVITIES.summer;
  // Extended array: [last-clone, ...items, first-clone]
  const extended = [items[items.length - 1], ...items, items[0]];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const busy = useRef(false);

  // On mount: snap to position 1 (first real item), no animation
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
        const realLast = el.children[items.length] as HTMLElement | undefined;
        if (realLast) el.scrollLeft = realLast.offsetLeft;
        setIdx(items.length - 1);
      } else if (newExtPos === extended.length - 1) {
        const realFirst = el.children[1] as HTMLElement | undefined;
        if (realFirst) el.scrollLeft = realFirst.offsetLeft;
        setIdx(0);
      } else {
        setIdx(newExtPos - 1);
      }
      busy.current = false;
    }, TRANSITION_MS + 60);
  }, [idx, items.length, extended.length]);

  return (
    <section className="py-24 lg:py-32 bg-background">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-scroll scrollbar-hide"
          >
            {extended.map((a, i) => (
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
                  <h3 className="absolute bottom-6 left-6 right-6 font-display text-2xl font-bold text-white leading-tight">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => go("next")}
            aria-label="Следующее"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
