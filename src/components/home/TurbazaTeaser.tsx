import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TurbazaTeaser() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <Link
        href="/turbaza"
        className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-3xl overflow-hidden bg-pine p-8 sm:p-10 hover:bg-pine/90 transition-colors"
      >
        {/* Text */}
        <div className="flex-1 z-10">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            В 1,5 км от коттеджа
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
            Тур база Михалёвское
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-md">
            500 м берега с песчаным пляжем. Кемпинг у воды, аренда лодок, слип для сапов.
          </p>
        </div>

        {/* CTA */}
        <div className="shrink-0 flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
          Узнать подробнее <ArrowRight className="w-4 h-4" />
        </div>

        {/* Background image accent */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/territory-glamping-tent.jpg"
            fill
            alt=""
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            sizes="100vw"
            aria-hidden
          />
        </div>
      </Link>
    </section>
  );
}
