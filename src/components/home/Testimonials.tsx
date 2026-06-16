"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    author: "Анна Смирнова",
    date: "Май 2024",
    rating: 5,
    stayType: "Семейный отдых",
    body: "Провели здесь 5 дней с семьёй — дети в восторге! Коттедж чистый, уютный, баня просто шикарная. Природа вокруг — сказка. Обязательно вернёмся следующим летом!",
    initials: "АС",
  },
  {
    author: "Дмитрий Козлов",
    date: "Апрель 2024",
    rating: 5,
    stayType: "Корпоратив",
    body: "Организовывали корпоративный выезд на 15 человек. Всё прошло идеально: просторный коттедж, мангал, баня, отличное расположение. Персонал отзывчивый и внимательный.",
    initials: "ДК",
  },
  {
    author: "Мария и Алексей",
    date: "Март 2024",
    rating: 5,
    stayType: "Романтические выходные",
    body: "Брали коттедж на годовщину свадьбы. Атмосфера волшебная — камин, тихий лес, уединение. Это именно то, что нам было нужно. Персонал приготовил сюрприз — украсили комнату. Спасибо!",
    initials: "МА",
  },
  {
    author: "Игорь Петров",
    date: "Февраль 2024",
    rating: 4,
    stayType: "Зимний отдых",
    body: "Зимой здесь особенно красиво — снег, тишина, протопленная баня. Коттедж тёплый, всё оборудование работает. Рекомендую для тех, кто хочет настоящей зимней сказки.",
    initials: "ИП",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const go = useCallback(
    (idx: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((idx + reviews.length) % reviews.length);
      setTimeout(() => setIsAnimating(false), 300);
    },
    [isAnimating]
  );

  useEffect(() => {
    const id = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(id);
  }, [current, go]);

  const review = reviews[current];

  return (
    <section className="py-20 lg:py-28 bg-[--primary] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-emerald-300 font-semibold text-sm uppercase tracking-widest mb-3">
            Отзывы гостей
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Что говорят наши гости
          </h2>
          {/* Aggregate stars */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-white/70 text-sm">4.9 из 5 (185+ отзывов)</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div
            className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/15">
              <Quote className="absolute top-6 left-8 w-10 h-10 text-white/15" />

              <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 relative z-10">
                "{review.body}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-emerald-400/20 border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{review.author}</div>
                    <div className="text-sm text-white/60">
                      {review.stayType} · {review.date}
                    </div>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go(current - 1)}
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-white w-6" : "bg-white/30"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(current + 1)}
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Следующий"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
