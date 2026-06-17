"use client";

import { Gift, TrendingDown } from "lucide-react";
import { PRICE_TIERS, GIFT_CERT } from "@/content/offers";
import { BnovoWidget } from "@/components/booking/BnovoWidget";
import { BookingModal } from "@/components/booking/BookingModal";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function Pricing() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      {/* Pricing table */}
      <div className="rounded-3xl border border-[--border] overflow-hidden mb-8">
        <div className="grid grid-cols-4 bg-[--cream] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[--muted-foreground]">
          <span>Пакет</span>
          <span className="text-right">Ночей</span>
          <span className="text-right">За ночь</span>
          <span className="text-right">Итого</span>
        </div>
        {PRICE_TIERS.map((tier) => (
          <div
            key={tier.label}
            className={cn(
              "grid grid-cols-4 items-center px-5 py-4 border-t border-[--border]",
              tier.highlighted ? "bg-[--pine] text-white" : "bg-white"
            )}
          >
            <div>
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
            <div
              className={cn(
                "text-right text-sm",
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

      {/* Gift certificate — quiet line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-3xl border border-[--border] p-6 mb-14">
        <Gift className="w-6 h-6 text-[--wood] shrink-0" />
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-[--foreground] mb-1">{GIFT_CERT.title}</h3>
          <p className="text-sm text-[--muted-foreground]">{GIFT_CERT.description}</p>
        </div>
        <BookingModal
          source="gift_cert"
          trigger={
            <button className="shrink-0 h-10 px-6 rounded-full border border-[--foreground]/20 text-[--foreground] text-sm font-semibold hover:bg-[--cream] transition-colors cursor-pointer">
              {GIFT_CERT.cta}
            </button>
          }
        />
      </div>

      {/* Booking widget */}
      <div id="booking-widget">
        <h2 className="font-display text-2xl font-bold text-[--foreground] mb-6">
          Выбрать даты
        </h2>
        <div className="bg-white rounded-3xl border border-[--border] p-4 sm:p-8">
          <BnovoWidget />
        </div>
      </div>
    </section>
  );
}
