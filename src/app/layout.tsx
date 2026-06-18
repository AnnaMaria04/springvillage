import type { Metadata } from "next";
import { Onest, Cormorant } from "next/font/google";
import "./globals.css";
import { lodgingBusinessSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/global/WhatsAppButton";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { CookieBanner } from "@/components/global/CookieBanner";
import { SITE } from "@/content/site";
import { BookingProvider } from "@/context/booking-context";

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
  metadataBase: new URL("https://springvillage.vercel.app"),
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
    "снять коттедж Карелия",
    "Spring Village коттедж",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spring Village — Коттедж WILD у Михалёвского озера",
    description: "A-frame 60 м² в карельском лесу. Пирс, лодки. 127 км от СПб.",
    type: "website",
    locale: "ru_RU",
    siteName: "Spring Village",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Коттедж WILD — Spring Village" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring Village — Коттедж WILD у Михалёвского озера",
    description: "A-frame 60 м² в карельском лесу. Пирс, лодки. 127 км от СПб.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema()) }}
        />
        {/* Yandex Metrica */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${SITE.yandexMetricaId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${SITE.yandexMetricaId}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <BookingProvider>
          <Header />
          <main className="flex-1 pb-[58px] lg:pb-0">{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileBookBar />
          <CookieBanner />
        </BookingProvider>
      </body>
    </html>
  );
}
