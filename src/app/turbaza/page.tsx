import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Flame } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Тур база Михалёвское — кемпинг у озера, аренда лодок",
  description:
    "Кемпинг у Михалёвского озера в 1,5 км от коттеджа WILD. Аренда палаток у воды, лодок, слип для сапов. 135 км от Петербурга.",
  alternates: { canonical: "/turbaza" },
};


const features = [
  "Удобный спуск (слип) к озеру для сапов и лодок",
  "Аренда палаток прямо у воды",
  "Аренда лодок по предварительной записи",
  "Уединённая природа и панорамные закаты",
];

const highlights = [
  "Уютные площадки под палатки с электричеством и мангалами",
  "Новые лодки с полным комплектом снаряжения",
  "135 км от Петербурга",
  "Отдельная территория — 1,5 км от коттеджа WILD",
];

export default function TurbazaPage() {
  return (
    <article>
      <PageHero
        eyebrow="Тур база"
        title="Михалёвское"
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
              Аренда лучших мест у озера
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Тур база Михалёвское — уединённое место на берегу Михалёвского озера, в 1,5 км от коттеджа WILD. Шесть лет назад здесь произошёл пожар, сейчас идёт восстановление территории. Пока реконструкция продолжается, мы предлагаем аренду кемпинговых мест прямо у воды.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Вся информация и бронирование — только по телефону.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-pine/10 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-pine" />
                  </span>
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="inline-flex items-center gap-3 h-14 px-8 rounded-full bg-pine text-white font-semibold text-base hover:bg-pine/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
          </div>

          {/* Right — photo + highlights */}
          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/activity-rental-boats.jpeg"
                fill
                alt="Лодки у пирса Михалёвского озера"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
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

    </article>
  );
}
