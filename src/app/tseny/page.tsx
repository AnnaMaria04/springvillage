import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Pricing } from "@/components/home/Pricing";

export const metadata: Metadata = {
  title: "Цены и бронирование",
  description:
    "Стоимость аренды Коттеджа WILD: от 50 000 ₽ за 3 ночи. Чем дольше — тем дешевле за сутки. Онлайн-бронирование и подарочные сертификаты.",
};

export default function TsenyPage() {
  return (
    <>
      <PageHero
        eyebrow="Бронирование"
        title="Цены и даты"
        subtitle="Чем дольше, тем дешевле за сутки. Без скрытых платежей."
      />
      <Pricing />
    </>
  );
}
