import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-20 lg:py-28 bg-[--muted]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[--primary] font-semibold text-sm uppercase tracking-widest mb-4">
          Готовы к отдыху?
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[--foreground] mb-6">
          Забронируйте коттедж сегодня
        </h2>
        <p className="text-[--muted-foreground] text-lg mb-10 max-w-xl mx-auto">
          Лучшие даты разбирают быстро. Оставьте заявку онлайн — ответим в течение 15 минут.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="xl">
            <Link href="/booking">
              <Calendar className="w-5 h-5" />
              Забронировать онлайн
            </Link>
          </Button>
          <Button asChild size="xl" variant="secondary">
            <a href="tel:+74951234567">
              <Phone className="w-5 h-5" />
              Позвонить нам
            </a>
          </Button>
        </div>
        <p className="text-sm text-[--muted-foreground] mt-6">
          Без предоплаты · Бесплатная отмена за 48 часов · Ответим за 15 минут
        </p>
      </div>
    </section>
  );
}
