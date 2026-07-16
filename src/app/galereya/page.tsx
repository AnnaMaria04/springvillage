import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/home/Gallery";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Фотогалерея — коттедж WILD у озера",
  description: "Фотографии коттеджа WILD: экстерьер, интерьер, озеро, территория. A-frame в карельском лесу, Spring Village.",
  alternates: { canonical: "/galereya" },
  openGraph: {
    title: "Фотогалерея — Spring Village, коттедж WILD",
    description: "Смотрите фотографии A-frame коттеджа, Михалёвского озера, пирса и карельской природы.",
    images: [{ url: "/images/lake-panorama-autumn.jpeg", width: 1200, height: 630, alt: "Михалёвское озеро — Spring Village" }],
  },
};

export default function GalereyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Главная", url: "/" }, { name: "Галерея", url: "/galereya" }])) }} />
      <PageHero eyebrow="Spring Village" title="Галерея" image="/images/exterior-frost-dawn.jpeg" />
      <Gallery />
    </>
  );
}
