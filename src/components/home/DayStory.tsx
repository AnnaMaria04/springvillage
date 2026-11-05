"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useBooking } from "@/context/booking-context";
import { track } from "@/lib/analytics";

/**
 * Three moments of a day at Spring Village, told as a compact editorial
 * triptych — no pinning, no full-bleed photo stack, no scroll trapping.
 */
const DAY = [
  {
    id: "morning",
    time: "07:30",
    label: "Утро",
    text: "Проснуться от света в мансардном окне и выйти к озеру с первым кофе.",
    image: "/images/lake/dock-morning-mist.jpg",
    alt: "Утренний туман над пирсом на Михалёвском озере",
  },
  {
    id: "day",
    time: "13:00",
    label: "День",
    text: "Лодка, SUP, рыбалка и прогулка к финскому роднику — без поездок и расписаний.",
    image: "/images/lifestyle/lifestyle-couple-boat-lake.jpg",
    alt: "Прогулка на лодке по Михалёвскому озеру днём",
  },
  {
    id: "evening",
    time: "21:00",
    label: "Вечер",
    text: "Ужин у огня, дровяной камин и полная тишина карельского леса.",
    image: "/images/exterior/exterior-night-glow.jpeg",
    alt: "Освещённый A-frame коттедж вечером в карельском лесу",
  },
];

export function DayStory() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const endRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  // day_story_completed — once, when the closing CTA is reached
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

  const rise = reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section className="bg-background pt-16 lg:pt-24 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Intro ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Один день вдали от города
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-[1.1] tracking-tight">
              Как проходит день в Spring Village.
            </h2>
          </div>
        </div>

        {/* ── Triptych ── */}
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 border-t border-border pt-8">
          {DAY.map((item, i) => (
            <motion.li
              key={item.id}
              {...rise}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduce ? undefined : { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-wood tabular-nums">
                  {item.time}
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>

              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-2.5">
                {item.label}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* ── Route back into booking ── */}
        <div ref={endRef} className="mt-14 lg:mt-16 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            Выберите свои даты у озера.
          </h3>
          <button
            type="button"
            onClick={() => { track("stay_dates_clicked", { from: "day_story" }); openBooking(); }}
            className="btn-lux shrink-0 h-13 px-9 rounded-full bg-pine text-white text-base font-semibold hover:bg-pine/90 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Проверить свободные даты
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
