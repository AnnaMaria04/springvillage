import Link from "next/link";
import { Users, Star, ArrowRight } from "lucide-react";

const allCottages = [
  { slug: "sosnovaya", name: "Сосновая", capacity: 8, price: 12000, rating: 4.9, color: "from-emerald-800 to-emerald-600" },
  { slug: "lipovaya", name: "Липовая", capacity: 4, price: 7500, rating: 4.8, color: "from-amber-800 to-amber-600" },
  { slug: "dubovaya", name: "Дубовая", capacity: 12, price: 18000, rating: 4.9, color: "from-green-700 to-teal-600" },
  { slug: "berezovaya", name: "Берёзовая", capacity: 6, price: 10000, rating: 4.7, color: "from-stone-600 to-stone-400" },
  { slug: "kedrovaya", name: "Кедровая", capacity: 10, price: 22000, rating: 5.0, color: "from-slate-700 to-slate-500" },
  { slug: "yablonevaya", name: "Яблоневая", capacity: 4, price: 6500, rating: 4.6, color: "from-rose-800 to-rose-600" },
];

export function RelatedCottages({ currentSlug }: { currentSlug: string }) {
  const related = allCottages.filter((c) => c.slug !== currentSlug).slice(0, 3);

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-[--foreground] mb-5">Другие коттеджи</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((c) => (
          <Link
            key={c.slug}
            href={`/cottages/${c.slug}`}
            className="group block bg-white rounded-xl overflow-hidden border border-[--border] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`h-28 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
              <span className="font-serif text-3xl text-white/25 font-bold">{c.name[0]}</span>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-[--foreground] group-hover:text-[--primary] transition-colors">
                  «{c.name}»
                </h3>
                <div className="flex items-center gap-0.5 text-xs">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {c.rating}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[--muted-foreground]">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> до {c.capacity}</span>
                <span className="font-semibold text-[--foreground]">от {c.price.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/cottages"
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-[--primary] font-medium hover:underline"
      >
        Все коттеджи <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
