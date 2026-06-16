import { Star } from "lucide-react";

const reviews = [
  { author: "Анна Смирнова", date: "Май 2024", rating: 5, stayType: "Семейный отдых", cottage: "Сосновая", body: "Провели здесь 5 дней с семьёй — дети в восторге! Коттедж чистый, уютный, баня просто шикарная. Природа вокруг — сказка. Обязательно вернёмся следующим летом!", initials: "АС" },
  { author: "Дмитрий Козлов", date: "Апрель 2024", rating: 5, stayType: "Корпоратив", cottage: "Дубовая", body: "Организовывали корпоративный выезд на 15 человек. Всё прошло идеально: просторный коттедж, мангал, баня, отличное расположение. Персонал отзывчивый и внимательный.", initials: "ДК" },
  { author: "Мария и Алексей", date: "Март 2024", rating: 5, stayType: "Романтические выходные", cottage: "Липовая", body: "Брали коттедж на годовщину свадьбы. Атмосфера волшебная — камин, тихий лес, уединение. Персонал приготовил сюрприз — украсили комнату. Спасибо огромное!", initials: "МА" },
  { author: "Игорь Петров", date: "Февраль 2024", rating: 4, stayType: "Зимний отдых", cottage: "Берёзовая", body: "Зимой здесь особенно красиво — снег, тишина, протопленная баня. Коттедж тёплый, всё оборудование работает. Рекомендую для зимней сказки.", initials: "ИП" },
  { author: "Светлана Морозова", date: "Январь 2024", rating: 5, stayType: "Новый год", cottage: "Кедровая", body: "Встречали Новый год большой компанией! Коттедж огромный, есть всё — бассейн, сауна, большая кухня. Незабываемые впечатления. Уже бронируем на следующий год!", initials: "СМ" },
  { author: "Павел Орлов", date: "Декабрь 2023", rating: 5, stayType: "Семейный отдых", cottage: "Яблоневая", body: "Небольшой уютный коттедж для нас с женой и ребёнком. Очень чисто, всё необходимое есть. Яблоневый сад — отдельная история: красиво и умиротворяюще.", initials: "ПО" },
];

const ratingDistribution = [
  { stars: 5, count: 142, pct: 77 },
  { stars: 4, count: 31, pct: 17 },
  { stars: 3, count: 8, pct: 4 },
  { stars: 2, count: 3, pct: 2 },
  { stars: 1, count: 1, pct: 0 },
];

export default function ReviewsPage() {
  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      <div className="bg-[--muted] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Отзывы гостей
          </h1>
          <p className="text-[--muted-foreground] text-lg">185 отзывов от реальных гостей</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-[--border] p-6">
              <div className="text-center mb-5">
                <div className="font-serif text-6xl font-bold text-[--foreground]">4.9</div>
                <div className="flex justify-center gap-0.5 mt-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-[--muted-foreground] mt-1">из 5 баллов</div>
              </div>
              <div className="space-y-2">
                {ratingDistribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2 text-sm">
                    <span className="w-4 text-[--muted-foreground]">{row.stars}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 h-2 bg-[--muted] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[--primary] rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-[--muted-foreground]">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review list */}
          <div className="lg:col-span-3 space-y-5">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[--border] p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[--primary]/10 flex items-center justify-center text-[--primary] font-bold text-sm shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[--foreground]">{review.author}</div>
                      <div className="text-xs text-[--muted-foreground]">
                        {review.stayType} · {review.cottage} · {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-[--muted] fill-[--muted]"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[--foreground] text-sm leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
