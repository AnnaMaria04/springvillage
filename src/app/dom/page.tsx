import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HOUSE } from "@/content/house";
import { BookingBar } from "@/components/home/BookingBar";
import { BookingButton } from "@/components/booking/BookingButton";
import { PontoonFeature } from "@/components/home/PontoonFeature";
import { DomGallery } from "@/components/home/DomGallery";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Коттедж WILD — A-Frame 60 м² у Михалёвского озера",
  description:
    "Коттедж WILD: A-frame 60 м², 2 спальни, до 5 гостей. 200 м частного берега и новый просторный понтон. Лодка и SUP включены. Михалёвское озеро.",
  alternates: { canonical: "/dom" },
  openGraph: {
    title: "Коттедж WILD — Spring Village",
    description: "Свой дом, свой берег и новый просторный понтон. A-frame у Михалёвского озера.",
    images: [{ url: "/images/exterior/exterior-night-deck.jpeg", width: 1200, height: 630, alt: "Коттедж WILD" }],
  },
};


export default function DomPage() {
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Главная", url: "/" }, { name: "Коттедж WILD", url: "/dom" }])) }} />
      <header className="pt-[68px] lg:pt-[84px] bg-cream">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="px-6 sm:px-8 lg:pl-16 xl:pl-24 lg:pr-12 py-9 sm:py-10 lg:py-14 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-4">Spring Village · частный дом у озера</p>
            <h1 className="font-display text-[clamp(2.6rem,4.3vw,4rem)] font-semibold leading-[1.02] text-pine">Коттедж<br />WILD</h1>
            <p className="font-display text-xl sm:text-2xl text-pine mt-5">Свой дом. Свой берег. Ваше время.</p>
            <p className="text-muted-foreground mt-5 max-w-md leading-relaxed">Две спальни, камин и панорамные окна в карельский лес. Уединённый A-frame у Михалёвского озера — в 127 км от Петербурга.</p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <BookingButton className="inline-flex items-center gap-4 px-7 h-12 bg-wood text-white rounded-full text-sm font-medium hover:bg-wood/90 transition-colors cursor-pointer">Выбрать даты <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></BookingButton>
              <a href="#pontoon" className="inline-flex items-center gap-2 py-3 text-sm text-pine border-b border-pine/30 hover:border-pine">Новый понтон <ArrowDown className="w-4 h-4" aria-hidden="true" /></a>
            </div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[480px]">
            <Image src="/images/exterior/exterior-night-deck.jpeg" alt="Коттедж WILD с освещённой террасой среди деревьев" fill preload sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-[center_40%]" />
            <span className="absolute bottom-6 left-6 text-white text-xs uppercase tracking-[0.2em]">A-frame · Михалёвское озеро</span>
          </div>
        </div>
      </header>

      <div className="border-y border-border">
        <dl className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 py-5 lg:py-6">
          {[{ value: `${HOUSE.area} м²`, label: "пространства для отдыха" }, { value: `${HOUSE.bedrooms} спальни`, label: `до ${HOUSE.capacity} гостей` }, { value: "200 м", label: "частного берега" }, { value: "Новый понтон", label: "ещё просторнее у воды" }].map((fact) => (
            <div key={fact.value} className="pr-4 md:pl-6 md:border-l md:border-border md:first:pl-0 md:first:border-0">
              <dt className="text-xs text-muted-foreground mb-2">{fact.label}</dt>
              <dd className="font-display text-2xl sm:text-3xl text-pine font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-10 mb-7 lg:mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">Внутри и снаружи</p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-pine">Дом, в котором<br />можно замедлиться.</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed lg:self-end max-w-lg">Панорамные окна, тепло дровяного камина и две отдельные спальни — внизу и в мансарде. Полностью оборудованная кухня, тёплые полы и своя терраса. Всё для того, чтобы остаться подольше.</p>
        </div>
        <DomGallery />
      </section>

      <PontoonFeature />

      {/* Equipment + amenities, clean lists.
          cream ≈ page ivory, so the seam is invisible — keep the combined gap
          to one section-break (~112px), not two stacked py-28 paddings. */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="font-display text-3xl font-medium text-pine mb-5">Для вашего отдыха</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-foreground">
              {HOUSE.amenities.map((a) => (
                <li key={a} className="border-b border-border pb-3 text-[15px]">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-medium text-pine mb-5">Всё под рукой</h2>
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
      <BookingBar />
    </article>
  );
}
