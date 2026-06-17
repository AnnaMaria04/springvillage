import { Star, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/content/reviews";
import { CONTACT, SITE } from "@/content/site";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? "fill-wood text-wood" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const shown = REVIEWS.slice(0, 3);

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Отзывы
            </p>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-5xl lg:text-6xl font-bold text-foreground leading-none">
                {SITE.rating}
              </span>
              <div>
                <Stars n={5} />
                <p className="text-sm text-muted-foreground mt-1">
                  {SITE.reviewCount} отзывов на Яндексе
                </p>
              </div>
            </div>
          </div>
          <a
            href={CONTACT.yandexOrgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            Все отзывы <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shown.map((r) => (
            <div
              key={r.author}
              className="flex flex-col bg-white rounded-3xl border border-border p-8 hover:shadow-[0_16px_40px_-20px_rgba(30,35,31,0.18)] transition-shadow"
            >
              <Stars n={r.rating} />
              <p className="font-display text-xl text-foreground leading-snug mt-5 flex-1">
                «{r.body}»
              </p>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-pine flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.author}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
