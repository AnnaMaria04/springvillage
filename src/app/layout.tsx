import type { Metadata } from "next";
import { Onest, Cormorant } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/global/WhatsAppButton";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { CookieBanner } from "@/components/global/CookieBanner";
import { Metrica } from "@/components/global/Metrica";
import { SITE } from "@/content/site";
import { BookingProvider } from "@/context/booking-context";
import { PageTransition } from "@/components/layout/PageTransition";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.springvillage.ru"),
  title: {
    default: "Spring Village — Коттедж WILD у Михалёвского озера",
    template: "%s | Spring Village",
  },
  description:
    "Уединённый A-frame коттедж 60 м² на берегу Михалёвского озера. Пирс с лодками, карельский лес. До 5 гостей. 127 км от Петербурга.",
  keywords: [
    "коттедж у озера Ленобласть",
    "аренда дома Михалёво",
    "A-frame коттедж Выборгский район",
    "отдых Михалёвское озеро",
    "снять коттедж Ленинградская область",
    "Spring Village коттедж",
    "A-frame коттедж",
    "рыбалка Ленинградская область",
    "семейный отдых у озера",
    "выходные у озера Петербург",
    "Михалёвское озеро отдых",
  ],
  openGraph: {
    title: "Spring Village — Коттедж WILD у Михалёвского озера",
    description: "A-frame 60 м² в карельском лесу. Пирс, лодки. 127 км от СПб.",
    type: "website",
    locale: "ru_RU",
    siteName: "Spring Village",
    images: [{ url: "/images/exterior/exterior-winter-snow.jpg", width: 1200, height: 630, alt: "Коттедж WILD — Spring Village" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Village — Коттедж WILD у Михалёвского озера",
    description: "A-frame 60 м² в карельском лесу. Пирс, лодки. 127 км от СПб.",
    images: ["/images/exterior/exterior-winter-snow.jpg"],
  },
  robots: { index: true, follow: true },
  other: {
    "yandex": "all",
    "geo.region": "RU-LEN",
    "geo.placename": "пос. Михалёво, Выборгский район, Ленинградская область",
    "geo.position": "60.983791;29.422227",
    "ICBM": "60.983791, 29.422227",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {/* Яндекс Метрика — подключается только с согласия пользователя (см. /cookies) */}
        <Metrica />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${SITE.yandexMetricaId}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:bg-pine focus:text-white focus:px-5 focus:py-3 focus:rounded-full text-sm font-semibold"
        >
          Перейти к содержанию
        </a>
        <BookingProvider>
          <Header />
          <main id="content" className="flex-1 pb-[58px] md:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppButton />
          <MobileBookBar />
          <CookieBanner />
        </BookingProvider>
      </body>
    </html>
  );
}
