import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/data";

export function CallToAction() {
  return (
    <section className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-[--forest-dark] rounded-3xl px-8 py-14 lg:px-16 lg:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4">
              Готовы к отдыху?
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Лучшие даты<br />разбирают быстро
            </h2>
            <p className="text-white/55 text-lg">
              Оставьте заявку — ответим в течение 15 минут и подтвердим бронирование.
            </p>
            <p className="text-white/35 text-sm mt-4">
              Без предоплаты · Отмена за 48 часов · Оплата при заезде
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
            <Button
              asChild
              size="lg"
              className="bg-white text-[--primary] hover:bg-white/90 font-semibold h-12 text-base w-full sm:w-auto lg:w-full"
            >
              <Link href="/booking">Забронировать онлайн</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-white/20 text-white hover:bg-white/10 hover:text-white h-12 text-base w-full sm:w-auto lg:w-full"
            >
              <a href={`tel:${CONTACT.phoneDial}`}>{CONTACT.phone}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
