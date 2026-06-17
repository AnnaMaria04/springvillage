"use client";

import { CheckCircle, Gift } from "lucide-react";
import { PRICE_TIERS, GIFT_CERT } from "@/content/offers";
import { SITE } from "@/content/site";
import { BnovoWidget } from "@/components/booking/BnovoWidget";
import { BookingModal } from "@/components/booking/BookingModal";
import { FadeIn } from "@/components/ui/FadeIn";

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
              Цены и пакеты
            </h2>
            <p className="text-[--muted-foreground] max-w-md mx-auto">
              От{" "}
              <strong className="text-[--foreground]">
                {SITE.priceFrom.toLocaleString("ru-RU")} ₽
              </strong>{" "}
              за ночь. Без скрытых платежей.
            </p>
          </div>
        </FadeIn>

        {/* Package tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {PRICE_TIERS.map((tier, i) => (
            <FadeIn key={tier.label} delay={i * 0.1}>
              <div
                className={`rounded-2xl border p-6 flex flex-col h-full ${
                  tier.highlighted
                    ? "border-[--primary] bg-[--primary] text-white shadow-xl md:scale-105"
                    : "border-[--border] bg-white"
                }`}
              >
                <div className="mb-4">
                  <div
                    className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      tier.highlighted ? "text-[--wood]" : "text-[--primary]"
                    }`}
                  >
                    {tier.nights}
                  </div>
                  <h3
                    className={`font-display text-2xl font-bold mb-1 ${
                      tier.highlighted ? "text-white" : "text-[--foreground]"
                    }`}
                  >
                    {tier.label}
                  </h3>
                  {tier.discount && (
                    <div
                      className={`text-lg font-semibold ${
                        tier.highlighted ? "text-[--wood]" : "text-[--accent]"
                      }`}
                    >
                      {tier.discount}
                    </div>
                  )}
                </div>
                <p
                  className={`text-sm mb-5 leading-relaxed ${
                    tier.highlighted ? "text-white/80" : "text-[--muted-foreground]"
                  }`}
                >
                  {tier.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${
                        tier.highlighted ? "text-white/90" : "text-[--foreground]"
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tier.highlighted ? "text-[--wood]" : "text-[--primary]"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking-widget"
                  className={`w-full h-10 rounded-xl text-sm font-semibold transition-colors inline-flex items-center justify-center ${
                    tier.highlighted
                      ? "bg-white text-[--pine] hover:bg-white/90"
                      : "bg-[--primary] text-white hover:bg-[--primary-light]"
                  }`}
                >
                  Выбрать даты
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Gift certificate */}
        <FadeIn delay={0.2}>
          <div className="mb-10 rounded-2xl border border-[--wood]/30 bg-[--wood]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
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
                <button className="shrink-0 h-10 px-6 rounded-xl bg-[--wood] text-white text-sm font-semibold hover:bg-[--accent]/90 transition-colors cursor-pointer">
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
