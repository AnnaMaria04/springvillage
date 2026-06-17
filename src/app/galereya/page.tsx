import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/home/Gallery";

export const metadata: Metadata = {
  title: "Галерея — Коттедж WILD у озера",
  description: "Фотографии коттеджа, бани, озера и территории Spring Village в разные сезоны.",
};

export default function GalereyaPage() {
  return (
    <>
      <PageHero eyebrow="Spring Village" title="Галерея" image="/images/gallery-exterior.jpg" />
      <Gallery />
    </>
  );
}
