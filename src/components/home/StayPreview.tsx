import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOUSE } from "@/content/house";
import { SITE } from "@/content/site";
import { BookingButton } from "@/components/booking/BookingButton";

export function StayPreview() {
  return (
    <section className="bg-background pt-10 pb-8 lg:pt-14 lg:pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden bg-cream border border-border">
          <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[460px]">
            <Image src="/images/exterior/exterior-night-deck.jpeg" fill alt="Коттедж WILD с освещённой террасой в карельском лесу" className="object-cover object-[center_40%]" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-[1.1] text-pine">{HOUSE.name}<br /><span className="text-moss">A-frame у озера</span></h2>
            <p className="text-sm text-muted-foreground mt-4">60 м² · 2 спальни · до {HOUSE.capacity} гостей</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {["Панорамные окна, дровяной камин и тёплые полы", "200 м частного берега. Лодка и SUP включены.", "До 3 детей — без доплаты"].map((feature) => <li key={feature} className="flex gap-3"><span className="w-1 h-1 mt-2 rounded-full bg-moss shrink-0" />{feature}</li>)}
            </ul>
            <Link href="/dom#pontoon" className="inline-flex self-start items-center gap-2 text-sm text-pine mt-5 py-2 border-b border-pine/25 hover:border-pine">Новый просторный понтон <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BookingButton className="h-12 px-7 bg-wood text-white rounded-full text-sm font-semibold hover:bg-wood/90 transition-colors cursor-pointer">Выбрать даты</BookingButton>
              <p className="text-sm text-muted-foreground"><span className="text-pine font-semibold">{SITE.priceFromLabel}</span> / ночь</p>
            </div>
            <Link href="/dom" className="inline-flex self-start items-center gap-2 mt-4 py-2 text-sm text-pine link-underline">Подробнее о коттедже <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
