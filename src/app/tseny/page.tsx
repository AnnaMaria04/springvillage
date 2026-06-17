import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Pricing } from "@/components/home/Pricing";

export const metadata: Metadata = {
  title: "Цены и бронирование — от 50 000 ₽ за 3 ночи",
  description:
    "Стоимость аренды коттеджа WILD: 3 ночи от 50 000 ₽, неделя от 85 000 ₽. Онлайн-бронирование через Bnovo. Spring Village, Михалёво.",
  alternates: { canonical: "/tseny" },
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
