import { CheckCircle } from "lucide-react";
import { PRICE_TIERS, SITE } from "@/lib/data";
import { BnovoWidget } from "@/components/booking/BnovoWidget";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Бронирование</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Цены и пакеты
          </h2>
          <p className="text-[--muted-foreground] max-w-md mx-auto">
            От{" "}
            <strong className="text-[--foreground]">{SITE.priceFrom.toLocaleString("ru-RU")} ₽</strong>{" "}
            за ночь. Без скрытых платежей.
          </p>
        </div>

        {/* Package tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {PRICE_TIERS.map((tier) => (
            <div
              key={tier.label}
              className={`rounded-2xl border p-6 flex flex-col ${
                tier.highlighted
                  ? "border-[--primary] bg-[--primary] text-white shadow-xl md:scale-105"
                  : "border-[--border] bg-white"
              }`}
            >
              <div className="mb-4">
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.highlighted ? "text-emerald-300" : "text-[--primary]"}`}>
                  {tier.nights}
                </div>
                <h3 className={`font-display text-2xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-[--foreground]"}`}>
                  {tier.label}
                </h3>
                {tier.discount && (
                  <div className={`text-lg font-semibold ${tier.highlighted ? "text-emerald-300" : "text-[--earth]"}`}>
                    {tier.discount}
                  </div>
                )}
              </div>
              <p className={`text-sm mb-5 leading-relaxed ${tier.highlighted ? "text-white/80" : "text-[--muted-foreground]"}`}>
                {tier.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-white/90" : "text-[--foreground]"}`}>
                    <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-emerald-300" : "text-[--primary]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={tier.highlighted ? "secondary" : "default"} className="w-full">
                <Link href="#booking-widget">Выбрать даты</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Bnovo booking widget */}
        <div id="booking-widget" className="bg-white rounded-2xl border border-[--border] shadow-sm p-4 sm:p-8">
          <h3 className="font-display text-xl font-bold text-[--foreground] mb-6">
            Выбрать даты и забронировать
          </h3>
          <BnovoWidget />
        </div>
      </div>
    </section>
  );
}
