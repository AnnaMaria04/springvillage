import type { Metadata } from "next";
import Link from "next/link";
import { Users, BedDouble, Bath } from "lucide-react";
import { HOUSE } from "@/content/house";
import { HERITAGE } from "@/content/heritage";
import { REVIEWS } from "@/content/reviews";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: `${HOUSE.name} — коттедж у Михалёвского озера`,
  description: `${HOUSE.type}. До ${HOUSE.capacity} гостей. ${HOUSE.description}`,
};

const galleryPhotos = [
  { src: "/images/gallery-exterior.jpg", label: "Фасад и озеро", wide: true },
  { src: "/images/gallery-interior.jpg", label: "Гостиная" },
  { src: "/images/gallery-lake.jpg", label: "Панорамное окно" },
  { src: "/images/gallery-sauna.jpg", label: "Баня у воды" },
  { src: "/images/gallery-sunset.jpg", label: "Терраса" },
];

const review = REVIEWS[0];

export default function DomPage() {
  return (
    <article>
      <PageHero
        eyebrow="Размещение"
        title={HOUSE.name}
        subtitle={HOUSE.longDescription}
        image="/images/stay.jpg"
      />

      {/* Specs */}
      <div className="border-b border-[--border] bg-[--background]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { icon: Users, value: `до ${HOUSE.capacity} гостей` },
            { icon: BedDouble, value: `${HOUSE.bedrooms} спальни` },
            { icon: Bath, value: `${HOUSE.bathrooms} санузел` },
            { icon: null, value: HOUSE.type },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.value} className="flex items-center gap-2 text-sm text-[--foreground]">
                {Icon && <Icon className="w-4 h-4 text-[--muted-foreground]" />}
                {s.value}
              </div>
            );
          })}
        </div>
      </div>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[220px] lg:auto-rows-[260px]">
          {galleryPhotos.map((p, i) => (
            <div
              key={i}
              className="relative rounded-3xl overflow-hidden bg-stone-300 bg-cover bg-center"
              style={{
                backgroundImage: `url('${p.src}')`,
                gridColumn: p.wide ? "span 2" : undefined,
                gridRow: p.wide ? "span 2" : undefined,
              }}
            >
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/80 bg-black/25 rounded-full px-2.5 py-1 backdrop-blur-sm">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment + amenities, clean lists */}
      <section className="bg-[--cream]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-[--foreground] mb-8">Удобства</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[--foreground]">
              {HOUSE.amenities.map((a) => (
                <li key={a} className="border-b border-[--border] pb-3 text-[15px]">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-[--foreground] mb-8">Оснащение</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[--foreground]">
              {HOUSE.equipment.map((e) => (
                <li key={e} className="border-b border-[--border] pb-3 text-[15px]">
                  {e}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[--muted-foreground] mt-8 leading-relaxed">
              Не включено: {HOUSE.notIncluded.join(" · ")}.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage — editorial prose, no cards */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[--muted-foreground] mb-6">
          {HERITAGE.sectionLabel}
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-[--foreground] leading-tight mb-8">
          Финское наследие карельского леса
        </h2>
        <div className="space-y-5 text-[--muted-foreground] text-lg leading-relaxed">
          <p>{HERITAGE.intro}</p>
          {HERITAGE.items.map((item) => (
            <p key={item.title}>{item.body}</p>
          ))}
        </div>
      </section>

      {/* Single review quote */}
      <section className="bg-[--pine]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 text-center">
          <blockquote className="font-display text-2xl lg:text-3xl text-white leading-snug mb-8">
            «{review.body}»
          </blockquote>
          <p className="text-white/55 text-sm">
            {review.author} · {review.date}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[--background] py-20 text-center">
        <Link
          href="/tseny"
          className="h-13 px-9 rounded-full bg-[--primary] text-white text-base font-semibold hover:bg-[--primary-light] transition-colors inline-flex items-center"
        >
          Цены и бронирование
        </Link>
      </section>
    </article>
  );
}
