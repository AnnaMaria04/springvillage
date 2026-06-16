import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, BedDouble, Bath, Star, CheckCircle, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cottageData: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  weekendPrice: number;
  rating: number;
  reviews: number;
  amenities: string[];
  color: string;
}> = {
  sosnovaya: {
    name: "Сосновая",
    description: "Просторный коттедж в сосновом бору с панорамными окнами и собственной баней.",
    longDescription: "Коттедж «Сосновая» расположен в самом сердце соснового бора. Огромные панорамные окна открывают захватывающий вид на пруд и лес. К вашим услугам — баня на 6 человек, просторная терраса с мебелью для отдыха и мангальная зона. Идеально подходит для семейного отдыха или компании друзей.",
    capacity: 8,
    bedrooms: 3,
    bathrooms: 2,
    price: 12000,
    weekendPrice: 15000,
    rating: 4.9,
    reviews: 47,
    amenities: ["Баня на 6 чел.", "Мангал и барбекю", "Высокоскоростной Wi-Fi", "Парковка на 3 авто", "Посудомоечная машина", "Стиральная машина", "Телевизор 65\"", "Детская кроватка (по запросу)", "Терраса с мебелью", "Пруд в 50 метрах"],
    color: "from-emerald-800 to-emerald-600",
  },
  lipovaya: {
    name: "Липовая",
    description: "Уютный коттедж для двоих с камином и видом на цветущий сад.",
    longDescription: "Романтический коттедж «Липовая» создан для двоих. Камин в гостиной, джакузи на двоих, живописный вид на цветущий липовый сад. Здесь всё продумано для максимального уединения и комфорта.",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 7500,
    weekendPrice: 9500,
    rating: 4.8,
    reviews: 63,
    amenities: ["Камин", "Джакузи", "Мангал", "Wi-Fi", "Парковка", "Кофемашина", "Телевизор", "Уединённый сад"],
    color: "from-amber-800 to-amber-600",
  },
  dubovaya: {
    name: "Дубовая",
    description: "Большой семейный коттедж с детской площадкой и бассейном.",
    longDescription: "Коттедж «Дубовая» — лучший выбор для большой семьи. 4 спальни, просторная гостиная, детская площадка, бассейн и баня. Большая крытая терраса идеальна для семейных обедов на свежем воздухе.",
    capacity: 12,
    bedrooms: 4,
    bathrooms: 3,
    price: 18000,
    weekendPrice: 22000,
    rating: 4.9,
    reviews: 31,
    amenities: ["Детская площадка", "Бассейн (летний)", "Баня", "Мангал", "Wi-Fi", "Парковка на 4 авто", "Телевизор в каждой спальне", "Посудомоечная машина", "Пинг-понг"],
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
    <div className="pt-20 min-h-screen bg-[--background]">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/cottages"
          className="inline-flex items-center gap-2 text-sm text-[--muted-foreground] hover:text-[--primary] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Все коттеджи
        </Link>
      </div>

      {/* Hero image */}
      <div className={`h-72 sm:h-96 bg-gradient-to-br ${cottage.color} flex items-center justify-center`}>
        <span className="font-serif text-8xl text-white/20 font-bold">{cottage.name[0]}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title row */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[--foreground]">
                  Коттедж «{cottage.name}»
                </h1>
                <div className="flex items-center gap-1.5 bg-[--muted] rounded-full px-3 py-1.5 shrink-0">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-sm">{cottage.rating}</span>
                  <span className="text-[--muted-foreground] text-sm">({cottage.reviews})</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[--muted-foreground]">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> До {cottage.capacity} гостей</span>
                <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {cottage.bedrooms} спальни</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {cottage.bathrooms} санузла</span>
              </div>
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
                  <div key={a} className="flex items-center gap-2.5 text-sm text-[--foreground]">
                    <CheckCircle className="w-4 h-4 text-[--primary] shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-[--muted] rounded-xl p-6">
              <h2 className="font-serif text-xl font-semibold text-[--foreground] mb-3">Правила</h2>
              <ul className="space-y-1.5 text-sm text-[--muted-foreground]">
                <li>Заезд с 14:00, выезд до 12:00</li>
                <li>Курение только на улице в отведённых местах</li>
                <li>Домашние животные — по согласованию</li>
                <li>Вечеринки с шумом после 23:00 запрещены</li>
              </ul>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-[--border] shadow-lg p-6 space-y-5">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-[--foreground]">
                    {cottage.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <span className="text-[--muted-foreground]">/ ночь</span>
                </div>
                <p className="text-sm text-[--muted-foreground]">
                  Пт–Вс: {cottage.weekendPrice.toLocaleString("ru-RU")} ₽ / ночь
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Бесплатная отмена за 48ч</Badge>
                <Badge variant="secondary">Без предоплаты</Badge>
              </div>

              <Button asChild size="lg" className="w-full">
                <Link href={`/booking?cottage=${slug}`}>Забронировать</Link>
              </Button>

              <a
                href="tel:+74951234567"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-[--border] text-sm font-medium text-[--foreground] hover:bg-[--muted] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Позвонить и уточнить
              </a>

              <p className="text-xs text-center text-[--muted-foreground]">
                Ответим в течение 15 минут
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
