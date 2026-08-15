"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useBooking } from "@/context/booking-context";
import { track } from "@/lib/analytics";

/**
 * Three moments of a day at Spring Village.
 * Desktop layers the cards with pure CSS sticky positioning — the site's one
 * scroll-linked parallax moment belongs to CottageStory, so nothing competes
 * with it here.
 */
const DAY = [
  {
    id: "morning",
    label: "Утро",
    text: "Проснуться от света в мансардном окне и выйти к озеру с первым кофе.",
    image: "/images/lake/dock-morning-mist.jpg",
    alt: "Утренний туман над пирсом на Михалёвском озере",
  },
  {
    id: "day",
    label: "День",
    text: "Лодка, SUP, рыбалка и прогулка к финскому роднику — без поездок и расписаний.",
    image: "/images/lifestyle/lifestyle-couple-boat-lake.jpg",
    alt: "Прогулка на лодке по Михалёвскому озеру днём",
  },
  {
    id: "evening",
    label: "Вечер",
    text: "Ужин у огня, дровяной камин и полная тишина карельского леса.",
    image: "/images/exterior/exterior-night-glow.jpeg",
    alt: "Освещённый A-frame коттедж вечером в карельском лесу",
  },
];

function CardBody({ item }: { item: (typeof DAY)[number] }) {
  return (
    <>
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 70vw"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,18,14,0.9)_0%,rgba(12,18,14,0.45)_45%,rgba(12,18,14,0.1)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
        <p className="font-display text-3xl lg:text-5xl font-bold text-white leading-none mb-4">
          {item.label}
        </p>
        <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-lg">
          {item.text}
        </p>
      </div>
    </>
  );
}

export function DayStory() {
  const { openBooking } = useBooking();
  const endRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  // day_story_completed — once, when the third moment is reached
  useEffect(() => {
    const el = endRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !doneRef.current) {
          doneRef.current = true;
          track("day_story_completed");
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-background pt-16 lg:pt-24 pb-20 lg:pb-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Intro ── */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Один день вдали от города
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-[1.08] tracking-tight">
            Как проходит день в Spring Village.
          </h2>
        </div>

        {/* ── Desktop: gently layered sticky cards ── */}
        <div className="hidden lg:block">
          {DAY.map((item, i) => (
            <div
              key={item.id}
              className="sticky mb-6"
              style={{ top: `${104 + i * 20}px` }}
            >
              <article className="relative h-[70vh] rounded-3xl overflow-hidden">
                <CardBody item={item} />
              </article>
            </div>
          ))}
        </div>

        {/* ── Mobile: plain stacked cards, no pinning, no trapping ── */}
        <div className="lg:hidden space-y-5">
          {DAY.map((item) => (
            <article key={item.id} className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <CardBody item={item} />
            </article>
          ))}
        </div>

        {/* ── Route back into booking ── */}
        <div ref={endRef} className="mt-16 lg:mt-20 text-center">
          <h3 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-6">
            Выберите свои даты у озера.
          </h3>
          <button
            type="button"
            onClick={() => { track("stay_dates_clicked", { from: "day_story" }); openBooking(); }}
            className="btn-lux h-13 px-10 rounded-full bg-pine text-white text-base font-semibold hover:bg-pine/90 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            Проверить свободные даты
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
