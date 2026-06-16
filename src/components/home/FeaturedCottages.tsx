import Link from "next/link";
import { Users, Star, ArrowUpRight } from "lucide-react";
import { COTTAGES } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const featured = COTTAGES.filter((c) => c.featured);

export function FeaturedCottages() {
  return (
    <section className="section-y bg-[--muted]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header row */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              Наши коттеджи
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[--foreground]">
              Популярные варианты
            </h2>
          </div>
          <Link
            href="/cottages"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[--primary] hover:text-[--forest] transition-colors shrink-0"
          >
            Все {COTTAGES.length} коттеджей
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-col grid with large main card + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Main large card */}
          <Link
            href={`/cottages/${featured[0].slug}`}
            className="lg:col-span-3 group relative rounded-2xl overflow-hidden bg-[--forest-dark] min-h-[420px] lg:min-h-[520px] flex flex-col justify-end hover-lift"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${featured[0].color} opacity-60`}
              aria-hidden="true"
            />
            <div className="absolute inset-0 img-overlay" aria-hidden="true" />

            <div className="relative z-10 p-7 lg:p-9">
              <div className="flex items-start justify-between mb-3">
                {featured[0].badge && (
                  <Badge className="text-xs">{featured[0].badge}</Badge>
                )}
                <div className="flex items-center gap-1 bg-black/30 text-white rounded-full px-2.5 py-1 text-xs ml-auto">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {featured[0].rating}
                </div>
              </div>

              <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-1">
                «{featured[0].name}»
              </h3>
              <p className="text-white/60 text-sm mb-4">{featured[0].tagline}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Users className="w-3.5 h-3.5" />
                  до {featured[0].capacity} гостей
                </div>
                <div className="text-right">
                  <span className="text-white font-bold text-xl">{featured[0].priceWeekday.toLocaleString("ru-RU")} ₽</span>
                  <span className="text-white/50 text-xs ml-1">/ ночь</span>
                </div>
              </div>
            </div>
          </Link>

          {/* 2 stacked smaller cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {featured.slice(1, 3).map((cottage) => (
              <Link
                key={cottage.slug}
                href={`/cottages/${cottage.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-[--forest-dark] min-h-[200px] lg:min-h-0 lg:flex-1 flex flex-col justify-end hover-lift"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cottage.color} opacity-60`}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 img-overlay" aria-hidden="true" />

                <div className="relative z-10 p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-2">
                    {cottage.badge && (
                      <Badge className="text-xs">{cottage.badge}</Badge>
                    )}
                    <div className="flex items-center gap-1 bg-black/30 text-white rounded-full px-2 py-0.5 text-xs ml-auto">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {cottage.rating}
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-0.5">«{cottage.name}»</h3>
                  <p className="text-white/55 text-xs mb-3">{cottage.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <Users className="w-3 h-3" /> до {cottage.capacity}
                    </span>
                    <span className="text-white font-bold">
                      {cottage.priceWeekday.toLocaleString("ru-RU")} ₽
                      <span className="text-white/45 font-normal text-xs ml-0.5">/ н.</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/cottages"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[--primary]"
          >
            Все {COTTAGES.length} коттеджей <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
