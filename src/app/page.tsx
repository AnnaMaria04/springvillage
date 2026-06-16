import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Spring Village — Коттеджи в Подмосковье",
  description: "Уютные коттеджи в 50 км от Москвы. Баня, мангал, природа. Онлайн-бронирование, лучшие цены напрямую.",
};
import { QuickSearch } from "@/components/home/QuickSearch";
import { TrustBadges } from "@/components/home/TrustBadges";
import { Features } from "@/components/home/Features";
import { FeaturedCottages } from "@/components/home/FeaturedCottages";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <TrustBadges />
      <Features />
      <FeaturedCottages />
      <PhotoStrip />
      <Testimonials />
      <CallToAction />
    </>
  );
}
