import Link from "next/link";
import { Users, BedDouble, Bath, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cottages = [
  {
    slug: "sosnovaya",
    name: "Сосновая",
    description: "Просторный коттедж в сосновом бору с панорамными окнами и собственной баней на берегу пруда.",
    capacity: 8,
    bedrooms: 3,
    bathrooms: 2,
    price: 12000,
    rating: 4.9,
    reviews: 47,
    badge: "Хит сезона",
    badgeVariant: "default" as const,
    image: "/images/cottages/sosnovaya.jpg",
    amenities: ["Баня", "Барбекю", "Wi-Fi", "Парковка"],
  },
  {
    slug: "lipovaya",
    name: "Липовая",
    description: "Уютный коттедж для двоих с романтической атмосферой, камином и видом на цветущий сад.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 7500,
    rating: 4.8,
    reviews: 63,
    badge: "Для пар",
    badgeVariant: "accent" as const,
    image: "/images/cottages/lipovaya.jpg",
    amenities: ["Камин", "Барбекю", "Wi-Fi", "Джакузи"],
  },
  {
    slug: "dubovaya",
    name: "Дубовая",
    description: "Большой семейный коттедж с детской площадкой, волейбольной сеткой и большой открытой террасой.",
    capacity: 12,
    bedrooms: 4,
    bathrooms: 3,
    price: 18000,
    rating: 4.9,
    reviews: 31,
    badge: "Для семей",
    badgeVariant: "secondary" as const,
    image: "/images/cottages/dubovaya.jpg",
    amenities: ["Детская площадка", "Баня", "Wi-Fi", "Бассейн"],
  },
];

export function FeaturedCottages() {
  return (
    <section className="py-20 lg:py-28 bg-[--muted]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[--primary] font-semibold text-sm uppercase tracking-widest mb-3">
              Наши коттеджи
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[--foreground]">
              Популярные варианты
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/cottages">
              Все коттеджи
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cottages.map((cottage) => (
            <Link
              key={cottage.slug}
              href={`/cottages/${cottage.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-[--border] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 bg-gradient-to-br from-[--primary] to-[#3d6b20] overflow-hidden">
                {/* Placeholder gradient until real images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-4xl text-white/30 font-bold">{cottage.name[0]}</span>
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant={cottage.badgeVariant}>{cottage.badge}</Badge>
                </div>
                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 text-xs font-semibold text-[--foreground]">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {cottage.rating}
                  <span className="text-[--muted-foreground] font-normal">({cottage.reviews})</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-[--foreground] mb-2 group-hover:text-[--primary] transition-colors">
                  Коттедж «{cottage.name}»
                </h3>
                <p className="text-sm text-[--muted-foreground] leading-relaxed mb-4 line-clamp-2">
                  {cottage.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-[--muted-foreground] mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {cottage.capacity} гостей
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" /> {cottage.bedrooms} спальни
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5" /> {cottage.bathrooms} санузла
                  </span>
                </div>

                {/* Amenity tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cottage.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs bg-[--muted] text-[--muted-foreground] rounded-full px-2.5 py-0.5"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between border-t border-[--border] pt-4">
                  <div>
                    <span className="text-xl font-bold text-[--foreground]">
                      {cottage.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="text-sm text-[--muted-foreground]"> / ночь</span>
                  </div>
                  <span className="text-[--primary] text-sm font-medium group-hover:underline flex items-center gap-1">
                    Подробнее <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
