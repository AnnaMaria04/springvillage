import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Flame } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { BookingBar } from "@/components/home/BookingBar";
import { BookingButton } from "@/components/booking/BookingButton";
import { TurbazaGallery } from "@/components/turbaza/TurbazaGallery";
import { FishingPartner } from "@/components/partners/FishingPartner";
import { CONTACT } from "@/content/site";
import { TURBAZA_UID } from "@/content/booking";
import { campgroundSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Тур база Михалёвское — 500 м берега, песчаный пляж, аренда лодок",
  description:
    "500 метров берега с песчаным пляжем у Михалёвского озера. Кемпинг у воды, аренда лодок, слип для сапов, трофейная рыбалка с гидом. 1,5 км от коттеджа WILD. 135 км от Петербурга.",
  alternates: { canonical: "/turbaza" },
  openGraph: {
    title: "Тур база Михалёвское — 500 м берега с пляжем",
    description: "500 м берега, песчаный пляж, аренда лодок, кемпинг у воды. 1,5 км от коттеджа WILD.",
    images: [{ url: "/images/turbaza/turbaza-dock-boats.jpg", width: 1200, height: 630, alt: "Пирс и лодки на Михалёвском озере" }],
  },
};


const features = [
  { title: "Песчаный пляж", detail: "Мягкое дно и прямой выход к воде" },
  { title: "Кемпинг у озера", detail: "Места для палаток на берегу" },
  { title: "Слип", detail: "Для SUP, байдарок и лодок" },
  { title: "Прокат лодок", detail: "По предварительной записи" },
];

const highlights = [
  "1,5 км от коттеджа WILD",
  "135 км от Петербурга",
  "500 м частной береговой линии",
  "Площадки с электричеством и мангалами",
  "Трофейная рыбалка с гидом — партнёр базы",
];

