import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const seasons = [
  {
    name: "Межсезонье",
    months: "Ноябрь — Март",
    badge: null,
    color: "bg-[--muted]",
    prices: [
      { cottage: "Яблоневая", capacity: 4, weekday: 5000, weekend: 6500 },
      { cottage: "Липовая", capacity: 4, weekday: 6000, weekend: 7500 },
      { cottage: "Берёзовая", capacity: 6, weekday: 7500, weekend: 9000 },
      { cottage: "Сосновая", capacity: 8, weekday: 9000, weekend: 11000 },
      { cottage: "Кедровая", capacity: 10, weekday: 15000, weekend: 18000 },
      { cottage: "Дубовая", capacity: 12, weekday: 13000, weekend: 16000 },
    ],
  },
  {
    name: "Высокий сезон",
    months: "Апрель — Октябрь",
    badge: "Популярный",
    color: "bg-[--primary]",
    prices: [
      { cottage: "Яблоневая", capacity: 4, weekday: 6500, weekend: 8000 },
      { cottage: "Липовая", capacity: 4, weekday: 7500, weekend: 9500 },
      { cottage: "Берёзовая", capacity: 6, weekday: 10000, weekend: 12500 },
      { cottage: "Сосновая", capacity: 8, weekday: 12000, weekend: 15000 },
      { cottage: "Кедровая", capacity: 10, weekday: 22000, weekend: 27000 },
      { cottage: "Дубовая", capacity: 12, weekday: 18000, weekend: 22000 },
    ],
  },
];

const packages = [
  {
    name: "Выходные",
    duration: "2 ночи",
    description: "Пятница–воскресенье. Лучший способ перезагрузиться без длительного отпуска.",
    discount: "Цена как на сайте",
    features: ["Заезд в пятницу с 14:00", "Выезд в воскресенье до 14:00 (+2ч)", "Баня включена в стоимость", "Мангал и дрова"],
  },
  {
    name: "Неделя",
    duration: "7 ночей",
    description: "Полноценный загородный отпуск по специальной цене.",
    discount: "Скидка 15%",
    features: ["Проживание 7 ночей", "Безлимитная баня", "Корзина с продуктами при заезде", "Поздний выезд (до 16:00)", "Мангал и дрова"],
    highlighted: true,
  },
  {
    name: "Месяц",
    duration: "30+ ночей",
    description: "Для тех, кто хочет переехать за город на длительный срок.",
    discount: "Скидка 30%",
    features: ["Длительная аренда по договору", "Все коммунальные услуги включены", "Уборка 2 раза в неделю", "Персональный менеджер", "Гибкие условия"],
  },
];

export default function PricingPage() {
  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      {/* Header */}
      <div className="bg-[--muted] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Цены и пакеты
          </h1>
          <p className="text-[--muted-foreground] text-lg max-w-xl mx-auto">
            Прозрачные цены без скрытых платежей. Окончательная стоимость — то, что вы видите.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Seasonal prices */}
        {seasons.map((season) => (
          <div key={season.name}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[--foreground]">
                {season.name}
              </h2>
              <span className="text-[--muted-foreground] text-sm">{season.months}</span>
              {season.badge && <Badge>{season.badge}</Badge>}
            </div>

            <div className="overflow-x-auto rounded-xl border border-[--border]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[--muted] border-b border-[--border]">
                    <th className="text-left px-5 py-3 font-semibold text-[--foreground]">Коттедж</th>
                    <th className="text-center px-4 py-3 font-semibold text-[--foreground]">Гостей</th>
                    <th className="text-right px-5 py-3 font-semibold text-[--foreground]">Будни (Пн–Чт)</th>
                    <th className="text-right px-5 py-3 font-semibold text-[--foreground]">Выходные (Пт–Вс)</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--border] bg-white">
                  {season.prices.map((row) => (
                    <tr key={row.cottage} className="hover:bg-[--muted]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[--foreground]">
                        Коттедж «{row.cottage}»
                      </td>
                      <td className="px-4 py-4 text-center text-[--muted-foreground]">
                        до {row.capacity} чел.
                      </td>
                      <td className="px-5 py-4 text-right font-semibold">
                        {row.weekday.toLocaleString("ru-RU")} ₽
                      </td>
                      <td className="px-5 py-4 text-right font-semibold text-[--primary]">
                        {row.weekend.toLocaleString("ru-RU")} ₽
                      </td>
                      <td className="px-4 py-4">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/booking?cottage=${row.cottage.toLowerCase()}`}>
                            Бронь <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Packages */}
        <div>
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[--foreground] mb-3">
              Пакетные предложения
            </h2>
            <p className="text-[--muted-foreground] max-w-lg mx-auto">
              Специальные условия при бронировании от 2 ночей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  pkg.highlighted
                    ? "border-[--primary] bg-[--primary] text-white shadow-xl scale-105"
                    : "border-[--border] bg-white"
                }`}
              >
                <div className="mb-4">
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${pkg.highlighted ? "text-emerald-300" : "text-[--primary]"}`}>
                    {pkg.duration}
                  </div>
                  <h3 className={`font-serif text-2xl font-bold mb-1 ${pkg.highlighted ? "text-white" : "text-[--foreground]"}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-lg font-semibold ${pkg.highlighted ? "text-emerald-300" : "text-[--accent]"}`}>
                    {pkg.discount}
                  </div>
                </div>

                <p className={`text-sm mb-5 leading-relaxed ${pkg.highlighted ? "text-white/80" : "text-[--muted-foreground]"}`}>
                  {pkg.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${pkg.highlighted ? "text-white/90" : "text-[--foreground]"}`}>
                      <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.highlighted ? "text-emerald-300" : "text-[--primary]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={pkg.highlighted ? "secondary" : "default"}
                  className="w-full"
                >
                  <Link href="/booking">Выбрать пакет</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
