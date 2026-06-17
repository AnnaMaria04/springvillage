import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "Заезд и выезд, вместимость, животные, баня, оплата, отмена, парковка — ответы на частые вопросы о Коттедже WILD.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Информация" title="Частые вопросы" />
      <Faq />
    </>
  );
}
