"use client";

import { Gift } from "lucide-react";
import { PRICE_TIERS, GIFT_CERT } from "@/content/offers";
import { BookingModal } from "@/components/booking/BookingModal";
import { cn } from "@/lib/utils";
import { useBooking } from "@/context/booking-context";

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function Pricing() {
  const { openBooking } = useBooking();
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      {/* Price list */}
      <div className="space-y-3 mb-16">
        {PRICE_TIERS.map((tier) => (
          <button
            key={tier.label}
            onClick={() => openBooking({ nights: tier.nightsCount })}
            className={cn(
              "group w-full flex items-center justify-between gap-6 rounded-3xl border px-6 py-6 sm:px-8 transition-all duration-300 hover:shadow-[0_18px_40px_-22px_rgba(30,35,31,0.35)] cursor-pointer text-left",
              tier.highlighted
                ? "border-wood bg-cream hover:bg-wood/5"
                : "border-border bg-white hover:border-foreground/20"
            )}
          >
            {/* Left: package */}
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-none">
                  {tier.label}
                </h3>
                {tier.highlighted && (
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-wood bg-wood/12 rounded-full px-2.5 py-1">
                    Выгодно
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {tier.nights}
                {tier.discount && (
                  <span className="text-wood font-semibold"> · экономия {tier.discount.replace("−", "")}</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground/0 group-hover:text-muted-foreground transition-colors mt-1">
                Нажмите, чтобы выбрать этот пакет →
              </p>
            </div>

            {/* Right: price */}
            <div className="text-right shrink-0">
              <div className="font-display text-2xl sm:text-3xl font-bold text-pine leading-none">
                {fmt(tier.totalPrice)} ₽
              </div>
              <div className="text-sm text-muted-foreground mt-2">{fmt(tier.perNight)} ₽ / ночь</div>
            </div>
          </button>
        ))}
      </div>

      {/* Gift certificate — quiet line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-3xl border border-border bg-white p-6 mb-16">
        <Gift className="w-6 h-6 text-wood shrink-0" />
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-foreground mb-1">{GIFT_CERT.title}</h3>
          <p className="text-sm text-muted-foreground">{GIFT_CERT.description}</p>
        </div>
        <BookingModal
          source="gift_cert"
          trigger={
            <button className="btn-lux shrink-0 h-11 px-6 rounded-full border border-foreground/20 text-foreground text-sm font-semibold hover:bg-cream cursor-pointer">
              {GIFT_CERT.cta}
            </button>
          }
        />
      </div>

      {/* Booking CTA */}
      <div id="booking-widget" className="rounded-3xl border border-pine/20 bg-cream overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">

          {/* Left: info */}
          <div className="flex-1 p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Бронирование
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-pine mb-8">
              Выбрать даты
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-wood shrink-0" />
                <p className="text-foreground">
                  Оплата онлайн — картой или по безналичному счёту.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-wood shrink-0" />
                <p className="text-foreground font-medium">
                  Без предоплаты даты не фиксируются.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                <p className="text-muted-foreground text-sm">
                  Оплата на месте (терминал или чек) — только для продления или дополнительных услуг.
                </p>
              </li>
            </ul>
          </div>

          {/* Right: CTA */}
          <div className="lg:w-72 flex flex-col items-center justify-center gap-5 p-8 sm:p-10 lg:p-12 bg-pine/[0.04] border-t lg:border-t-0 lg:border-l border-pine/15">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-pine leading-none">
                от 16 667 ₽
              </p>
              <p className="text-sm text-muted-foreground mt-1">за ночь</p>
            </div>
            <button
              onClick={() => openBooking()}
              className="btn-lux w-full h-13 px-8 rounded-full bg-wood text-white text-base font-semibold hover:bg-wood/90 transition-colors cursor-pointer"
            >
              Забронировать
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Мгновенное подтверждение
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
