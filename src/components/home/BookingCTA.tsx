"use client";

import { BookingModal } from "@/components/booking/BookingModal";
import { SITE, CONTACT } from "@/content/site";
import { Phone } from "lucide-react";
import { useBooking } from "@/context/booking-context";

const stats = [
  { value: SITE.priceFromLabel, label: SITE.priceFromSub },
  { value: "до 5", label: "гостей" },
  { value: SITE.distanceFromSpb, label: "от Петербурга" },
  { value: "4.8 ★", label: "на Яндексе" },
];

export function BookingCTA() {
  const { openBooking } = useBooking();
  return (
    <section
      className="relative bg-pine bg-cover bg-center py-20 lg:py-28"
      style={{ backgroundImage: "url('/images/booking.jpg')" }}
    >
      <div className="absolute inset-0 bg-pine/80" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45 mb-4">
              Бронирование
            </p>
            <h2
              className="font-display font-bold text-white leading-[0.95] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Приезжайте<br />к озеру
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-wood leading-none">{s.value}</p>
                  <p className="text-white/45 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 lg:items-end">
            <button
              onClick={openBooking}
              className="btn-lux w-full lg:w-auto h-13 px-10 rounded-full bg-white text-pine text-base font-semibold hover:bg-white/90 transition-colors cursor-pointer"
            >
              Выбрать даты
            </button>
            <BookingModal
              source="home_cta"
              trigger={
                <button className="w-full lg:w-auto h-13 px-10 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/50 text-base font-medium transition-colors cursor-pointer">
                  Написать нам
                </button>
              }
            />
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="flex items-center justify-center lg:justify-end gap-2 text-white/45 hover:text-white/75 text-sm transition-colors mt-1"
            >
              <Phone className="w-3.5 h-3.5" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
