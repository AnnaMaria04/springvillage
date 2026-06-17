import { Hero } from "@/components/home/Hero";
import { QuickNav } from "@/components/home/QuickNav";
import { Benefits } from "@/components/home/Benefits";
import { Services } from "@/components/home/Services";
import { HouseShowcase } from "@/components/home/HouseShowcase";
import { Amenities } from "@/components/home/Amenities";
import { TourBase } from "@/components/home/TourBase";
import { Activities } from "@/components/home/Activities";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Heritage } from "@/components/home/Heritage";
import { Pricing } from "@/components/home/Pricing";
import { Gallery } from "@/components/home/Gallery";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { Contacts } from "@/components/home/Contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickNav />
      <Benefits />
      <Services />
      <HouseShowcase />
      <Amenities />
      <TourBase />
      <Activities />
      <HowItWorks />
      <Heritage />
      <Pricing />
      <Gallery />
      <Location />
      <Reviews />
      <Faq />
      <Contacts />
    </>
  );
}
