// Slim trust strip — numbers-forward, no icon grid clutter

import { SITE } from "@/lib/data";

const items = [
  { value: `${SITE.totalCottages}`, label: "коттеджей" },
  { value: `${SITE.totalGuests}+`, label: "довольных гостей" },
  { value: `${SITE.rating}★`, label: "средний рейтинг" },
  { value: `${SITE.yearsOperating} лет`, label: "работаем" },
  { value: "15 мин", label: "время ответа" },
  { value: "48 ч", label: "бесплатная отмена" },
];

export function TrustBadges() {
  return (
    <section className="border-b border-[--border] bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-[--border]">
          {items.map((item) => (
            <div key={item.label} className="py-4 px-4 text-center">
              <div className="font-display text-xl sm:text-2xl font-bold text-[--foreground]">
                {item.value}
              </div>
              <div className="text-xs text-[--muted-foreground] mt-0.5 leading-tight">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
