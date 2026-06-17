"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BnovoModal } from "@/components/booking/BnovoModal";
import { PRICE_TIERS } from "@/content/offers";

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

const INCLUDED = [
  "Постельное бельё и полотенца",
  "Wi-Fi и парковка",
  "Баня (1 раз в сутки)",
  "Байдарки и SUP (1 раз в день)",
  "Дрова для камина и мангала",
  "Велосипеды",
];

export function Deals() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-sand py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Цены и пакеты
            </p>
            <h2
              className="font-display font-bold text-foreground leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Аренда с умом
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Чем дольше — тем дешевле за сутки
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {PRICE_TIERS.map((tier) => (
              <button
                key={tier.label}
                onClick={() => setOpen(true)}
                className={`relative rounded-2xl border p-5 text-center cursor-pointer group card-hover text-left ${
                  tier.highlighted
                    ? "bg-pine border-pine text-white shadow-lg shadow-pine/25"
                    : "bg-white border-border hover:border-pine/30 hover:shadow-md"
                }`}
              >
                {tier.discount && (
                  <span className={`inline-block mb-2 text-[11px] font-semibold rounded-full px-2 py-0.5 ${
                    tier.highlighted
                      ? "bg-white/20 text-white"
                      : "bg-wood/15 text-wood"
                  }`}>
                    {tier.discount}
                  </span>
                )}
                {!tier.discount && <div className="mb-2 h-[22px]" />}
                <p className={`text-xs mb-1.5 ${tier.highlighted ? "text-white/60" : "text-muted-foreground"}`}>
                  {tier.nights}
                </p>
                <p className={`font-display text-2xl font-bold leading-none ${tier.highlighted ? "text-white" : "text-foreground"}`}>
                  {fmt(tier.totalPrice)} ₽
                </p>
                <p className={`text-xs mt-1.5 ${tier.highlighted ? "text-white/55" : "text-muted-foreground"}`}>
                  {fmt(tier.perNight)} ₽/ночь
                </p>
                <p className={`text-[10px] mt-2 transition-colors ${
                  tier.highlighted
                    ? "text-white/50 group-hover:text-white/75"
                    : "text-transparent group-hover:text-muted-foreground"
                }`}>
                  Нажмите, чтобы забронировать →
                </p>
              </button>
            ))}
          </div>

          {/* Included */}
          <div className="bg-white rounded-2xl border border-border p-6 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Что включено в любой пакет
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="w-3.5 h-3.5 text-moss shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="btn-lux h-13 px-12 rounded-full bg-pine text-white text-base font-semibold hover:bg-pine/90 transition-colors cursor-pointer uppercase tracking-wider"
            >
              Выбрать даты
            </button>
          </div>
        </div>
      </section>

      <BnovoModal open={open} onOpenChange={setOpen} />
    </>
  );
}
