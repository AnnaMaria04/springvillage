"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRICE_TIERS, type PriceTier } from "@/content/offers";
import { useBooking } from "@/context/booking-context";
import { track } from "@/lib/analytics";

/** Russian money formatting with a non-breaking space before ₽. */
function money(n: number) {
  return `${n.toLocaleString("ru-RU")} ₽`;
}

/** Savings read off the centralized tier data — never recomputed here. */
function savings(tier: PriceTier): string | null {
  if (!tier.discount) return null;
  const pct = tier.discount.replace(/\D/g, "");
  return pct ? `экономия ${pct}%` : null;
}

export function Deals() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);

  // stay_offer_viewed — once, when the ladder first enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          track("stay_offer_viewed");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function chooseTier(tier: PriceTier) {
    setSelected(tier.nightsCount);
    track("stay_offer_selected", { nights: tier.nightsCount, total: tier.totalPrice });
    track("booking_started_from_offer", { nights: tier.nightsCount });
    // Existing handler — carries the chosen length into the date step.
    openBooking({ nights: tier.nightsCount });
  }

  const rise = reduce ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section ref={sectionRef} className="bg-pine py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] gap-14 xl:gap-20">

          {/* ── Left: editorial column ── */}
          <div className="xl:pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wood mb-5">
              Лето 2026
            </p>
            <h2
              className="font-display font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Аренда с умом
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-5 max-w-md">
              Чем дольше вы остаётесь, тем спокойнее становится отдых — и ниже стоимость одной ночи.
            </p>
            <p className="text-white/50 leading-relaxed max-w-md">
              Выберите подходящую продолжительность. Даты и окончательная стоимость подтверждаются
              на следующем шаге.
            </p>
          </div>

          {/* ── Right: rate ladder ── */}
          <div>
            <ul className="border-t border-white/12">
              {PRICE_TIERS.map((tier, i) => {
                const isRec = tier.highlighted;
                const isSel = selected === tier.nightsCount;
                const save = savings(tier);
                const label = [
                  tier.nights,
                  money(tier.totalPrice),
                  `${money(tier.perNight)} за ночь`,
                  save,
                  isRec ? "оптимально для полного отдыха" : null,
                ].filter(Boolean).join(", ");

                return (
                  <motion.li
                    key={tier.nights}
                    {...rise}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={reduce ? undefined : { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/12"
                  >
                    <button
                      type="button"
                      onClick={() => chooseTier(tier)}
                      aria-label={`Выбрать: ${label}`}
                      aria-current={isSel ? "true" : undefined}
                      className={`group relative w-full text-left cursor-pointer transition-colors duration-300
                        px-4 py-6 sm:py-7 -mx-4
                        focus-visible:outline-2 focus-visible:outline-wood focus-visible:[outline-offset:-3px]
                        ${isSel ? "bg-wood/20" : isRec ? "bg-wood/[0.07] hover:bg-wood/15" : "hover:bg-white/[0.05]"}`}
                    >
                      {/* recommended edge — paired with the text label below, never colour alone */}
                      {isRec && (
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-0 bottom-0 w-[2px] bg-wood"
                        />
                      )}

                      {/* ── Mobile: two lines ── */}
                      <div className="lg:hidden">
                        {isRec && (
                          <p className="text-[11px] uppercase tracking-[0.18em] text-wood mb-2">
                            Оптимально для полного отдыха
                          </p>
                        )}
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-2xl font-bold text-white">{tier.nights}</span>
                          <span className="font-display text-2xl font-bold text-white whitespace-nowrap">
                            {money(tier.totalPrice)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-2">
                          <span className="text-white/55 text-sm">
                            {money(tier.perNight)}/ночь{save && ` · ${save}`}
                          </span>
                          <span aria-hidden="true" className="text-wood text-lg leading-none">→</span>
                        </div>
                      </div>

                      {/* ── Desktop: single editorial line ── */}
                      <div className="hidden lg:flex items-baseline gap-5">
                        <span className="min-w-[7rem]">
                          <span
                            className={`font-display font-bold text-white block leading-none ${
                              isRec ? "text-[2.1rem]" : "text-[1.8rem]"
                            }`}
                          >
                            {tier.nights}
                          </span>
                          {isRec && (
                            <span className="block text-[11px] uppercase tracking-[0.16em] text-wood mt-2">
                              Оптимально для полного отдыха
                            </span>
                          )}
                        </span>

                        <span className="font-display text-2xl font-bold text-white whitespace-nowrap min-w-[6.5rem]">
                          {money(tier.totalPrice)}
                        </span>

                        <span className="text-white/55 whitespace-nowrap">
                          {money(tier.perNight)} за ночь
                        </span>

                        {save && (
                          <span className={`text-sm whitespace-nowrap ${isRec ? "text-wood" : "text-white/45"}`}>
                            {save}
                          </span>
                        )}

                        <span className="ml-auto flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                          Выбрать
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* ── One dominant CTA ── */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => { track("stay_dates_clicked"); openBooking(); }}
                className="btn-lux h-13 px-10 rounded-full bg-white text-pine text-base font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-wood focus-visible:[outline-offset:3px]"
              >
                Выбрать даты
              </button>
              <p className="text-white/45 text-sm">
                Цена и наличие подтверждаются после выбора дат.
              </p>
            </div>

            {/* ── Family note — hairline, no card ── */}
            <div className="mt-12 pt-8 border-t border-white/12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-3">
                Семейный отдых
              </p>
              <p className="text-white/60 leading-relaxed max-w-xl">
                При размещении с двумя взрослыми до трёх детей не увеличивают стоимость.
                Доплата рассчитывается только за дополнительных взрослых.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
