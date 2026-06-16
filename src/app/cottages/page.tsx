import Link from "next/link";
import { Users, BedDouble, Bath, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const allCottages = [
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
    amenities: ["Баня", "Барбекю", "Wi-Fi", "Парковка"],
    color: "from-emerald-800 to-emerald-600",
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
    amenities: ["Камин", "Барбекю", "Wi-Fi", "Джакузи"],
    color: "from-amber-800 to-amber-600",
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
    amenities: ["Детская площадка", "Баня", "Wi-Fi", "Бассейн"],
    color: "from-green-700 to-teal-600",
  },
  {
    slug: "berezovaya",
    name: "Берёзовая",
    description: "Светлый коттедж в берёзовой роще, идеален для спокойного уединённого отдыха.",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    price: 10000,
    rating: 4.7,
    reviews: 24,
    badge: null,
    amenities: ["Баня", "Барбекю", "Wi-Fi"],
    color: "from-stone-600 to-stone-400",
  },
  {
    slug: "kedrovaya",
    name: "Кедровая",
    description: "Премиум-коттедж с полным набором удобств: бассейн, сауна, кинотеатр и летняя кухня.",
    capacity: 10,
    bedrooms: 4,
    bathrooms: 3,
    price: 22000,
    rating: 5.0,
    reviews: 18,
    badge: "Премиум",
    amenities: ["Бассейн", "Сауна", "Кинотеатр", "Wi-Fi"],
    color: "from-slate-700 to-slate-500",
  },
  {
    slug: "yablonevaya",
    name: "Яблоневая",
    description: "Уютный небольшой коттедж с собственным яблоневым садом и верандой с качелями.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 6500,
    rating: 4.6,
    reviews: 42,
    badge: null,
    amenities: ["Сад", "Барбекю", "Wi-Fi"],
    color: "from-rose-800 to-rose-600",
  },
];

export default function CottagesPage() {
  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      {/* Page header */}
      <div className="bg-[--muted] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Наши коттеджи
          </h1>
          <p className="text-[--muted-foreground] text-lg max-w-xl">
            {allCottages.length} коттеджей на любой вкус и бюджет — от уютных для двоих до больших семейных резиденций.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCottages.map((cottage) => (
            <Link
              key={cottage.slug}
              href={`/cottages/${cottage.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-[--border] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`relative h-52 bg-gradient-to-br ${cottage.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-5xl text-white/20 font-bold">{cottage.name[0]}</span>
                </div>
                {cottage.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge>{cottage.badge}</Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 text-xs font-semibold">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {cottage.rating}
                  <span className="text-[--muted-foreground] font-normal">({cottage.reviews})</span>
                </div>
              </div>

              <div className="p-5">
                <h2 className="font-serif text-xl font-bold mb-2 group-hover:text-[--primary] transition-colors">
                  Коттедж «{cottage.name}»
                </h2>
                <p className="text-sm text-[--muted-foreground] mb-4 line-clamp-2">
                  {cottage.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-[--muted-foreground] mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {cottage.capacity}</span>
                  <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {cottage.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {cottage.bathrooms}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[--border] pt-4">
                  <div>
                    <span className="text-xl font-bold">{cottage.price.toLocaleString("ru-RU")} ₽</span>
                    <span className="text-sm text-[--muted-foreground]"> / ночь</span>
                  </div>
                  <span className="text-[--primary] text-sm font-medium flex items-center gap-1">
                    Подробнее <ArrowRight className="w-3.5 h-3.5" />
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
