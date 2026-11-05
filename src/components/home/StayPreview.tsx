import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOUSE } from "@/content/house";
import { SITE } from "@/content/site";
import { BookingButton } from "@/components/booking/BookingButton";

export function StayPreview() {
  return (
    <section className="bg-background py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-sm">
          <Image src="/images/exterior/exterior-night-deck.jpeg" fill alt="Коттедж WILD с освещённой террасой в карельском лесу" className="object-cover object-[center_40%]" sizes="(max-width: 1024px) 100vw, 50vw" />
          <span className="absolute bottom-6 left-6 text-white/90 text-xs uppercase tracking-[0.2em]">Ваш дом в карельском лесу</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">Один коттедж. Только для вас.</p>
          <h2 className="font-display text-[clamp(2.8rem,4.5vw,4.5rem)] font-medium leading-[1.05] text-pine">{HOUSE.name}<br /><span className="text-moss">Уединение у озера.</span></h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">Панорамные окна, дровяной камин и свой берег. Место, где можно никуда не спешить — и наконец побыть вместе.</p>
          <dl className="grid grid-cols-3 border-y border-border py-6 my-8 gap-3">
            {[{ value: "60 м²", label: "A-frame" }, { value: "2 спальни", label: "до 5 гостей" }, { value: "200 м", label: "свой берег" }].map((fact) => <div key={fact.value}><dt className="text-xs text-muted-foreground mb-1">{fact.label}</dt><dd className="font-display text-2xl text-pine font-semibold">{fact.value}</dd></div>)}
          </dl>
          <Link href="/dom#pontoon" className="group flex items-start justify-between gap-4 pb-6 border-b border-border">
            <span><span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Новое у коттеджа</span><span className="font-display text-2xl text-pine">Больше пространства на воде</span><span className="block text-sm text-muted-foreground mt-1">Новый просторный понтон. Лодка и SUP включены.</span></span>
            <ArrowUpRight className="w-5 h-5 mt-6 text-pine group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform motion-reduce:transition-none shrink-0" aria-hidden="true" />
          </Link>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BookingButton className="h-13 px-7 bg-pine text-white rounded-sm text-sm font-medium hover:bg-moss transition-colors cursor-pointer">Выбрать даты</BookingButton>
            <p className="text-sm text-muted-foreground"><span className="text-pine font-medium">{SITE.priceFromLabel}</span> / ночь</p>
          </div>
          <Link href="/dom" className="inline-flex items-center gap-2 mt-5 py-2 text-sm text-pine link-underline">Подробнее о коттедже <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
