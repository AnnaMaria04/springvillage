import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Invitation card for the guided-fishing partner — used on the landing and /dom. */
export function FishingTeaser() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 lg:pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] rounded-3xl overflow-hidden border border-border bg-white">
        {/* Trophy photo */}
        <div className="relative min-h-[200px] sm:min-h-full">
          <Image
            src="/images/partners/fishing-trophy-1.jpg"
            fill
            alt="Трофейная щука — рыбалка с гидом на Михалёвском озере"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="(max-width: 640px) 100vw, 280px"
            loading="lazy"
          />
        </div>

        {/* Invitation */}
        <div className="p-7 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wood mb-3">
            Партнёр Spring Village
          </p>
          <h3 className="font-display text-2xl font-bold text-foreground leading-tight mb-3">
            Сделайте отдых ещё ярче — трофейная рыбалка с гидом
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mb-6">
            Выход за крупной щукой на катере с сонаром Garmin LiveScope: профессиональный гид,
            все снасти и приманки уже включены. Организует наш партнёр — запись напрямую.
          </p>
          <Link
            href="/aktivnosti/rybalka#fishing-guide"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-pine text-white text-sm font-semibold hover:bg-pine/90 transition-colors"
          >
            Подробнее о рыбалке
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
