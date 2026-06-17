import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BookingBar } from "@/components/home/BookingBar";
import { StayPreview } from "@/components/home/StayPreview";
import { TerritoryPreview } from "@/components/home/TerritoryPreview";
import { Reviews } from "@/components/home/Reviews";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BookingCTA } from "@/components/home/BookingCTA";

export const metadata: Metadata = {
  title: "Spring Village — Коттедж WILD у Михалёвского озера | Аренда A-Frame",
  description:
    "Уединённый A-frame коттедж 60 м² на берегу Михалёвского озера, Ленобласть. Финская баня, пирс, лодки, SUP. До 5 гостей. 127 км от Петербурга. Рейтинг 4.8 ★",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <StayPreview />
      <TerritoryPreview />
      <Reviews />
      <GalleryPreview />
      <BookingCTA />
    </>
  );
}
