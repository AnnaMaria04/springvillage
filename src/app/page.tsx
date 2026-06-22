import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BookingBar } from "@/components/home/BookingBar";
import { StayPreview } from "@/components/home/StayPreview";
import { Deals } from "@/components/home/Deals";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { TerritoryPreview } from "@/components/home/TerritoryPreview";
import { Reviews } from "@/components/home/Reviews";
import { LocationPreview } from "@/components/home/LocationPreview";
import { TurbazaTeaser } from "@/components/home/TurbazaTeaser";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Spring Village — A-Frame коттедж у Михалёвского озера",
  description:
    "Уединённый A-frame коттедж 60 м² на берегу Михалёвского озера, Ленобласть. Пирс, лодки, SUP. До 5 гостей. 127 км от Петербурга. Рейтинг 4.8 ★",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <Reveal><StayPreview /></Reveal>
      <Deals />
      <ExperiencePreview />
      <TerritoryPreview />
      <TurbazaTeaser />
      <Reviews />
      <LocationPreview />
    </>
  );
}
