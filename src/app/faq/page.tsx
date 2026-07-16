import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/home/Faq";
import { FAQ } from "@/content/faq";
import { breadcrumbSchema } from "@/lib/schema";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const metadata: Metadata = {
  title: "Частые вопросы — коттедж WILD, Spring Village",
  description:
    "Заезд и выезд, вместимость, животные, оплата, отмена, парковка — ответы на частые вопросы о Коттедже WILD.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Частые вопросы — Spring Village, коттедж WILD",
    description: "Заезд и выезд, вместимость, животные, оплата, отмена бронирования — все ответы здесь.",
    images: [{ url: "/images/interior-aframe-window.jpeg", width: 1200, height: 630, alt: "Интерьер коттеджа WILD — Spring Village" }],
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Главная", url: "/" }, { name: "Частые вопросы", url: "/faq" }])) }} />
      <PageHero eyebrow="Информация" title="Частые вопросы" />
      <Faq />
    </>
  );
}
