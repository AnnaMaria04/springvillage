import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Activities } from "@/components/home/Activities";

export const metadata: Metadata = {
  title: "Активности — SUP, рыбалка у Михалёвского озера",
  description:
    "Летом: SUP, рыбалка, велосипеды, BBQ. Зимой: коньки, лыжи, зимняя рыбалка. Чем заняться в Spring Village круглый год.",
  alternates: { canonical: "/aktivnosti" },
  openGraph: {
    title: "Активности в Spring Village — SUP, рыбалка, природа",
    description: "Пирс, лодки, SUP, рыбалка, мангал — летний отдых у Михалёвского озера.",
    images: [{ url: "/images/feature-lake-sunset.jpg", width: 1200, height: 630, alt: "Михалёвское озеро — Spring Village" }],
  },
};

export default function AktivnostiPage() {
  return (
    <>
      <header className="relative bg-pine overflow-hidden min-h-[320px] flex flex-col justify-end">
        <Image
          src="/images/feature-lake-sunset.jpg"
          fill
          alt=""
          aria-hidden="true"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-20">
          <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-white/80">Активности</span>
          </nav>
          <p className="text-white/55 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            Озеро и лес круглый год
          </p>
          <h1
            className="font-display font-bold text-white leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Активности
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mt-6 max-w-xl">
            Озеро и лес круглый год — выбирайте сезон.
          </p>
        </div>
      </header>
      <Activities />
    </>
  );
}
