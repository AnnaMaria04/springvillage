import { Hero } from "@/components/home/Hero";
import { Concept } from "@/components/home/Concept";
import { HouseShowcase } from "@/components/home/HouseShowcase";
import { Amenities } from "@/components/home/Amenities";
import { Activities } from "@/components/home/Activities";
import { Pricing } from "@/components/home/Pricing";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { Contacts } from "@/components/home/Contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Concept />
      <HouseShowcase />
      <Amenities />
      <Activities />
      <Pricing />
      <Location />
      <Reviews />
      <Faq />
      <Contacts />
    </>
  );
}
