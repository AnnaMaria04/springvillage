import Image from "next/image";
import Link from "next/link";
import { BookingButton } from "@/components/booking/BookingButton";

export function Hero() {
  return (
    <section aria-label="Spring Village — отдых у озера" className="relative h-[85svh] min-h-[560px] max-h-[760px] overflow-hidden bg-pine text-white">
      <Image
        src="/images/lake/cottage-pontoon-mist-1920.webp"
        alt="Понтон коттеджа WILD и Михалёвское озеро в утреннем тумане"
        fill preload sizes="100vw"
        className="object-cover object-[58%_60%] sm:object-[center_60%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,14,0.5)_0%,rgba(12,18,14,0.04)_28%,rgba(12,18,14,0.22)_48%,rgba(12,18,14,0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-14 lg:pb-16">
        <p className="text-white/80 text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] mb-3">Spring Village · коттедж WILD</p>
        <h1 className="font-display font-semibold text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.02] tracking-tight max-w-xl">
          Тихая вода,<br />карельский лес
        </h1>
        <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-sm mt-4 mb-6">Частный A-frame, свой берег и новый просторный понтон. В 127 км от Петербурга.</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <BookingButton className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-wood text-white text-sm font-semibold hover:bg-wood/90 transition-colors cursor-pointer focus-ring-sand">Выбрать даты</BookingButton>
          <Link href="/dom" className="text-white/85 hover:text-white text-sm font-medium link-underline py-3 focus-ring-sand">О коттедже</Link>
        </div>
      </div>
    </section>
  );
}
