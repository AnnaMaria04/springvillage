import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, BedDouble, Bath, Star, CheckCircle, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PriceCalculator } from "@/components/cottages/PriceCalculator";
import { MobileStickyBar } from "@/components/cottages/MobileStickyBar";
import { CottageReviews } from "@/components/cottages/CottageReviews";
import { RelatedCottages } from "@/components/cottages/RelatedCottages";

const cottageData: Record<string, {
  name: string;
  tagline: string;
  longDescription: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  priceWeekday: number;
  priceWeekend: number;
  rating: number;
  reviews: number;
  badge?: string;
  amenities: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  color: string;
}> = {
  sosnovaya: {
    name: "Сосновая",
    tagline: "Панорамные окна, пруд, баня — всё в одном",
    longDescription: "Коттедж «Сосновая» расположен в самом сердце соснового бора. Огромные панорамные окна открывают захватывающий вид на пруд и лес. К вашим услугам — баня на 6 человек, просторная терраса с мебелью для отдыха и мангальная зона. Идеально подходит для семейного отдыха или компании друзей.",
    capacity: 8,
    bedrooms: 3,
    bathrooms: 2,
    priceWeekday: 12000,
    priceWeekend: 15000,
    rating: 4.9,
    reviews: 47,
    badge: "Хит сезона",
    amenities: ["Баня на 6 чел.", "Мангал и барбекю", "Высокоскоростной Wi-Fi", "Парковка на 3 авто", "Посудомоечная машина", "Стиральная машина", "Телевизор 65\"", "Детская кроватка (по запросу)", "Терраса с мебелью", "Пруд в 50 метрах"],
    highlights: ["Панорамные окна на пруд", "Баня на 6 человек включена", "Прямо в сосновом бору", "До Москвы 50 км"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Баня (топка 1 раз в сутки)", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Питание", "Доп. топка бани (+500 ₽)", "Трансфер (по запросу)"],
    color: "from-emerald-800 to-emerald-600",
  },
  lipovaya: {
    name: "Липовая",
    tagline: "Камин, джакузи, цветущий сад — для двоих",
    longDescription: "Романтический коттедж «Липовая» создан для двоих. Камин в гостиной, джакузи на двоих, живописный вид на цветущий липовый сад. Здесь всё продумано для максимального уединения и комфорта пары.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    priceWeekday: 7500,
    priceWeekend: 9500,
    rating: 4.8,
    reviews: 63,
    badge: "Для пар",
    amenities: ["Камин", "Джакузи", "Мангал", "Wi-Fi", "Парковка", "Кофемашина", "Телевизор", "Уединённый сад"],
    highlights: ["Камин в гостиной", "Джакузи для двоих", "Уединённый сад", "Идеально для пар"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Дрова для камина", "Уборка перед заездом"],
    notIncluded: ["Питание", "Трансфер (по запросу)"],
    color: "from-amber-800 to-amber-600",
  },
  dubovaya: {
    name: "Дубовая",
    tagline: "Большой дом для большой семьи — с бассейном",
    longDescription: "Коттедж «Дубовая» — лучший выбор для большой семьи или компании. 4 спальни, просторная гостиная, детская площадка, летний бассейн и баня. Большая крытая терраса идеальна для семейных обедов.",
    capacity: 12,
    bedrooms: 4,
    bathrooms: 3,
    priceWeekday: 18000,
    priceWeekend: 22000,
    rating: 4.9,
    reviews: 31,
    badge: "Для семей",
    amenities: ["Детская площадка", "Бассейн (летний)", "Баня", "Мангал", "Wi-Fi", "Парковка на 4 авто", "Телевизор в каждой спальне", "Посудомоечная машина", "Пинг-понг"],
    highlights: ["Летний бассейн", "Детская площадка", "Баня для компании", "До 12 гостей"],
    included: ["Постельное бельё и полотенца", "Посуда и кухонные принадлежности", "Wi-Fi", "Парковка", "Баня (топка 1 раз в сутки)", "Дрова для мангала", "Уборка перед заездом"],
    notIncluded: ["Питание", "Доп. топка бани (+500 ₽)", "Трансфер (по запросу)"],
    color: "from-green-700 to-teal-600",
  },
};

export function generateStaticParams() {
  return Object.keys(cottageData).map((slug) => ({ slug }));
}

export default async function CottagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cottage = cottageData[slug];
  if (!cottage) notFound();

  return (
    <div className="pt-20 min-h-screen bg-[--background] pb-24 lg:pb-0">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <Link href="/cottages" className="inline-flex items-center gap-1.5 text-sm text-[--muted-foreground] hover:text-[--primary] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Все коттеджи
          </Link>
          <button className="inline-flex items-center gap-1.5 text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors">
            <Share2 className="w-4 h-4" /> Поделиться
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className={`h-72 sm:h-[420px] lg:h-[480px] bg-gradient-to-br ${cottage.color} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-[200px] text-white/10 font-bold leading-none select-none">
            {cottage.name[0]}
          </span>
        </div>
        {cottage.badge && (
          <div className="absolute top-6 left-6">
            <Badge className="text-sm px-3 py-1">{cottage.badge}</Badge>
          </div>
        )}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="inline-flex items-center gap-1.5 bg-white/95 rounded-full px-3 py-1.5 text-sm font-semibold text-[--foreground]">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {cottage.rating} · {cottage.reviews} отзывов
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[--foreground] mb-1">
                Коттедж «{cottage.name}»
              </h1>
              <p className="text-[--muted-foreground] text-lg">{cottage.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[--muted-foreground]">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> До {cottage.capacity} гостей</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {cottage.bedrooms} спальни</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {cottage.bathrooms} санузла</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cottage.highlights.map((h) => (
                <div key={h} className="bg-[--muted] rounded-xl p-3 text-center text-sm font-medium text-[--foreground]">
                  {h}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-[--foreground] mb-3">Описание</h2>
              <p className="text-[--muted-foreground] leading-relaxed">{cottage.longDescription}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-[--foreground] mb-4">Удобства</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cottage.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-[--primary] shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Included / not included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-[--muted] rounded-xl p-5">
                <h3 className="font-semibold text-[--foreground] mb-3 text-sm uppercase tracking-wide">Включено</h3>
                <ul className="space-y-1.5">
                  {cottage.included.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[--foreground]">
                      <span className="text-[--primary] font-bold shrink-0 mt-0.5">✓</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[--muted] rounded-xl p-5">
                <h3 className="font-semibold text-[--foreground] mb-3 text-sm uppercase tracking-wide">Не включено</h3>
                <ul className="space-y-1.5">
                  {cottage.notIncluded.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[--muted-foreground]">
                      <span className="shrink-0 mt-0.5">✕</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rules */}
            <div className="border border-[--border] rounded-xl p-5">
              <h2 className="font-serif text-xl font-semibold text-[--foreground] mb-3">Правила</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm text-[--muted-foreground]">
                <li>📅 Заезд с 14:00, выезд до 12:00</li>
                <li>🚭 Курение только на улице</li>
                <li>🐾 Питомцы по согласованию</li>
                <li>🔇 Тишина после 23:00</li>
                <li>🧹 Уборка включена</li>
                <li>🔑 Самостоятельный заезд</li>
              </ul>
            </div>

            {/* Reviews */}
            <CottageReviews slug={slug} />

            {/* Related */}
            <RelatedCottages currentSlug={slug} />
          </div>

          {/* Booking sidebar — desktop */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl border border-[--border] shadow-lg p-6">
              <PriceCalculator
                slug={slug}
                priceWeekday={cottage.priceWeekday}
                priceWeekend={cottage.priceWeekend}
                maxGuests={cottage.capacity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <MobileStickyBar slug={slug} price={cottage.priceWeekday} />
    </div>
  );
}
