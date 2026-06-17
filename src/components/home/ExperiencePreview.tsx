import Link from "next/link";
import { ArrowRight } from "lucide-react";

const experiences = [
  { image: "/images/exp-sauna.jpg", title: "Финская баня у воды" },
  { image: "/images/exp-lake.jpg", title: "Байдарки и озеро" },
  { image: "/images/exp-forest.jpg", title: "Лес и тишина" },
];

export function ExperiencePreview() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Впечатления
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Лето и зима у озера
            </h2>
          </div>
          <Link
            href="/aktivnosti"
            className="shrink-0 inline-flex items-center gap-2 text-foreground font-medium link-underline"
          >
            Все активности <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {experiences.map((e) => (
            <Link key={e.title} href="/aktivnosti" className="group block">
              <div className="media relative aspect-[3/4] rounded-3xl">
                <div
                  className="media-img absolute inset-0 bg-stone-300 bg-cover bg-center"
                  style={{ backgroundImage: `url('${e.image}')` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(20,28,22,0.7),transparent)]" />
                <h3 className="absolute bottom-6 left-6 right-6 font-display text-2xl font-bold text-white leading-tight">
                  {e.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
