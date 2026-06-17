import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/content/site";

export function YandexReviews() {
  return (
    <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Отзывы
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Что говорят гости
          </h2>
        </div>
        <a
          href={CONTACT.yandexOrgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
        >
          Все отзывы на Яндексе <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <iframe
        src={CONTACT.yandexReviewsWidget}
        title="Отзывы о Spring Village на Яндекс Картах"
        className="w-full rounded-3xl border border-border bg-white"
        style={{ height: 600 }}
        loading="lazy"
      />
    </section>
  );
}
