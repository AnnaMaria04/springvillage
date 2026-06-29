"use client";

import { PRICE_TIERS } from "@/content/offers";
import { useBooking } from "@/context/booking-context";

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function Deals() {
  const { openBooking } = useBooking();

  return (
    <>
      <section
        className="relative bg-pine bg-cover bg-center py-24 lg:py-32"
        style={{ backgroundImage: "url('/images/deals.jpg')" }}
      >
        <div className="absolute inset-0 bg-pine/80" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-300/25 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
              <span className="text-amber-200 text-[11px] font-semibold uppercase tracking-[0.2em]">Лето 2026</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-4">
              Специальные предложения
            </p>
            <h2
              className="font-display font-bold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Аренда с умом
            </h2>
            <p className="text-white/55 mt-3 text-lg">
              Чем дольше — тем дешевле за сутки
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
            {PRICE_TIERS.map((tier) => (
              <button
                key={tier.label}
                onClick={() => openBooking({ nights: tier.nightsCount })}
                className={`rounded-2xl border p-5 text-center cursor-pointer group card-hover block w-full text-left ${
                  tier.highlighted
                    ? "bg-wood/25 border-wood/60 hover:bg-wood/35"
                    : "bg-white/8 border-white/15 hover:bg-white/15"
                }`}
              >
                <p className="text-white/60 text-sm mb-2">{tier.nights}</p>
                <p className="font-display text-2xl font-bold text-white leading-none">
                  {fmt(tier.totalPrice)} ₽
                </p>
                <p className="text-white/55 text-sm mt-1.5">{fmt(tier.perNight)} ₽/ночь</p>
                {tier.discount && (
                  <span className="inline-block mt-2 text-[11px] font-semibold text-wood bg-wood/20 rounded-full px-2 py-0.5">
                    {tier.discount}
                  </span>
                )}
                <p className="text-white/0 group-hover:text-white/60 text-[10px] mt-2 transition-colors">
                  Нажмите, чтобы забронировать →
                </p>
              </button>
            ))}
          </div>

          {/* Family pricing note */}
          <p className="text-center text-white/50 text-sm mb-8">
            Семейный отдых: до 3 детей не увеличивают стоимость при 2 взрослых. Доплата только за каждого дополнительного взрослого.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => openBooking()}
              className="btn-lux h-13 px-12 rounded-full bg-white text-pine text-base font-semibold hover:bg-white/90 transition-colors uppercase tracking-wider inline-flex items-center cursor-pointer"
            >
              Выбрать даты
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
