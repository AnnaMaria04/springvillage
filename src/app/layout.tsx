import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { lodgingBusinessSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/global/WhatsAppButton";
import { MobileBookBar } from "@/components/layout/MobileBookBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
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
    "A-frame коттедж в карельском лесу на берегу Михалёвского озера. 90 км от Петербурга. Финская баня, байдарки, тишина.",
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
    description: "A-frame в карельском лесу. Баня, байдарки, озеро. 90 км от СПб.",
    type: "website",
    locale: "ru_RU",
    siteName: "Spring Village",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema()) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBookBar />
      </body>
    </html>
  );
}
