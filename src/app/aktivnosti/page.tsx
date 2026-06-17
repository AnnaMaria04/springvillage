import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Activities } from "@/components/home/Activities";

export const metadata: Metadata = {
  title: "Активности — лето и зима у Михалёвского озера",
  description:
    "Байдарки, SUP, рыбалка, велосипеды летом. Баня, лыжи, коньки и зимняя рыбалка зимой. Чем заняться в Spring Village.",
};

export default function AktivnostiPage() {
  return (
    <>
      <PageHero
        eyebrow="Впечатления"
        title="Активности"
        subtitle="Озеро, лес и баня круглый год — выбирайте сезон."
        image="/images/exp-lake.jpg"
      />
      <Activities />
    </>
  );
}
