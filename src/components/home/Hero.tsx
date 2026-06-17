import Link from "next/link";
import { SITE, CONTACT } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[--forest-dark]">
      <div className="absolute inset-0 bg-gradient-to-br from-[--forest-dark] via-[--forest] to-[--lake-dark] opacity-90" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--lake-light]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 lg:pb-24 pt-32 lg:pt-40 w-full">
        <div className="max-w-3xl">
          <p className="text-[--lake-light] text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            {CONTACT.addressShort}
          </p>
          <h1
            className="font-display font-bold text-white leading-[1.0] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: "-0.03em" }}
          >
            {SITE.houseName}
          </h1>
          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            A-frame в карельском лесу у воды. Финская баня, байдарки, тишина.
            Два часа от города — и вы уже здесь.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-[--forest-dark] text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Забронировать
            </Link>
            <Link
              href="#house"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/8 transition-colors"
            >
              Посмотреть дом →
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
          {[
            { value: `от ${SITE.priceFrom.toLocaleString("ru-RU")} ₽`, label: "за ночь" },
            { value: SITE.distanceFromSpb ?? "", label: "от Петербурга" },
            { value: `${SITE.rating}★`, label: `${SITE.reviewCount}+ отзывов` },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/45 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
