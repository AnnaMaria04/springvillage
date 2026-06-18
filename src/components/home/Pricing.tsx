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
    <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      {/* Price list */}
      <div className="space-y-3 mb-16">
        {PRICE_TIERS.map((tier) => (
          <div
            key={tier.label}
            className={cn(
              "group flex items-center justify-between gap-6 rounded-2xl border px-6 py-6 sm:px-8 transition-all duration-300 hover:shadow-[0_18px_40px_-22px_rgba(30,35,31,0.35)]",
              tier.highlighted
                ? "border-wood bg-cream"
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
                  <span className="text-wood font-medium"> · экономия {tier.discount.replace("−", "")}</span>
                )}
              </p>
            </div>

            {/* Right: price */}
            <div className="text-right shrink-0">
              <div className="font-display text-2xl sm:text-3xl font-bold text-pine leading-none">
                {fmt(tier.totalPrice)} ₽
              </div>
              <div className="text-sm text-muted-foreground mt-2">{fmt(tier.perNight)} ₽ / ночь</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gift certificate — quiet line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-border bg-white p-6 mb-16">
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
      <div
        id="booking-widget"
        className="rounded-3xl border border-border bg-white p-8 sm:p-12 text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">Выбрать даты</h2>
        <p className="text-muted-foreground mb-8">
          Онлайн-бронирование с мгновенным подтверждением.
        </p>
        <button
          onClick={() => openBooking()}
          className="btn-lux h-13 px-10 rounded-full bg-pine text-white text-base font-semibold hover:bg-pine/90 transition-colors cursor-pointer"
        >
          Открыть календарь
        </button>
      </div>
    </section>
  );
}
