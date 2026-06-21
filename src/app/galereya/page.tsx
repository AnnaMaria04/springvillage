import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/home/Gallery";

export const metadata: Metadata = {
  title: "Фотогалерея — коттедж WILD у озера",
  description: "Фотографии коттеджа WILD: экстерьер, интерьер, озеро, территория. A-frame в карельском лесу, Spring Village.",
  alternates: { canonical: "/galereya" },
};

export default function GalereyaPage() {
  return (
    <>
      <PageHero eyebrow="Spring Village" title="Галерея" image="/images/exterior-frost-dawn.jpeg" />
      <Gallery />
    </>
  );
}
