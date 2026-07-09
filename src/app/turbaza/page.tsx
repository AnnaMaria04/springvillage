import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Flame } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Тур база Михалёвское — 50 м берега, песчаный пляж, аренда лодок",
  description:
    "50 метров берега с песчаным пляжем у Михалёвского озера. Кемпинг у воды, аренда лодок, слип для сапов. 1,5 км от коттеджа WILD. 135 км от Петербурга.",
  alternates: { canonical: "/turbaza" },
  openGraph: {
    title: "Тур база Михалёвское — 50 м берега с пляжем",
    description: "50 м берега, песчаный пляж, аренда лодок, кемпинг у воды. 1,5 км от коттеджа WILD.",
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
  "50 м частной береговой линии",
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
              50 метров берега с песчаным пляжем
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Тур база Михалёвское — уединённое место на берегу Михалёвского озера, в 1,5 км от коттеджа WILD. Здесь 50 метров частной береговой линии с настоящим песчаным пляжем и прямым выходом к воде — значительно больше, чем у большинства мест на озере.
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
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-10">
          Что у нас есть
        </h2>

        <div className="space-y-3">
          {[
            { name: "Слип для лодок, байдарок и SUP", price: "Бесплатно", free: true },
            { name: "Организация места для автомобиля", price: "1 000 ₽ / сутки" },
            { name: "Место под палатку у воды", price: "1 000 ₽ / сутки" },
            { name: "Костровая зона с мангалом", price: "1 000 ₽" },
            { name: "Понтон", price: "1 000 ₽" },
            { name: "Прокат лодки", price: "1 000 ₽ / день" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-6 rounded-3xl border border-border bg-white px-6 py-6 sm:px-8"
            >
              <span className="text-foreground font-medium text-lg">{item.name}</span>
              <span className={`shrink-0 font-display text-2xl sm:text-3xl font-bold ${item.free ? "text-moss" : "text-pine"}`}>
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Цены пробные, актуальны по состоянию на текущий сезон.
        </p>
      </section>

    </article>
  );
}
