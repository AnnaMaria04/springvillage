import Link from "next/link";
import { Users, BedDouble, Bath, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COTTAGES } from "@/lib/data";

export default function CottagesPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      {/* Page header */}
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">
            Каталог
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Наши коттеджи
          </h1>
          <p className="text-[--muted-foreground] text-lg max-w-xl">
            {COTTAGES.length} коттеджей — от уютных для двоих до резиденций на 12 гостей.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COTTAGES.map((cottage) => (
            <Link
              key={cottage.slug}
              href={`/cottages/${cottage.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-[--border] hover-lift transition-all duration-200"
            >
              {/* Image area */}
              <div className={`relative h-52 bg-gradient-to-br ${cottage.color} overflow-hidden`}>
                <span className="absolute inset-0 flex items-center justify-center font-display text-8xl text-white/10 font-bold select-none">
                  {cottage.name[0]}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  {cottage.badge && <Badge className="text-xs">{cottage.badge}</Badge>}
                </div>

                {/* Urgency */}
                {cottage.urgency && (
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold bg-white/95 text-orange-600 rounded-full px-3 py-1 inline-block">
                      🔥 {cottage.urgency}
                    </span>
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-black/35 text-white rounded-full px-2.5 py-1 text-xs font-semibold">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {cottage.rating}
                  <span className="text-white/50 font-normal">({cottage.reviewCount})</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h2 className="font-display text-xl font-bold text-[--foreground] group-hover:text-[--primary] transition-colors mb-1">
                  «{cottage.name}»
                </h2>
                <p className="text-xs text-[--muted-foreground] mb-3">{cottage.tagline}</p>
                <p className="text-sm text-[--muted-foreground] leading-relaxed mb-4 line-clamp-2">
                  {cottage.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-[--muted-foreground] mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {cottage.capacity}</span>
                  <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {cottage.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {cottage.bathrooms}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-[--border]">
                  <div>
                    <span className="font-bold text-[--foreground]">
                      {cottage.priceWeekday.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="text-xs text-[--muted-foreground] ml-1">/ ночь</span>
                  </div>
                  <span className="text-xs font-semibold text-[--primary] group-hover:underline">
                    Подробнее →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
