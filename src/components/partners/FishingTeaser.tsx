import Link from "next/link";
import { Fish, ArrowRight } from "lucide-react";

/** Slim cross-sell strip — links to the full partner block on the fishing page. */
export function FishingTeaser() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 lg:pb-16">
      <Link
        href="/aktivnosti/rybalka#fishing-guide"
        className="group flex items-center gap-4 sm:gap-5 rounded-3xl border border-border bg-white px-6 py-5 sm:px-8 hover:border-pine/30 transition-colors"
      >
        <span className="w-11 h-11 rounded-full bg-pine/10 flex items-center justify-center shrink-0">
          <Fish className="w-5 h-5 text-pine" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-foreground font-semibold leading-tight">
            Трофейная рыбалка с гидом
          </span>
          <span className="block text-muted-foreground text-sm mt-0.5">
            Катер с сонаром LiveScope, крупная щука. Организует партнёр Spring Village.
          </span>
        </span>
        <span className="shrink-0 flex items-center gap-2 text-pine font-semibold text-sm group-hover:gap-3 transition-all">
          <span className="hidden sm:inline">Подробнее</span>
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </section>
  );
}
