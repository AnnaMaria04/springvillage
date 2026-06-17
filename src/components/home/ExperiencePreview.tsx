"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACTIVITIES } from "@/content/activities";

const GAP = 16;
const CLONES = 3;

function getCardsPerView(w: number): number {
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
}

export function ExperiencePreview() {
  const items = ACTIVITIES.summer;
  const N = items.length;
  const extended = [...items.slice(-CLONES), ...items, ...items.slice(0, CLONES)];

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [pos, setPos] = useState(CLONES);
  const [animated, setAnimated] = useState(true);
  const lockedRef = useRef(false);
  const firstMeasureRef = useRef(true);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setContainerW(e.contentRect.width);
      if (firstMeasureRef.current) {
        firstMeasureRef.current = false;
        setAnimated(false); // snap to correct position on first measurement, no slide-in animation
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cpv = getCardsPerView(containerW);
  const cardW = containerW > 0 ? (containerW - (cpv - 1) * GAP) / cpv : 0;
  const step = cardW + GAP;
  const trackX = containerW > 0 ? (containerW - cardW) / 2 - pos * step : 0;

  const go = useCallback((dir: "prev" | "next") => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setAnimated(true);
    setPos(p => p + (dir === "next" ? 1 : -1));
  }, []);

  function onTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    // Ignore transitionend bubbled up from inner card opacity/transform transitions
    if (e.target !== e.currentTarget) return;
    if (pos >= N + CLONES) {
      setAnimated(false);
      setPos(p => p - N);
    } else if (pos < CLONES) {
      setAnimated(false);
      setPos(p => p + N);
    } else {
      lockedRef.current = false;
    }
  }

  // Re-enable animation and unlock after the silent position snap
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true);
        lockedRef.current = false;
      }));
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
    <section className="py-24 lg:py-32 bg-background overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Развлечения
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Озеро и лес
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

          <div
            ref={containerRef}
            className={`overflow-hidden transition-opacity duration-300 ${containerW > 0 ? "opacity-100" : "opacity-0"}`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <div
              className="flex select-none"
              style={{
                gap: GAP,
                transform: containerW > 0 ? `translateX(${trackX}px)` : undefined,
                transition: animated && containerW > 0 ? "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {extended.map((a, i) => {
                return (
                  <Link
                    key={i}
                    href={`/aktivnosti/${a.slug}`}
                    className="group flex-none"
                    style={{ width: cardW > 0 ? cardW : undefined }}
                    draggable={false}
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
                );
              })}
            </div>
          </div>

          <button
            onClick={() => go("next")}
            aria-label="Следующее"
            className="absolute right-0 lg:translate-x-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-cream transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (lockedRef.current) return;
                lockedRef.current = true;
                setAnimated(true);
                setPos(CLONES + i);
              }}
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
