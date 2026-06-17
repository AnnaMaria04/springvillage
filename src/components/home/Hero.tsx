import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE, CONTACT } from "@/content/site";
import { BookingModal } from "@/components/booking/BookingModal";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end bg-[--pine] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 lg:pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          {/* Label */}
          <p className="text-white/60 text-sm font-medium mb-5 tracking-wide">
            {CONTACT.addressShort}
          </p>

          {/* Headline */}
          <h1
            className="font-display font-bold text-white leading-none mb-5 tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
          >
            Коттедж<br />WILD
          </h1>

          {/* Subheadline */}
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-md">
            A-frame в карельском лесу. Финская баня у воды,
            байдарки, тишина. Два часа от города.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <BookingModal
              source="hero"
              trigger={
                <button className="h-13 px-8 rounded-2xl bg-white text-[--pine] text-base font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                  Забронировать
                </button>
              }
            />
            <Link
              href="#house"
              className="h-13 px-8 rounded-2xl border-2 border-white/30 text-white text-base font-medium hover:border-white/60 hover:bg-white/5 transition-all flex items-center"
            >
              Посмотреть дом →
            </Link>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap gap-8 sm:gap-12">
          {[
            { value: SITE.priceFromLabel, label: SITE.priceFromSub },
            { value: SITE.distanceFromSpb, label: "от Петербурга" },
            { value: `${SITE.rating} ★`, label: `${SITE.reviewCount}+ отзывов` },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-bold text-white leading-none">{s.value}</div>
              <div className="text-white/45 text-xs mt-1">{s.label}</div>
            </div>
          ))}

          {/* Phone quick link */}
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="ml-auto hidden sm:flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{CONTACT.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
