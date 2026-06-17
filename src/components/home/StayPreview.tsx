import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { HOUSE } from "@/content/house";
import { SITE } from "@/content/site";

const features = [
  "Панорамное остекление",
  "Две изолированные спальни",
  "Кухня-гостиная с камином",
  "Финская баня и терраса у воды",
  "Wi-Fi, Smart TV",
];

export function StayPreview() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-cream border border-border hover-lift">
          {/* Photo */}
          <div className="media relative min-h-[340px] lg:min-h-[560px]">
            <div
              className="media-img absolute inset-0 bg-stone-300 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/stay.jpg')" }}
            />
          </div>

          {/* Panel */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-pine mb-6">
              {HOUSE.name} — A-frame у озера
            </h2>

            {/* Pager chip */}
            <Link
              href="/galereya"
              className="inline-flex items-center self-start rounded-lg overflow-hidden mb-8 text-sm group/chip"
            >
              <span className="bg-moss/20 text-moss font-semibold px-3 py-2">1 / 5</span>
              <span className="bg-moss text-white px-4 py-2 inline-flex items-center gap-2 font-medium transition-colors group-hover/chip:bg-pine">
                Смотреть галерею
                <ArrowRight className="w-4 h-4 transition-transform group-hover/chip:translate-x-0.5" />
              </span>
            </Link>

            {/* Capacity */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-pine flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg text-foreground">до {HOUSE.capacity} взрослых + дети</span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-moss shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Price */}
            <p className="font-display text-2xl font-bold text-pine mb-7">
              Стоимость {SITE.priceFromLabel.toLowerCase()} / 3 суток
            </p>

            {/* Booking button */}
            <Link
              href="/tseny"
              className="btn-lux inline-flex items-center justify-center self-start h-13 px-12 rounded-full bg-wood text-white text-sm font-semibold uppercase tracking-wider"
            >
              Забронировать
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
