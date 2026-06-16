import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { REVIEWS, SITE } from "@/lib/data";

export function Testimonials() {
  const featured = REVIEWS.slice(0, 4);

  return (
    <section className="section-y bg-[--forest-dark] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3">
              Что говорят гости
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
              Реальные отзывы
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:text-right">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-white/50 text-sm">
                {SITE.rating} из 5 · {SITE.reviewCount}+ отзывов
              </div>
            </div>
            <Link
              href="/reviews"
              className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Все отзывы <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Review grid — 2x2 on desktop, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((review, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-white/8 p-6 lg:p-7 ${
                i === 0
                  ? "bg-[--primary] border-[--primary-light]/30"
                  : "bg-white/5"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/15 fill-white/15"
                    }`}
                  />
                ))}
              </div>

              {/* Body */}
              <p className="text-white/85 leading-relaxed mb-6 text-sm lg:text-base">
                "{review.body}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {review.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{review.author}</div>
                  <div className="text-white/40 text-xs">{review.stayType} · {review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
