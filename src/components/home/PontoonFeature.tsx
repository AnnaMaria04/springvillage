import { ArrowRight } from "lucide-react";
import { PONTOON } from "@/content/pontoon";
import { BookingButton } from "@/components/booking/BookingButton";

export function PontoonFeature() {
  const [main, ...details] = PONTOON.photos;
  return (
    <section id="pontoon" aria-labelledby="pontoon-title" className="scroll-mt-24 bg-pine text-white py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1.35fr_1fr] gap-7 lg:gap-10 items-center">
        <figure>
          <picture>
            <source media="(max-width: 640px)" srcSet={main.small} />
            <img src={main.src} alt={main.alt} width={1920} height={1440} loading="lazy" className="w-full aspect-[3/2] object-cover object-[center_65%] rounded-2xl" />
          </picture>
          <figcaption className="mt-3 text-xs text-white/60">Михалёвское озеро · берег коттеджа WILD</figcaption>
        </figure>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#d8bf9f] mb-3">{PONTOON.label}</p>
          <h2 id="pontoon-title" className="font-display text-3xl sm:text-4xl font-semibold leading-[1.1] max-w-sm">{PONTOON.title}</h2>
          <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-md">{PONTOON.description}</p>
          <p className="text-white/60 text-sm mt-3">Лодка и SUP включены в проживание.</p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {details.map((photo) => <img key={photo.src} src={photo.small} alt={photo.alt} width={960} height={720} loading="lazy" className="w-full aspect-[3/2] object-cover rounded-xl" />)}
          </div>
          <BookingButton className="inline-flex items-center gap-2 mt-5 py-3 text-sm text-[#e0c19f] hover:text-white transition-colors cursor-pointer focus-ring-sand">
            Выбрать даты отдыха <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </BookingButton>
        </div>
      </div>
    </section>
  );
}
