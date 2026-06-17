import { Hero } from "@/components/home/Hero";
import { Concept } from "@/components/home/Concept";
import { StayPreview } from "@/components/home/StayPreview";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BookingCTA } from "@/components/home/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Concept />
      <StayPreview />
      <ExperiencePreview />
      <GalleryPreview />
      <BookingCTA />
    </>
  );
}
