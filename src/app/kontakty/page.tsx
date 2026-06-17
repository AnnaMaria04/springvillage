import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Contacts } from "@/components/home/Contacts";
import { LOCATION } from "@/content/location";

export const metadata: Metadata = {
  title: "Контакты — Spring Village, Михалёво",
  description: "Телефон, WhatsApp, Telegram Spring Village. Адрес: пос. Михалёво, Выборгский район, Ленинградская область. Как связаться для бронирования.",
  alternates: { canonical: "/kontakty" },
};

export default function KontaktyPage() {
  return (
    <>
      <PageHero
        eyebrow="Связь"
        title="Контакты"
        subtitle="Ответим быстро — обычно в течение часа."
      />
      <Contacts />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 lg:pb-28">
        <div className="rounded-3xl overflow-hidden border border-border h-[360px] lg:h-[440px]">
          <iframe
            src={LOCATION.yandexMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Spring Village на карте"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
