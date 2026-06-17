import Link from "next/link";
import { Star } from "lucide-react";
import { REVIEWS, SITE } from "@/lib/data";

export function Reviews() {
  return (
    <section id="reviews" className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Отзывы</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
              Что говорят гости
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-[--muted-foreground] shrink-0">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-[--foreground]">{SITE.rating}</span>
            <span>· {SITE.reviewCount}+ отзывов</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 ${
                i === 0
                  ? "bg-[--primary] text-white lg:row-span-1"
                  : "bg-white border border-[--border]"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  i === 0 ? "bg-white/15 text-white" : "bg-[--primary]/10 text-[--primary]"
                }`}>
                  {r.initials}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${i === 0 ? "text-white" : "text-[--foreground]"}`}>
                    {r.author}
                  </div>
                  <div className={`text-xs ${i === 0 ? "text-white/55" : "text-[--muted-foreground]"}`}>
                    {r.stayType} · {r.date}
                  </div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`w-3 h-3 ${
                      s <= r.rating
                        ? i === 0 ? "text-yellow-300 fill-yellow-300" : "text-yellow-400 fill-yellow-400"
                        : "text-[--border] fill-[--border]"
                    }`} />
                  ))}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-[--foreground]"}`}>
                "{r.body}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
