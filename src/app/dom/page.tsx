import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Users, BedDouble, Maximize2, Waves } from "lucide-react";
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
      <header className="pt-[68px] lg:pt-[84px] bg-pine">
        <div className="relative min-h-[470px] sm:min-h-[500px] flex items-end overflow-hidden">
          <Image src="/images/exterior/exterior-dusk-path.jpg" alt="Коттедж WILD среди сосен в мягком вечернем свете" fill preload sizes="100vw" className="object-cover object-center lg:object-[center_55%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,18,14,0.8),rgba(12,18,14,0.36)_55%,rgba(12,18,14,0.08))]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,18,14,0.55),transparent_75%)]" />
          <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-9 lg:py-12 text-white">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3">Spring Village · Михалёвское озеро</p>
            <h1 className="font-display text-[clamp(2.6rem,4.3vw,4rem)] font-semibold leading-[1.05]">Коттедж WILD</h1>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed mt-4 max-w-md">Свой дом у озера. Две спальни, дровяной камин и панорамные окна в карельский лес.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
              <BookingButton className="inline-flex items-center px-7 h-12 bg-wood text-white rounded-full text-sm font-semibold hover:bg-wood/90 transition-colors cursor-pointer focus-ring-sand">Выбрать даты</BookingButton>
              <a href="#pontoon" className="inline-flex items-center gap-2 py-3 text-sm text-white/90 hover:text-white link-underline focus-ring-sand">Новый понтон <ArrowDown className="w-4 h-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-sand/50">
        <dl className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 py-5 lg:py-6">
          {[{ icon: Maximize2, value: `${HOUSE.area} м²`, label: "A-frame, 2 этажа" }, { icon: BedDouble, value: `${HOUSE.bedrooms} спальни`, label: "верхняя и нижняя" }, { icon: Users, value: `до ${HOUSE.capacity} гостей`, label: "для семьи и друзей" }, { icon: Waves, value: "200 м берега", label: "понтон, лодка и SUP" }].map((fact) => {
            const Icon = fact.icon;
            return <div key={fact.value} className="flex items-start gap-3">
              <Icon className="w-4 h-4 text-moss mt-1 shrink-0" aria-hidden="true" />
              <div><dt className="text-sm font-semibold text-pine">{fact.value}</dt><dd className="text-xs text-muted-foreground mt-1">{fact.label}</dd></div>
            </div>;
          })}
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
