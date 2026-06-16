import { Hero } from "@/components/home/Hero";
import { QuickSearch } from "@/components/home/QuickSearch";
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
      <Features />
      <FeaturedCottages />
      <PhotoStrip />
      <Testimonials />
      <CallToAction />
    </>
  );
}
