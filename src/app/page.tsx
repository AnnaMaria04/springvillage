import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StickyBookingBar } from "@/components/home/StickyBookingBar";
import { StayPreview } from "@/components/home/StayPreview";
import { Deals } from "@/components/home/Deals";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { TerritoryPreview } from "@/components/home/TerritoryPreview";
import { Reviews } from "@/components/home/Reviews";
import { LocationPreview } from "@/components/home/LocationPreview";
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
      <StickyBookingBar />
      <StayPreview />
      <Deals />
      <ExperiencePreview />
      <TerritoryPreview />
      <Reviews />
      <LocationPreview />
      <BookingCTA />
    </>
  );
}
