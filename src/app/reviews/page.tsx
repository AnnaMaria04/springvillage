import { Star } from "lucide-react";
import { REVIEWS, SITE } from "@/lib/data";

const ratingDistribution = [
  { stars: 5, pct: 77 },
  { stars: 4, pct: 17 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 0 },
];

export default function ReviewsPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Отзывы</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-2">
            Что говорят гости
          </h1>
          <p className="text-[--muted-foreground]">{SITE.reviewCount}+ отзывов от реальных гостей</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-[--border] p-6">
              <div className="text-center mb-5">
                <div className="font-display text-6xl font-bold text-[--foreground] leading-none">{SITE.rating}</div>
                <div className="flex justify-center gap-0.5 mt-2 mb-1">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-xs text-[--muted-foreground]">из 5 · {SITE.reviewCount}+ отзывов</p>
              </div>
              <div className="space-y-2">
                {ratingDistribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-[--muted-foreground] text-right">{row.stars}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 h-1.5 bg-[--muted] rounded-full overflow-hidden">
                      <div className="h-full bg-[--primary] rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-6 text-[--muted-foreground]">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-3 space-y-4">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[--border] p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[--primary]/10 flex items-center justify-center text-[--primary] font-bold text-xs shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[--foreground]">{review.author}</div>
                      <div className="text-xs text-[--muted-foreground]">
                        {review.stayType} · {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-[--border] fill-[--border]"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[--foreground] leading-relaxed">"{review.body}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
