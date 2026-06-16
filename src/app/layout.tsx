import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  title: "Спринг Вилладж — Аренда коттеджей",
  description:
    "Уютные коттеджи и виллы для отдыха в Спринг Вилладж. Бронируйте онлайн — лучшие цены гарантированы.",
  keywords: ["аренда коттеджей", "отдых на природе", "Спринг Вилладж", "загородный отдых"],
  openGraph: {
    title: "Спринг Вилладж — Аренда коттеджей",
    description: "Уютные коттеджи и виллы для отдыха в природе",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
