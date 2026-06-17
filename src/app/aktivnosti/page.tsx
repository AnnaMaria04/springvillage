import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Activities } from "@/components/home/Activities";

export const metadata: Metadata = {
  title: "Активности — байдарки, баня, рыбалка у Михалёвского озера",
  description:
    "Летом: байдарки, SUP, рыбалка, велосипеды, BBQ. Зимой: финская баня, коньки, лыжи. Чем заняться в Spring Village круглый год.",
  alternates: { canonical: "/aktivnosti" },
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
