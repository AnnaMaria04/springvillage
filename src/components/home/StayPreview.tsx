"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { HOUSE } from "@/content/house";
import { SITE } from "@/content/site";
import { useBooking } from "@/context/booking-context";

const features = [
  `60 м² · 2 спальни (верхняя и нижняя)`,
  "Панорамные окна с видом на озеро — из спальни и гостиной",
  "Дровяной камин и тёплые полы",
  "200 м частного берега — пирс, лодка и SUP включены в стоимость",
];

export function StayPreview() {
  const { openBooking } = useBooking();

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-cream border border-border hover-lift">
          {/* Photo */}
          <div className="media relative min-h-[340px] lg:min-h-[560px] overflow-hidden">
            <Image
              src="/images/exterior-dusk-triangles.jpg"
              fill
              alt="Лофт коттеджа"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Panel */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-pine mb-6">
              {HOUSE.name} — <span className="whitespace-nowrap">A-frame у озера</span>
            </h2>

            <Link
              href="/dom"
              className="inline-flex items-center self-start gap-2 mb-8 px-5 py-2.5 rounded-full border border-pine/30 text-sm font-semibold text-pine hover:bg-pine hover:text-white hover:border-pine transition-all duration-200 group/more"
            >
              Подробнее о коттедже
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/more:translate-x-0.5" />
            </Link>

            {/* Capacity */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-pine flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg text-foreground">до {HOUSE.capacity} гостей: взрослые и дети</span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-moss shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Price */}
            <p className="font-display text-2xl font-bold text-pine mb-7">
              {SITE.priceFromLabel} <span className="text-lg font-normal text-muted-foreground">{SITE.priceFromSub}</span>
            </p>

            {/* Booking button */}
            <button
              onClick={() => openBooking()}
              className="btn-lux inline-flex items-center justify-center self-start h-13 px-12 rounded-full bg-wood text-white text-sm font-semibold uppercase tracking-wider cursor-pointer"
            >
              Забронировать
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
