import Link from "next/link";
import { Users, Star, ArrowUpRight } from "lucide-react";
import { COTTAGES } from "@/lib/data";

export function RelatedCottages({ currentSlug }: { currentSlug: string }) {
  const related = COTTAGES.filter((c) => c.slug !== currentSlug).slice(0, 3);

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-[--foreground] mb-5">Другие коттеджи</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((c) => (
          <Link
            key={c.slug}
            href={`/cottages/${c.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden border border-[--border] hover-lift"
          >
            <div className={`h-24 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
              <span className="font-display text-4xl text-white/15 font-bold">{c.name[0]}</span>
            </div>
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-[--foreground] group-hover:text-[--primary] transition-colors">
                  «{c.name}»
                </h3>
                <div className="flex items-center gap-0.5 text-xs text-[--muted-foreground]">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {c.rating}
                </div>
              </div>
              <p className="text-xs text-[--muted-foreground] mb-2">{c.tagline}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-[--muted-foreground]">
                  <Users className="w-3 h-3" /> до {c.capacity}
                </span>
                <span className="font-semibold text-[--foreground]">
                  {c.priceWeekday.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/cottages"
        className="mt-4 inline-flex items-center gap-1 text-sm text-[--primary] font-medium hover:underline"
      >
        Все коттеджи <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
