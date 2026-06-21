import type { Metadata } from "next";
import Image from "next/image";
import { Users, BedDouble, Bath, Maximize2 } from "lucide-react";
import { HOUSE } from "@/content/house";
import { HERITAGE } from "@/content/heritage";
import { PageHero } from "@/components/layout/PageHero";
import { StickyBookingBar } from "@/components/home/StickyBookingBar";
import { DomGallery } from "@/components/home/DomGallery";

export const metadata: Metadata = {
  title: "Коттедж WILD — A-Frame 60 м² у Михалёвского озера",
  description:
    "Уединённый A-frame коттедж 60 м², 2 спальни, до 5 гостей. Оборудованный пирс, лодки, SUP. Аренда в Михалёво, Выборгский район.",
  alternates: { canonical: "/dom" },
  openGraph: {
    title: "Коттедж WILD — Spring Village",
    description: "A-frame 60 м², пирс, лодки. Михалёво, Ленобласть.",
    images: [{ url: "/images/stay.jpg", width: 1200, height: 630, alt: "Коттедж WILD" }],
  },
};


export default function DomPage() {
  return (
    <article>
      <PageHero
        eyebrow="Размещение"
        title={HOUSE.name}
        subtitle={HOUSE.longDescription}
        image="/images/exterior-winter-snow.jpg"
      />
      <StickyBookingBar />

      {/* Specs */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { icon: Users, value: `до ${HOUSE.capacity} гостей` },
            { icon: BedDouble, value: `${HOUSE.bedrooms} спальни` },
            { icon: Bath, value: `${HOUSE.bathrooms} санузел` },
            { icon: Maximize2, value: `${HOUSE.area} м²` },
            { icon: null, value: HOUSE.type },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.value} className="flex items-center gap-2 text-sm text-foreground">
                {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                {s.value}
              </div>
            );
          })}
        </div>
      </div>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <DomGallery />
      </section>


      {/* Equipment + amenities, clean lists */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Удобства</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-foreground">
              {HOUSE.amenities.map((a) => (
                <li key={a} className="border-b border-border pb-3 text-[15px]">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Оснащение</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-foreground">
              {HOUSE.equipment.map((e) => (
                <li key={e} className="border-b border-border pb-3 text-[15px]">
                  {e}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-8 leading-relaxed">
              Не включено: {HOUSE.notIncluded.join(" · ")}.
            </p>
            {HOUSE.extras && HOUSE.extras.length > 0 && (
              <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
                По запросу: {HOUSE.extras.join(" · ")}.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Territory highlights */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
          Территория
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-14">
          Большая уединённая территория в лесу
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Финский родник",
              body: "На территории сохранился бывший финский источник. Чистая питьевая вода прямо на участке.",
              photo: "/images/feature-pond-spring.jpeg",
            },
            {
              title: "Пирс и водная станция",
              body: "Оборудованный пирс для рыбалки и рассветов. Лодки и SUP-доски — выходи на воду в любой момент.",
              photo: "/images/dock-morning-mist.jpg",
            },
            {
              title: "Мангальная зона",
              body: "Дрова, решётка и шампуры уже подготовлены. Мангал у воды — лучшее место для закатного ужина.",
              photo: "/images/territory-bbq.jpg",
            },
            {
              title: "Лесные тропы",
              body: "Сосновый лес начинается прямо за домом. Грибы, ягоды, чистый воздух — всё рядом.",
              photo: "/images/activity-forest-walk.jpg",
            },
          ].map((item) => (
            <div key={item.title}>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-5">
                <Image
                  src={item.photo}
                  fill
                  alt={item.title}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage — horizontal timeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-0 pb-20 lg:pb-28">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
            {HERITAGE.sectionLabel}
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Финское наследие карельского леса
          </h2>
        </div>
        {/* Horizontal timeline */}
        <div className="relative">
          {/* Single full-width connector line behind all dots */}
          <div className="hidden sm:block absolute top-[5px] left-[5px] right-[5px] h-px bg-border" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {HERITAGE.items.map((item, i) => (
              <div key={item.title} className="relative flex flex-col sm:pr-8">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-wood shrink-0" />
                  <p className="text-xs font-semibold text-wood uppercase tracking-wider">{item.period}</p>
                </div>
                <p className="font-semibold text-foreground mb-2">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                {/* Mobile vertical connector */}
                {i < HERITAGE.items.length - 1 && (
                  <div className="sm:hidden w-px h-8 bg-border ml-[4px] mt-6 mb-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </article>
  );
}
