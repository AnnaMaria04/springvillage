"use client";

import { Gift, TrendingDown } from "lucide-react";
import { PRICE_TIERS, GIFT_CERT } from "@/content/offers";
import { SITE } from "@/content/site";
import { BnovoWidget } from "@/components/booking/BnovoWidget";
import { BookingModal } from "@/components/booking/BookingModal";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function Pricing() {
  return (
    <section id="pricing" className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              Бронирование
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
              Цены
            </h2>
            <p className="text-[--muted-foreground] max-w-md mx-auto">
              {SITE.priceFromLabel} · чем дольше, тем дешевле за сутки
            </p>
          </div>
        </FadeIn>

        {/* Pricing table */}
        <FadeIn delay={0.05}>
          <div className="mb-10 rounded-2xl border border-[--border] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-[--muted] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[--muted-foreground]">
              <span>Пакет</span>
              <span className="text-right">Ночей</span>
              <span className="text-right">За ночь</span>
              <span className="text-right">Итого</span>
            </div>

            {PRICE_TIERS.map((tier, i) => (
              <div
                key={tier.label}
                className={cn(
                  "grid grid-cols-4 items-center px-5 py-4 border-t border-[--border] transition-colors",
                  tier.highlighted
                    ? "bg-[--pine] text-white"
                    : "bg-white hover:bg-[--muted]/40",
                  i === PRICE_TIERS.length - 1 && "rounded-b-2xl"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "font-display font-bold text-sm",
                        tier.highlighted ? "text-white" : "text-[--foreground]"
                      )}
                    >
                      {tier.label}
                    </div>
                    {tier.discount && (
                      <div
                        className={cn(
                          "text-xs font-semibold flex items-center gap-0.5",
                          tier.highlighted ? "text-[--wood]" : "text-[--accent]"
                        )}
                      >
                        <TrendingDown className="w-3 h-3" />
                        {tier.discount}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "text-right text-sm font-medium",
                    tier.highlighted ? "text-white/70" : "text-[--muted-foreground]"
                  )}
                >
                  {tier.nights}
                </div>

                <div
                  className={cn(
                    "text-right text-sm font-semibold",
                    tier.highlighted ? "text-[--wood]" : "text-[--foreground]"
                  )}
                >
                  {fmt(tier.perNight)} ₽
                </div>

                <div className="text-right">
                  <span
                    className={cn(
                      "font-display font-bold text-base",
                      tier.highlighted ? "text-white" : "text-[--foreground]"
                    )}
                  >
                    {fmt(tier.totalPrice)} ₽
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Book CTA + gift cert */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#booking-widget"
              className="flex-1 h-12 rounded-xl bg-[--primary] text-white text-sm font-semibold hover:bg-[--primary-light] transition-colors inline-flex items-center justify-center"
            >
              Выбрать даты в календаре
            </a>
            <BookingModal
              source="pricing_modal"
              trigger={
                <button className="flex-1 h-12 rounded-xl border border-[--border] text-[--foreground] text-sm font-semibold hover:bg-[--muted] transition-colors cursor-pointer">
                  Запросить бронирование
                </button>
              }
            />
          </div>
        </FadeIn>

        {/* Gift certificate */}
        <FadeIn delay={0.15}>
          <div className="mb-12 rounded-2xl border border-[--wood]/30 bg-[--wood]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[--wood]/15 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-[--wood]" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-[--foreground] mb-1">
                {GIFT_CERT.title}
              </h3>
              <p className="text-sm text-[--muted-foreground]">{GIFT_CERT.description}</p>
            </div>
            <BookingModal
              source="gift_cert"
              trigger={
                <button className="shrink-0 h-10 px-6 rounded-xl bg-[--wood] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                  {GIFT_CERT.cta}
                </button>
              }
            />
          </div>
        </FadeIn>

        {/* Bnovo booking widget */}
        <FadeIn>
          <div id="booking-widget" className="bg-white rounded-2xl border border-[--border] shadow-sm p-4 sm:p-8">
            <h3 className="font-display text-xl font-bold text-[--foreground] mb-6">
              Выбрать даты и забронировать
            </h3>
            <BnovoWidget />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
