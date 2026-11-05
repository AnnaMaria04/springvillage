import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Turbaza card — first of the "Рядом с коттеджем" pair on the landing.
 * Mirrors FishingTeaser's split-card geometry (photo panel on the opposite
 * side) so the two read as one deliberate editorial pair.
 */
export function TurbazaTeaser() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 lg:pt-16 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
        Рядом с коттеджем
      </p>
      <Link
        href="/turbaza"
        className="group grid grid-cols-1 sm:grid-cols-[1fr_280px] rounded-3xl overflow-hidden bg-pine hover:bg-pine/95 transition-colors"
      >
        {/* Content */}
        <div className="p-7 sm:p-9">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            В 1,5 км от коттеджа
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
            Тур база Михалёвское
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl mb-6">
            500 м берега с песчаным пляжем. Кемпинг у воды, аренда лодок, слип для сапов,
            трофейная рыбалка с гидом.
          </p>
          <span className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-white text-pine text-sm font-semibold group-hover:bg-white/90 transition-colors">
            Узнать подробнее
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Photo panel */}
        <div className="relative min-h-[200px] sm:min-h-full order-first sm:order-none">
          <Image
            src="/images/turbaza/turbaza-ponton-boat.jpg"
            fill
            alt="Понтон и лодка у берега турбазы Михалёвское"
            style={{ objectFit: "cover", objectPosition: "center 55%" }}
            sizes="(max-width: 640px) 100vw, 280px"
          />
        </div>
      </Link>
    </section>
  );
}
