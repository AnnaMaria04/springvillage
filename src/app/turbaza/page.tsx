import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Flame } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Тур база Михалёвское — 500 м берега, песчаный пляж, аренда лодок",
  description:
    "500 метров берега с песчаным пляжем у Михалёвского озера. Кемпинг у воды, аренда лодок, слип для сапов. 1,5 км от коттеджа WILD. 135 км от Петербурга.",
  alternates: { canonical: "/turbaza" },
  openGraph: {
    title: "Тур база Михалёвское — 500 м берега с пляжем",
    description: "500 м берега, песчаный пляж, аренда лодок, кемпинг у воды. 1,5 км от коттеджа WILD.",
    images: [{ url: "/images/turbaza-dock-boats.jpg", width: 1200, height: 630, alt: "Пирс и лодки на Михалёвском озере" }],
  },
};


const features = [
  "Песчаный пляж — мягкое дно, заход без камней, вода прогревается к июлю",
  "Ночёвка в палатке у самой воды: тишина, рассвет над озером, костёр",
  "Слип для спуска SUP-досок, байдарок и лодок прямо с берега",
  "Аренда лодок по предварительной записи — новые лодки с полным снаряжением",
  "Закаты над Михалёвским озером без моторного шума — идеально для отдыха",
];

const highlights = [
  "1,5 км от коттеджа WILD",
  "135 км от Петербурга",
  "500 м частной береговой линии",
  "Площадки с электричеством и мангалами",
  "Бронирование только по телефону",
];

export default function TurbazaPage() {
  return (
    <article>
      <PageHero
        eyebrow="В 1,5 км от коттеджа WILD"
        title="Тур база Михалёвское"
        subtitle="Кемпинг у озера в карельском лесу. Отдельная территория в 1,5 км от коттеджа WILD."
        image="/images/territory-glamping-tent.jpg"
      />

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — story + features */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              О месте
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              500 метров берега с песчаным пляжем
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Тур база Михалёвское — уединённое место на берегу Михалёвского озера, в 1,5 км от коттеджа WILD. Здесь 500 метров частной береговой линии с настоящим песчаным пляжем и прямым выходом к воде — значительно больше, чем у большинства мест на озере.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Шесть лет назад здесь произошёл пожар, сейчас идёт восстановление территории. Пока реконструкция продолжается, мы предлагаем аренду кемпинговых мест прямо у воды.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Вся информация и бронирование — только по телефону.
            </p>

            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-pine/10 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-pine" />
                  </span>
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — photo + highlights */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/turbaza-dock-boats.jpg"
                fill
                alt="Пирс и лодки на Михалёвском озере"
                style={{ objectFit: "cover", objectPosition: "center 50%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Highlights */}
            <div className="bg-cream rounded-3xl p-8">
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
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
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
              <a
                href={`tel:${CONTACT.phoneDial}`}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-wood text-white text-sm font-semibold hover:bg-wood/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
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
