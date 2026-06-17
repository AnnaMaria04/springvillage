import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    emoji: "🏠",
    title: "Коттедж WILD",
    sub: "2 спальни · до 5 взрослых",
    href: "#house",
  },
  {
    emoji: "🧖",
    title: "Финская баня",
    sub: "у воды · включена в стоимость",
    href: "#amenities",
  },
  {
    emoji: "🛶",
    title: "Активности",
    sub: "байдарки, велосипеды, рыбалка",
    href: "#activities",
  },
  {
    emoji: "🗺",
    title: "Как добраться",
    sub: "127 км · ~2 часа на авто",
    href: "/doroga",
  },
  {
    emoji: "🎁",
    title: "Подарочный сертификат",
    sub: "от 3 000 ₽ · на любые даты",
    href: "#pricing",
  },
];

export function QuickNav() {
  return (
    <section className="bg-[--sand] py-6 border-b border-[--border]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mb-1">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="flex-none flex items-center gap-3 bg-white rounded-2xl px-4 py-3 hover:shadow-md transition-all duration-200 group border border-[--border] hover:border-[--pine]/20 min-w-[200px]"
            >
              <span className="text-2xl">{c.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-[--foreground] text-sm truncate">{c.title}</div>
                <div className="text-[--muted-foreground] text-xs truncate">{c.sub}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[--muted-foreground] group-hover:text-[--foreground] shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
