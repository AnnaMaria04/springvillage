import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Activities } from "@/components/home/Activities";

export const metadata: Metadata = {
  title: "Активности — байдарки, рыбалка у Михалёвского озера",
  description:
    "Летом: байдарки, SUP, рыбалка, велосипеды, BBQ. Зимой: коньки, лыжи, зимняя рыбалка. Чем заняться в Spring Village круглый год.",
  alternates: { canonical: "/aktivnosti" },
};

export default function AktivnostiPage() {
  return (
    <>
      <PageHero
        eyebrow="Впечатления"
        title="Активности"
        subtitle="Озеро и лес круглый год — выбирайте сезон."
        image="/images/exp-lake.jpg"
      />
      <Activities />
    </>
  );
}
