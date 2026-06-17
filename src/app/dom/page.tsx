import type { Metadata } from "next";
import Link from "next/link";
import { Users, BedDouble, Bath, Maximize2 } from "lucide-react";
import { HOUSE } from "@/content/house";
import { HERITAGE } from "@/content/heritage";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Коттедж WILD — A-Frame 60 м² у Михалёвского озера",
  description:
    "Уединённый A-frame коттедж 60 м², 2 спальни, до 5 гостей. Финская баня у воды, оборудованный пирс, лодки, SUP. Аренда в Михалёво, Выборгский район.",
  alternates: { canonical: "/dom" },
  openGraph: {
    title: "Коттедж WILD — Spring Village",
    description: "A-frame 60 м², финская баня, пирс, лодки. Михалёво, Ленобласть.",
    images: [{ url: "/images/stay.jpg", width: 1200, height: 630, alt: "Коттедж WILD" }],
  },
};

const galleryPhotos = [
  { src: "/images/gallery-exterior.jpg", label: "Фасад и озеро", wide: true },
  { src: "/images/gallery-interior.jpg", label: "Гостиная" },
  { src: "/images/gallery-lake.jpg", label: "Панорамное окно" },
  { src: "/images/gallery-sauna.jpg", label: "Баня у воды" },
  { src: "/images/gallery-sunset.jpg", label: "Терраса" },
];

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
              photo: "/images/territory-spring.jpg",
            },
            {
              title: "Пирс и водная станция",
              body: "Оборудованный пирс для рыбалки и рассветов. Лодки и SUP-доски — выходи на воду в любой момент.",
              photo: "/images/territory-pier.jpg",
            },
            {
              title: "Мангальная зона",
              body: "Дрова, решётка и шампуры уже подготовлены. Мангал у воды — лучшее место для закатного ужина.",
              photo: "/images/territory-bbq.jpg",
            },
            {
              title: "Лесные тропы",
              body: "Сосновый лес начинается прямо за домом. Грибы, ягоды, чистый воздух — всё рядом.",
              photo: "/images/territory-forest.jpg",
            },
          ].map((item) => (
            <div key={item.title}>
              <div
                className="aspect-[3/4] rounded-3xl overflow-hidden bg-stone-300 bg-cover bg-center mb-5"
                style={{ backgroundImage: `url('${item.photo}')` }}
              />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Layout + Heritage — combined two-column editorial */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Floor plan */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Планировка
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-7">
              Два этажа у озера
            </h2>
            <div className="space-y-4 text-muted-foreground text-[17px] leading-relaxed">
              <p>
                Первый этаж — открытое пространство: гостиная с дровяным камином, кухня с полным оснащением, ванная комната с тёплыми полами. Панорамные окна во всю стену открывают вид на лес и озеро прямо с дивана.
              </p>
              <p>
                Второй этаж — две спальни: нижняя с двуспальной кроватью и верхняя мансардная. Оба уровня имеют свой характер: нижний — спокойный и просторный, верхний — уютный, под самой крышей треугольника.
              </p>
              <p>
                Архитектура A-frame — это не просто форма, это ощущение. Высокие потолки, наклонные стены, дерево везде. Дом поставлен так, чтобы первое, что вы видите утром — было озеро.
              </p>
            </div>
          </div>

          {/* Heritage */}
          <div className="lg:border-l lg:border-border lg:pl-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              {HERITAGE.sectionLabel}
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-7">
              Финское наследие карельского леса
            </h2>
            <div className="space-y-4 text-muted-foreground text-[17px] leading-relaxed">
              <p>{HERITAGE.intro}</p>
              {HERITAGE.items.map((item) => (
                <p key={item.title}>{item.body}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 text-center">
        <Link
          href="/tseny"
          className="h-13 px-9 rounded-full bg-primary text-white text-base font-semibold hover:bg-primary-light transition-colors inline-flex items-center"
        >
          Цены и бронирование
        </Link>
      </section>
    </article>
  );
}
