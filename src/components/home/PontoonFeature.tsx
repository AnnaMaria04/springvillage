import { ArrowUpRight } from "lucide-react";
import { PONTOON } from "@/content/pontoon";
import { BookingButton } from "@/components/booking/BookingButton";

export function PontoonFeature() {
  return (
    <section id="pontoon" aria-labelledby="pontoon-title" className="scroll-mt-24 bg-pine text-white py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-10 lg:mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#d8bf9f] mb-5">{PONTOON.label}</p>
            <h2 id="pontoon-title" className="font-display text-[clamp(2.6rem,4.5vw,4.5rem)] font-medium leading-[1.05] max-w-lg">{PONTOON.title}</h2>
          </div>
          <div className="max-w-lg">
            <p className="text-white/80 leading-relaxed">{PONTOON.description}</p>
            <p className="text-white/60 text-sm mt-4">200 метров частного берега. Лодка и SUP — включены в проживание.</p>
          </div>
        </div>
        <figure>
          <picture>
            <source media="(max-width: 640px)" srcSet={PONTOON.photos[0].small} />
            <img src={PONTOON.photos[0].src} alt={PONTOON.photos[0].alt} width={1920} height={1440} loading="lazy" className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1] object-cover object-[center_65%] rounded-sm" />
          </picture>
          <figcaption className="flex flex-wrap justify-between gap-2 mt-4 text-xs text-white/60">
            <span>Свой ритм. Свой берег.</span>
            <span>Михалёвское озеро · Spring Village</span>
          </figcaption>
        </figure>
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 mt-12 lg:mt-16">
          {PONTOON.photos.slice(1).map((photo, i) => (
            <figure key={photo.src}>
              <img src={photo.small} alt={photo.alt} width={960} height={720} loading="lazy" className="w-full aspect-[3/2] object-cover rounded-sm" />
              <figcaption className="mt-4 font-display text-2xl text-white/90">{i === 0 ? "Утро, которое хочется продлить" : "Только вода, лес и тишина"}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 pt-7 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-sm text-white/70">Ваше место у воды — рядом с коттеджем WILD.</p>
          <BookingButton className="inline-flex self-start items-center gap-3 text-sm text-white border-b border-[#d8bf9f] pb-2 hover:text-[#d8bf9f] transition-colors cursor-pointer focus-visible:outline-white">
            Выбрать даты отдыха <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </BookingButton>
        </div>
      </div>
    </section>
  );
}
