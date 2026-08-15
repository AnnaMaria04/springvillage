"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACTIVITY_PANELS, type ActivityPanel } from "@/content/activity-panels";
import { track } from "@/lib/analytics";

/* ─────────────── shared bits ─────────────── */

/** Readability scrim. Decorative — never exposed to assistive tech. */
function Scrim() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,18,14,0.88)_0%,rgba(12,18,14,0.45)_45%,rgba(12,18,14,0.12)_100%)]"
    />
  );
}

/* ─────────────── desktop accordion ─────────────── */

function DesktopAccordion({ panels }: { panels: ActivityPanel[] }) {
  const [active, setActive] = useState(0);

  const open = useCallback((i: number, panel: ActivityPanel) => {
    setActive((prev) => {
      if (prev !== i) track("activity_opened", { id: panel.id, title: panel.title });
      return i;
    });
  }, []);

  return (
    <div className="hidden lg:flex gap-2.5 h-[clamp(26rem,58vh,36rem)]">
      {panels.map((p, i) => {
        const isActive = i === active;
        return (
          <Link
            key={p.id}
            href={p.href}
            onMouseEnter={() => open(i, p)}
            onFocus={() => open(i, p)}
            onClick={() => track("activity_link_clicked", { id: p.id, title: p.title })}
            aria-current={isActive ? "true" : undefined}
            style={{ flexGrow: isActive ? 3.4 : 1, flexBasis: 0, minWidth: 0 }}
            className="group relative overflow-hidden rounded-2xl transition-[flex-grow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none focus-ring-sand"
          >
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              style={{ objectFit: "cover", objectPosition: "center 50%" }}
              className={`transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
                isActive ? "scale-[1.03]" : "scale-100"
              }`}
              loading={i < 2 ? "eager" : "lazy"}
            />
            <Scrim />

            {/* Expanded content */}
            <div
              className={`absolute inset-x-0 bottom-0 p-7 transition-opacity duration-500 motion-reduce:transition-none ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {p.eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 mb-2.5">
                  {p.eyebrow}
                </p>
              )}
              <h3 className="font-display text-2xl xl:text-3xl font-bold text-white leading-tight mb-2.5">
                {p.title}
              </h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-sm mb-4">
                {p.shortDescription}
              </p>
              {p.includedInStay && (
                <p className="text-[11px] uppercase tracking-[0.18em] text-wood mb-4">
                  Включено в проживание
                </p>
              )}
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Подробнее
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
              </span>
            </div>

            {/* Collapsed label — horizontal, never rotated */}
            <div
              className={`absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300 motion-reduce:transition-none ${
                isActive ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <p className="font-display text-[15px] font-bold text-white leading-snug">
                {p.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ─────────────── mobile / tablet carousel ─────────────── */

function MobileCarousel({ panels }: { panels: ActivityPanel[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const step = useCallback(() => {
    const el = scroller.current;
    if (!el) return 0;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    return first.offsetWidth + gap;
  }, []);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    const s = step();
    if (!el || !s) return;
    const i = Math.round(el.scrollLeft / s);
    setIndex((prev) => {
      const next = Math.max(0, Math.min(panels.length - 1, i));
      if (next !== prev) track("activity_opened", { id: panels[next].id, title: panels[next].title });
      return next;
    });
  }, [panels, step]);

  function go(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: "smooth" });
  }

  return (
    <div className="lg:hidden">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:-mx-8 sm:px-8"
      >
        {panels.map((p, i) => (
          <article key={p.id} className="snap-center shrink-0 w-[85%] sm:w-[58%]">
            <Link
              href={p.href}
              onClick={() => track("activity_link_clicked", { id: p.id, title: p.title })}
              className="group block rounded-2xl overflow-hidden focus-visible:outline-2 focus-visible:outline-pine focus-visible:[outline-offset:3px]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 85vw, 58vw"
                  style={{ objectFit: "cover", objectPosition: "center 50%" }}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <Scrim />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  {p.eyebrow && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 mb-2">
                      {p.eyebrow}
                    </p>
                  )}
                  <h3 className="font-display text-xl font-bold text-white leading-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-3">
                    {p.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Controls sit left: the floating contact button owns the bottom-right */}
      <div className="flex items-center gap-4 mt-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Предыдущая активность"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground disabled:opacity-35 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === panels.length - 1}
            aria-label="Следующая активность"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground disabled:opacity-35 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
          {index + 1} / {panels.length}
        </p>
      </div>
    </div>
  );
}

/* ─────────────── public component ─────────────── */

/** Both layouts are CSS-gated, so server and client markup stay identical. */
export function ActivityAccordion({ panels = ACTIVITY_PANELS }: { panels?: ActivityPanel[] }) {
  return (
    <>
      <DesktopAccordion panels={panels} />
      <MobileCarousel panels={panels} />
    </>
  );
}
