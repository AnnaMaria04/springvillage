import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BookingBar } from "@/components/home/BookingBar";
import { StayPreview } from "@/components/home/StayPreview";
import { CottageStory } from "@/components/home/CottageStory";
import { Deals } from "@/components/home/Deals";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { Reviews } from "@/components/home/Reviews";
import { LocationPreview } from "@/components/home/LocationPreview";
import { TurbazaTeaser } from "@/components/home/TurbazaTeaser";
import { FishingTeaser } from "@/components/partners/FishingTeaser";
import { Reveal } from "@/components/ui/Reveal";
import { lodgingBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Spring Village — A-Frame коттедж у Михалёвского озера",
  description:
    "Уединённый A-frame коттедж 60 м² на берегу Михалёвского озера, Ленобласть. Пирс, лодки, SUP. До 5 гостей. 127 км от Петербурга. Рейтинг 4.8 ★",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema()) }}
      />
      <Hero />
      <BookingBar />
      <CottageStory />
      <Reveal><StayPreview /></Reveal>
      <Deals />
      <ExperiencePreview />
      <TurbazaTeaser />
      <FishingTeaser />
      <Reviews />
      <LocationPreview />
    </>
  );
}
