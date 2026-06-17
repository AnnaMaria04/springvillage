import { TOUR_BASE } from "@/content/tourBase";
import { FadeIn } from "@/components/ui/FadeIn";

export function TourBase() {
  return (
    <section id="territory" className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
              {TOUR_BASE.sectionLabel}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground]">
              {TOUR_BASE.title}
            </h2>
            <p className="text-[--muted-foreground] mt-4 max-w-xl mx-auto">
              {TOUR_BASE.subtitle}
            </p>
            <p className="text-[--muted-foreground] mt-2 max-w-xl mx-auto text-sm">
              {TOUR_BASE.description}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOUR_BASE.features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="bg-white rounded-2xl border border-[--border] p-6 hover:shadow-md transition-shadow h-full">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display text-base font-bold text-[--foreground] mb-2">{f.title}</h3>
                <p className="text-sm text-[--muted-foreground] leading-relaxed">{f.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
