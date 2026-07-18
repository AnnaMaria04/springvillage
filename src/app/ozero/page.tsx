import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fish, Waves, Ruler, Mountain, Trees, ArrowRight } from "lucide-react";
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
    images: [{ url: "/images/lake-panorama-autumn.jpeg", width: 1200, height: 630, alt: "Михалёвское озеро осенью" }],
  },
};

const facts = [
  { icon: Ruler, label: "≈ 11,5 км", detail: "длина озера с юго-востока на северо-запад" },
  { icon: Waves, label: "до 21 м", detail: "максимальная глубина, средняя — более 7 м" },
  { icon: Mountain, label: "≈ 7 км²", detail: "площадь водного зеркала, ширина до 1,1 км" },
  { icon: Trees, label: "10+ островов", detail: "два крупных; берега — скалы и хвойный лес" },
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
        image="/images/lake-panorama-autumn.jpeg"
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
              Здесь нет моторного шума и городской суеты: до Санкт-Петербурга около 127 км, но кажется, что
              гораздо дальше. Именно за этой тишиной сюда и приезжают.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-cream rounded-3xl p-6 flex flex-col">
                <f.icon className="w-6 h-6 text-moss mb-4" />
                <p className="font-display text-2xl font-bold text-pine leading-none mb-2">{f.label}</p>
                <p className="text-muted-foreground text-sm leading-snug">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fishing */}
      <section className="bg-pine py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/activity-fishing-catch.jpeg"
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
              <Link
                href="/aktivnosti/rybalka"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all"
              >
                Рыбалка у коттеджа WILD
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nature */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
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
            { src: "/images/dock-boat-dusk.jpeg", alt: "Пирс и лодка на Михалёвском озере на закате", pos: "center 55%" },
            { src: "/images/territory-pond-autumn.jpeg", alt: "Осенний берег озера", pos: "center 50%" },
            { src: "/images/lifestyle-dog-boat-lake.jpeg", alt: "Прогулка на лодке по озеру", pos: "center 45%" },
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
      <section className="bg-cream py-20 lg:py-28">
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
