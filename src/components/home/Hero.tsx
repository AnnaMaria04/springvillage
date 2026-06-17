import Link from "next/link";
import { CONTACT } from "@/content/site";
import { BnovoModal } from "@/components/booking/BnovoModal";

export function Hero() {
  return (
    <section
      className="relative h-[92vh] min-h-[600px] flex items-end bg-pine bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Legibility scrim — flat, bottom-weighted */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(20,28,22,0.72),transparent)]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 lg:pb-24">
        <p className="text-white/60 text-sm tracking-wide mb-5">{CONTACT.addressShort}</p>
        <h1
          className="font-display font-bold text-white leading-[0.95] tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
        >
          Тихая вода,<br />карельский лес
        </h1>
        <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-md mb-9">
          Частный A-frame на берегу Михалёвского озера. Два часа от Петербурга.
        </p>
        {/* Key facts strip */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {[
            { label: "Заезд", value: "от 15:00" },
            { label: "Выезд", value: "до 12:00" },
            { label: "Гости", value: "до 5 взрослых" },
            { label: "От СПб", value: "127 км" },
            { label: "Цена", value: "от 20 000 ₽/ночь" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase tracking-wider">{label}</span>
              <span className="text-white text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <BnovoModal
            trigger={
              <button className="btn-lux h-13 px-9 rounded-full bg-white text-pine text-base font-semibold hover:bg-white/90 cursor-pointer">
                Забронировать
              </button>
            }
          />
          <Link
            href="/dom"
            className="text-white/85 hover:text-white text-base font-medium link-underline"
          >
            О коттедже
          </Link>
        </div>
      </div>
    </section>
  );
}
