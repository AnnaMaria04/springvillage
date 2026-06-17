"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACTIVITIES } from "@/content/activities";

export function ExperiencePreview() {
  const items = ACTIVITIES.summer; // all 6 summer activities
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const visibleCount = 3;
  const maxIdx = items.length - visibleCount; // 3 on desktop

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

        {/* Carousel with side arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => go("prev")}
            disabled={idx === 0}
            aria-label="Предыдущее"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Cards viewport */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden"
          >
            {items.map((a) => (
              <Link
                key={a.slug}
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

          {/* Right arrow */}
          <button
            onClick={() => go("next")}
            disabled={idx >= maxIdx}
            aria-label="Следующее"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
