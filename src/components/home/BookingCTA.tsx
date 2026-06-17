import { BnovoModal } from "@/components/booking/BnovoModal";
import { BookingModal } from "@/components/booking/BookingModal";

export function BookingCTA() {
  return (
    <section className="bg-background py-32 lg:py-44">
      {/* Thin decorative top rule */}
      <div className="max-w-xs mx-auto mb-16 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-moss" />
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Бронирование
        </p>
        <h2 className="font-display text-5xl lg:text-7xl font-bold text-pine leading-[0.95] mb-6">
          Приезжайте<br />к озеру
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          Свободные даты, цены и онлайн-бронирование — в одном месте.
        </p>
        <div className="flex items-center justify-center gap-6">
          <BnovoModal
            trigger={
              <button className="btn-lux h-13 px-9 rounded-full bg-pine text-white text-base font-semibold hover:bg-pine/85 transition-colors inline-flex items-center cursor-pointer">
                Выбрать даты
              </button>
            }
          />
          <BookingModal
            source="home_cta"
            trigger={
              <button className="text-foreground/70 hover:text-foreground text-base font-medium underline-offset-4 hover:underline transition-colors cursor-pointer">
                Написать нам
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
