import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { lodgingBusinessSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/global/WhatsAppButton";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { CookieBanner } from "@/components/global/CookieBanner";
import { SITE } from "@/content/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Spring Village — Коттедж WILD у Михалёвского озера",
    template: "%s — Spring Village",
  },
  description:
    "A-frame коттедж в карельском лесу на берегу Михалёвского озера. 127 км от Петербурга. Финская баня, байдарки, тишина.",
  keywords: [
    "коттедж Михалёво",
    "аренда коттеджа Выборгский район",
    "A-frame аренда Ленобласть",
    "отдых на Михалёвском озере",
    "дом у озера Выборгский район",
    "коттедж с баней у озера Ленобласть",
    "Spring Village",
  ],
  openGraph: {
    title: "Коттедж WILD — Spring Village у Михалёвского озера",
    description: "A-frame в карельском лесу. Баня, байдарки, озеро. 127 км от СПб.",
    type: "website",
    locale: "ru_RU",
    siteName: "Spring Village",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable} h-full`}>
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBookBar />
        <CookieBanner />
      </body>
    </html>
  );
}