export default function TurbazaPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campgroundSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Главная", url: "/" },
              { name: "Турбаза Михалёвское", url: "/turbaza" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="В 1,5 км от коттеджа WILD"
        title="Тур база Михалёвское"
        subtitle="Кемпинг у озера в карельском лесу. Отдельная территория в 1,5 км от коттеджа WILD."
        image="/images/territory/territory-glamping-tent.jpg"
      />

      {/* Booking — desktop bar / mobile buttons */}
      <div className="hidden md:block">
        <BookingBar uid={TURBAZA_UID} />
      </div>
      <div className="md:hidden flex flex-col sm:flex-row gap-3 px-6 py-8 max-w-lg mx-auto w-full">
        <BookingButton
          opts={{ uid: TURBAZA_UID }}
          className="flex-1 h-13 rounded-full bg-pine text-white font-semibold text-base transition-colors hover:bg-pine/90 cursor-pointer"
        >
          Забронировать место
        </BookingButton>
        <a
          href={`tel:${CONTACT.phoneDial}`}
          className="flex-1 h-13 flex items-center justify-center gap-2 rounded-full border border-pine text-pine font-semibold text-base transition-colors hover:bg-pine/5"
        >
          <Phone className="w-4 h-4" />
          Позвонить
        </a>
      </div>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left — story + features */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              О месте
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
              Песчаный берег. Тихий отдых.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              500 м частного берега Михалёвского озера, песчаный пляж и кемпинг у воды. Отдельная территория в 1,5 км от коттеджа WILD.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {features.map((feature) => (
                <li key={feature.title} className="border-t border-border pt-3">
                  <h3 className="font-body text-sm font-semibold text-pine tracking-normal">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{feature.detail}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6 pl-4 border-l-2 border-wood/50">
              Территория восстанавливается после пожара. На время реконструкции доступны кемпинговые места у воды.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              <BookingButton opts={{ uid: TURBAZA_UID }} className="inline-flex items-center h-11 px-6 rounded-full bg-wood text-white text-sm font-semibold hover:bg-wood/90 transition-colors cursor-pointer">Выбрать место</BookingButton>
              <a href={`tel:${CONTACT.phoneDial}`} className="text-sm text-pine py-3 link-underline">{CONTACT.phone}</a>
            </div>
          </div>

          {/* Right — photo + highlights */}
          <div className="space-y-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/turbaza/turbaza-dock-boats.jpg"
                fill
                alt="Пирс и лодки на Михалёвском озере"
                style={{ objectFit: "cover", objectPosition: "center 50%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Highlights */}
            <div className="bg-sand rounded-2xl p-5">
              <ul className="space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-foreground text-sm">
                    <MapPin className="w-4 h-4 text-moss mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Camp gallery — real photos of the base */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-10 lg:pb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
          Как это выглядит
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-10">
          Кемпинг у воды
        </h2>
        <TurbazaGallery
          images={[
            { src: "/images/turbaza/turbaza-ponton-boat.jpg",   alt: "Понтон, катамаран и палатка у берега Михалёвского озера", pos: "center 45%" },
            { src: "/images/turbaza/turbaza-tent-interior.jpg", alt: "Внутри палатки — две кровати с бельём",                    pos: "center 40%" },
            { src: "/images/turbaza/turbaza-tent-platform.jpg", alt: "Палатка на деревянной платформе в сосновом лесу",         pos: "center 40%" },
            { src: "/images/turbaza/turbaza-rental-boats.jpg",  alt: "Лодки напрокат на песчаном берегу озера",                 pos: "center 55%" },
          ]}
        />
      </section>

      {/* Fishing guide partner */}
      <FishingPartner tone="cream" />

      {/* Special offer */}
      <section className="bg-pine py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 text-wood font-semibold text-sm uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4" />
            Специальное предложение
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Забронируйте на 3 дня —<br className="hidden sm:block" /> аренда лодки в подарок
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
            Один день аренды лодки (до 4 часов) бесплатно при бронировании от 3 ночей. Новые лодки с полным комплектом снаряжения. Уточняйте наличие и даты по телефону.
          </p>
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="inline-flex items-center gap-3 h-14 px-10 rounded-full bg-white text-pine font-semibold text-base hover:bg-white/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {CONTACT.phone}
          </a>
          <p className="text-white/40 text-sm mt-6">
            Отдельная территория от коттеджа WILD · 1,5 км · 135 км от Петербурга
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
          Услуги и цены
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Что у нас есть
        </h2>
        <p className="text-muted-foreground mb-12">
          Каждая услуга доступна отдельно или всё сразу по выгодной цене.
        </p>

        {/* All individual services */}
        <div className="space-y-3 mb-8">
          {[
            { name: "Слип для лодок, байдарок и SUP", detail: "Спуск с берега", price: "Бесплатно", free: true },
            { name: "Неподготовленное место под палатку", detail: "Место у воды, без оборудования", price: "Бесплатно", free: true },
            { name: "Организация места для автомобиля", detail: "Охраняемая стоянка на территории", price: "1 000 ₽ / сутки", free: false },
            { name: "Понтон", detail: "Доступ к плавучему понтону", price: "1 000 ₽ / сутки", free: false },
            { name: "Костровая зона с мангалом", detail: "Оборудованное место, дрова", price: "1 000 ₽ / сутки", free: false },
            { name: "Прокат лодки", detail: "Деревянная лодка на день", price: "1 000 ₽ / день", free: false },
            { name: "Место под палатку (подготовленное)", detail: "Ровная площадка с розеткой", price: "1 000 ₽ / сутки", free: false },
          ].map((item) => (
            <div
              key={item.name}
              className="group flex items-center justify-between gap-6 rounded-3xl border border-border bg-white px-6 py-5 sm:px-8"
            >
              <div className="min-w-0">
                <p className="text-foreground font-medium text-lg leading-tight">{item.name}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{item.detail}</p>
              </div>
              <span className={`shrink-0 font-display text-xl sm:text-2xl font-bold ${item.free ? "text-moss" : "text-pine"}`}>
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Bundle deal */}
        <div className="rounded-3xl border border-wood bg-cream overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">

            {/* Left: what's included */}
            <div className="flex-1 p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wood">
                  Комплект — всё включено
                </p>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-wood bg-wood/12 rounded-full px-2.5 py-1">
                  Выгодно
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                5 услуг в одном пакете
              </h3>
              <ul className="space-y-3">
                {[
                  "Организация места для автомобиля",
                  "Понтон",
                  "Костровая зона с мангалом",
                  "Прокат лодки",
                  "Место под палатку (подготовленное)",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-wood shrink-0" />
                    <span className="text-foreground font-medium">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: price CTA */}
            <div className="lg:w-72 flex flex-col items-center justify-center gap-5 p-8 sm:p-10 lg:p-12 bg-wood/[0.06] border-t lg:border-t-0 lg:border-l border-wood/20">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-pine leading-none">3 000 ₽</p>
                <p className="text-sm text-muted-foreground mt-2">за всё / сутки</p>
                <p className="text-xs text-muted-foreground/60 mt-1 line-through">5 000 ₽ по отдельности</p>
                <p className="text-xs text-wood font-semibold mt-2">экономия 2 000 ₽</p>
              </div>
              <BookingButton
                opts={{ uid: TURBAZA_UID }}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-wood text-white text-sm font-semibold hover:bg-wood/90 transition-colors cursor-pointer"
              >
                Забронировать
              </BookingButton>
            </div>

          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Цены пробные, актуальны по состоянию на текущий сезон.
        </p>
      </section>

    </article>
  );
}
