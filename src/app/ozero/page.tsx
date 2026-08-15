import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fish, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { lakeSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Михалёвское озеро — глубина, рыба, как добраться | Карельский перешеек",
  description:
    "Михалёвское озеро (Juoksemajärvi) в Выборгском районе Ленобласти: около 11,5 км в длину, глубина до 21 м, хвойные берега и острова. Какая рыба водится, где остановиться на берегу.",
  alternates: { canonical: "/ozero" },
  openGraph: {
    title: "Михалёвское озеро — Карельский перешеек, Ленинградская область",
    description:
      "11,5 км чистой воды на Карельском перешейке: глубина до 21 м, острова, рыбалка. Всё об озере и как оказаться на его берегу.",
    images: [{ url: "/images/lake/lake-panorama-autumn.jpeg", width: 1200, height: 630, alt: "Михалёвское озеро осенью" }],
  },
};

const facts = [
  { label: "11,5 км", detail: "длина озера с юго-востока на северо-запад" },
  { label: "21 м", detail: "максимальная глубина, средняя — более 7 м" },
  { label: "7 км²", detail: "площадь зеркала, ширина до 1,1 км" },
  { label: "10+", detail: "островов, два из них крупные" },
];

const fish = [
  "Щука", "Окунь", "Плотва", "Лещ", "Судак",
  "Налим", "Язь", "Краснопёрка", "Ряпушка", "Линь", "Уклейка", "Ёрш",
];

export default function OzeroPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lakeSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Главная", url: "/" },
              { name: "Михалёвское озеро", url: "/ozero" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Карельский перешеек · Выборгский район"
        title="Михалёвское озеро"
        subtitle="Одно из самых чистых и глубоких озёр Карельского перешейка. Старое финское название — Juoksemajärvi. Наш коттедж и турбаза стоят прямо на его берегу."
        image="/images/lake/lake-panorama-autumn.jpeg"
      />

      {/* Intro + facts */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Об озере
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              11,5 км чистой воды в карельском лесу
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Михалёвское озеро вытянуто с юго-востока на северо-запад почти на 11,5 километра при ширине
              до 1,1 км — большое, тихое озеро на Карельском перешейке, в Выборгском районе Ленинградской
              области. Оно глубокое: средняя глубина превышает 7 метров, а в юго-восточной части дно уходит
              до 21 метра.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Берега высокие и типично карельские — скалы, валуны, сосновый и еловый лес у самой воды.
              На озере больше десяти островов, два из них крупные. У берега дно песчаное и песчано-каменистое,
              а вода — чистая, с лёгким торфяным оттенком, характерным для лесных озёр перешейка.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Здесь нет городской суеты: до Санкт-Петербурга около 127 км, но кажется, что
              гораздо дальше. Именно за этой тишиной сюда и приезжают.
            </p>
          </div>

          {/* Depth-gauge strip: waterline with ruler ticks, measurements beneath —
              the lake's numbers presented like marks on a sounding line */}
          <div>
            <div className="h-px bg-lake/40" aria-hidden="true" />
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-8">
              {facts.map((f) => (
                <div key={f.label} className="relative pt-7 pb-6">
                  <span className="absolute top-0 left-0 w-px h-4 bg-lake/40" aria-hidden="true" />
                  <p className="font-display text-4xl lg:text-5xl font-bold text-pine leading-none mb-2">
                    {f.label}
                  </p>
                  <p className="text-muted-foreground text-sm leading-snug max-w-[24ch]">{f.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-lake/70 mt-2">
              Juoksemajärvi · промеры озера
            </p>
          </div>
        </div>
      </section>

      {/* Fishing */}
      <section className="bg-pine py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/activities/activity-fishing-catch.jpeg"
                fill
                alt="Рыбалка на Михалёвском озере"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-wood font-semibold text-sm uppercase tracking-wider mb-4">
                <Fish className="w-4 h-4" />
                Рыбалка
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
                Какая рыба водится в озере
              </h2>
              <p className="text-white/65 leading-relaxed mb-8">
                Михалёвское — рыбное озеро. Чаще всего попадаются плотва, окунь, лещ и уклейка; ловятся
                щука, судак, налим, язь и краснопёрка; реже — ряпушка и линь. Рыбачить можно с берега,
                с пирса или с лодки — самые глубокие ямы держатся в юго-восточной части.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {fish.map((f) => (
                  <span
                    key={f}
                    className="text-sm text-white/90 bg-white/10 rounded-full px-3.5 py-1.5"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <Link
                  href="/aktivnosti/rybalka"
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all"
                >
                  Рыбалка у коттеджа WILD
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/aktivnosti/rybalka#fishing-guide"
                  className="inline-flex items-center gap-2 text-wood font-semibold text-sm hover:gap-3 transition-all"
                >
                  Трофейная рыбалка с гидом — партнёр
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nature */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 lg:pt-28 pb-10 lg:pb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
          Природа
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Карельский перешеек в чистом виде
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Скалы, сосны, валуны и вода — пейзаж, за которым едут на север Ленобласти. Купание летом,
          прогулки на SUP и лодке, грибы и ягоды в окрестном лесу, тишина круглый год.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { src: "/images/lake/dock-boat-dusk.jpeg", alt: "Пирс и лодка на Михалёвском озере на закате", pos: "center 55%" },
            { src: "/images/territory/territory-pond-autumn.jpeg", alt: "Осенний берег озера", pos: "center 50%" },
            { src: "/images/lifestyle/lifestyle-dog-boat-lake.jpeg", alt: "Прогулка на лодке по озеру", pos: "center 45%" },
          ].map((img) => (
            <div key={img.src} className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src={img.src}
                fill
                alt={img.alt}
                style={{ objectFit: "cover", objectPosition: img.pos }}
                sizes="(max-width: 640px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Where to stay — connects to the business */}
      <section className="bg-cream pt-12 lg:pt-16 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Остановиться на берегу
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Мы находимся прямо на берегу Михалёвского озера. Коттедж WILD — A-frame с собственным пирсом и
            лодкой; в 1,5 км — турбаза с песчаным пляжем и кемпингом у воды.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dom"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-pine text-white font-semibold hover:bg-pine/90 transition-colors"
            >
              Коттедж WILD
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/turbaza"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full border border-pine text-pine font-semibold hover:bg-pine/5 transition-colors"
            >
              Турбаза Михалёвское
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
