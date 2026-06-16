import { Star } from "lucide-react";

const reviewsBySlug: Record<string, Array<{
  author: string;
  rating: number;
  body: string;
  stayType: string;
  date: string;
  initials: string;
}>> = {
  sosnovaya: [
    { author: "Анна Смирнова", rating: 5, body: "Провели здесь 5 дней с семьёй — дети в восторге! Баня просто шикарная, природа сказочная.", stayType: "Семейный отдых", date: "Май 2024", initials: "АС" },
    { author: "Павел Белов", rating: 5, body: "Отличный коттедж! Всё как на фотографиях. Баня топовая — парились 3 вечера подряд. Рекомендую!", stayType: "Компания", date: "Апрель 2024", initials: "ПБ" },
    { author: "Ирина Фёдорова", rating: 4, body: "Хорошо провели время. Коттедж чистый, уютный. Вид из окна на пруд просто завораживает.", stayType: "Семья", date: "Март 2024", initials: "ИФ" },
  ],
  lipovaya: [
    { author: "Мария и Алексей", rating: 5, body: "Брали на годовщину. Атмосфера волшебная — камин, тихий лес, уединение. Персонал украсил комнату сюрпризом!", stayType: "Романтические выходные", date: "Март 2024", initials: "МА" },
    { author: "Светлана К.", rating: 5, body: "Идеальное место для двоих. Джакузи, камин, тишина. Уезжать не хотелось совсем.", stayType: "Пара", date: "Февраль 2024", initials: "СК" },
  ],
  dubovaya: [
    { author: "Дмитрий Козлов", rating: 5, body: "Организовывали корпоратив на 15 человек. Всё идеально: просторно, удобно, персонал внимательный.", stayType: "Корпоратив", date: "Апрель 2024", initials: "ДК" },
    { author: "Семья Петровых", rating: 5, body: "Взяли на день рождения дочки — дети были счастливы! Площадка, бассейн, баня — всё есть.", stayType: "Семья", date: "Июнь 2024", initials: "СП" },
  ],
};

const defaultReviews = [
  { author: "Игорь Петров", rating: 4, body: "Зимой здесь особенно красиво — снег, тишина, протопленная баня. Рекомендую!", stayType: "Зимний отдых", date: "Февраль 2024", initials: "ИП" },
  { author: "Ольга Новикова", rating: 5, body: "Замечательный отдых! Всё чисто, уютно. Персонал всегда готов помочь.", stayType: "Отдых", date: "Январь 2024", initials: "ОН" },
];

export function CottageReviews({ slug }: { slug: string }) {
  const reviews = reviewsBySlug[slug] ?? defaultReviews;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="font-serif text-xl font-semibold text-[--foreground]">Отзывы</h2>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{avg}</span>
          <span className="text-[--muted-foreground]">({reviews.length} отзыва)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[--muted] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[--primary]/10 flex items-center justify-center text-[--primary] font-bold text-xs shrink-0">
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[--foreground]">{r.author}</div>
                  <div className="text-xs text-[--muted-foreground]">{r.stayType} · {r.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-[--border] fill-[--border]"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-[--foreground] leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
