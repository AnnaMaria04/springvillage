"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRICE_TIERS, type PriceTier } from "@/content/offers";
import { useBooking } from "@/context/booking-context";
import { track } from "@/lib/analytics";

/** Russian money formatting with a non-breaking space before ₽. */
function money(n: number) {
  return `${n.toLocaleString("ru-RU")} ₽`;
}

/** Savings read off the centralized tier data — never recomputed here. */
function savingsPct(tier: PriceTier): string | null {
  if (!tier.discount) return null;
  return tier.discount.replace(/\D/g, "") || null;
}

export function Deals() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);

  // stay_offer_viewed — once, when the offers first enter the viewport
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
    openBooking({ nights: tier.nightsCount });
  }

  const rise = reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section ref={sectionRef} className="bg-pine py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wood mb-5">
            Лето 2026
          </p>
          <h2
            className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Аренда с умом
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Чем дольше вы остаётесь, тем спокойнее становится отдых — и ниже стоимость одной ночи.
          </p>
        </div>

        {/* ── Offer tiles ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {PRICE_TIERS.map((tier, i) => {
            const isRec = tier.highlighted;
            const isSel = selected === tier.nightsCount;
            const pct = savingsPct(tier);
            const label = [
              tier.nights,
              money(tier.totalPrice),
              `${money(tier.perNight)} за ночь`,
              pct ? `экономия ${pct}%` : null,
              isRec ? "оптимально для полного отдыха" : null,
            ].filter(Boolean).join(", ");

            return (
              <motion.button
                key={tier.nights}
                type="button"
                onClick={() => chooseTier(tier)}
                aria-label={`Выбрать: ${label}`}
                aria-current={isSel ? "true" : undefined}
                {...rise}
                viewport={{ once: true, amount: 0.3 }}
                transition={reduce ? undefined : { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col text-left rounded-2xl p-5 sm:p-6 cursor-pointer
                  transition-[background-color,border-color,transform] duration-300
                  hover:-translate-y-1 motion-reduce:hover:translate-y-0
                  focus-ring-sand
                  ${
                    isSel
                      ? "bg-wood/25 border border-wood/70"
                      : isRec
                        ? "bg-wood/[0.12] border border-wood/45 hover:bg-wood/20"
                        : "bg-white/[0.055] border border-white/10 hover:bg-white/[0.1] hover:border-white/20"
                  }`}
              >
                <span className="font-display text-lg sm:text-xl font-bold text-white leading-none">
                  {tier.nights}
                </span>

                <span className="font-display text-[1.7rem] sm:text-3xl font-bold text-white leading-none mt-3 whitespace-nowrap">
                  {money(tier.totalPrice)}
                </span>

                <span className="text-white/50 text-sm mt-2.5 whitespace-nowrap">
                  {money(tier.perNight)}/ночь
                </span>

                {/* Savings — hairline + plain text instead of a pill */}
                {pct && (
                  <span className="mt-4 pt-3 border-t border-white/10 text-sm text-wood">
                    экономия {pct}%
                  </span>
                )}

                {/* Recommended label — text, never a badge or colour alone.
                    Sits last so nights/price align across every tile. */}
                {isRec && (
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-wood leading-tight mt-3">
                    Оптимально для полного отдыха
                  </span>
                )}

                {/* Quiet affordance on hover/focus — not repeated body copy */}
                <span
                  aria-hidden="true"
                  className="absolute right-5 bottom-5 text-wood opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  →
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── One dominant CTA ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => { track("stay_dates_clicked"); openBooking(); }}
            className="btn-lux h-13 px-12 rounded-full bg-white text-pine text-base font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center cursor-pointer focus-ring-sand"
          >
            Выбрать даты
          </button>
          <p className="text-white/45 text-sm text-center">
            Цена и наличие подтверждаются после выбора дат.
          </p>
        </div>

        {/* ── Family note ── */}
        <div className="mt-14 pt-8 border-t border-white/10 max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-3">
            Семейный отдых
          </p>
          <p className="text-white/60 leading-relaxed">
            При размещении с двумя взрослыми до трёх детей не увеличивают стоимость.
            Доплата рассчитывается только за дополнительных взрослых.
          </p>
        </div>

      </div>
    </section>
  );
}
