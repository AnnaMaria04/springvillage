import Link from "next/link";
import { BookingModal } from "@/components/booking/BookingModal";

export function BookingCTA() {
  return (
    <section
      className="relative bg-[--pine] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/booking.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-28 lg:py-40 text-center">
        <h2 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Приезжайте к озеру
        </h2>
        <p className="text-white/65 text-lg mb-10">
          Свободные даты, цены и онлайн-бронирование — в одном месте.
        </p>
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/tseny"
            className="h-13 px-9 rounded-full bg-white text-[--pine] text-base font-semibold hover:bg-white/90 transition-colors inline-flex items-center"
          >
            Цены и даты
          </Link>
          <BookingModal
            source="home_cta"
            trigger={
              <button className="text-white/85 hover:text-white text-base font-medium underline-offset-4 hover:underline transition-colors cursor-pointer">
                Написать нам
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
