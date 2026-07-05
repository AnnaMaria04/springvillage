import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Частые вопросы — коттедж WILD, Spring Village",
  description:
    "Заезд и выезд, вместимость, животные, оплата, отмена, парковка — ответы на частые вопросы о Коттедже WILD.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Частые вопросы — Spring Village, коттедж WILD",
    description: "Заезд и выезд, вместимость, животные, оплата, отмена бронирования — все ответы здесь.",
    images: [{ url: "/images/interior-aframe-window.jpeg", width: 1200, height: 630, alt: "Интерьер коттеджа WILD — Spring Village" }],
  },
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Информация" title="Частые вопросы" />
      <Faq />
    </>
  );
}
