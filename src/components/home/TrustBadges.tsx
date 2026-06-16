import { ShieldCheck, CreditCard, Clock, RotateCcw, Star, Headphones } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Безопасное бронирование", sub: "Защита платежей" },
  { icon: CreditCard, label: "Без предоплаты", sub: "Платите при заезде" },
  { icon: RotateCcw, label: "Отмена за 48 часов", sub: "Бесплатно" },
  { icon: Clock, label: "Ответим за 15 минут", sub: "Ежедневно 9:00–21:00" },
  { icon: Star, label: "Рейтинг 4.9★", sub: "185+ реальных отзывов" },
  { icon: Headphones, label: "Поддержка 7/7", sub: "Всегда на связи" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-[--border] bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex flex-col items-center text-center gap-1.5">
                <Icon className="w-5 h-5 text-[--primary]" />
                <span className="text-xs font-semibold text-[--foreground] leading-tight">{badge.label}</span>
                <span className="text-xs text-[--muted-foreground] leading-tight">{badge.sub}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
