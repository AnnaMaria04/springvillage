import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export type Service = {
  image: string;
  title: string;
  description: string;
  detail: string;
  price: string;
  priceNote?: string;
  /** If set, button is a link; otherwise opens BookingModal */
  href?: string;
  ctaLabel?: string;
  source?: string;
};

export function ServiceCard({ service }: { service: Service }) {
  const cta = (
    <span className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-2xl bg-[--primary] text-white text-sm font-semibold hover:bg-[--primary-light] transition-colors cursor-pointer w-full">
      {service.ctaLabel ?? "Забронировать"}
      <ArrowRight className="w-4 h-4" />
    </span>
  );

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[--border] hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div
        className="relative aspect-[4/3] bg-stone-300 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('${service.image}')` }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        {/* Price chip */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3.5 py-1.5">
          <span className="text-sm font-bold text-[--foreground]">{service.price}</span>
          {service.priceNote && (
            <span className="text-xs text-[--muted-foreground] ml-1">{service.priceNote}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-[--foreground] mb-2">{service.title}</h3>
        <p className="text-sm text-[--muted-foreground] leading-relaxed mb-3">
          {service.description}
        </p>
        <p className="text-xs font-medium text-[--primary] mb-5">{service.detail}</p>

        <div className="mt-auto">
          {service.href ? (
            <Link href={service.href}>{cta}</Link>
          ) : (
            <BookingModal source={service.source ?? "service_card"} trigger={cta} />
          )}
        </div>
      </div>
    </div>
  );
}
