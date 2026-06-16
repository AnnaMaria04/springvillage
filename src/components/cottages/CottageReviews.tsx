import Link from "next/link";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";

export function CottageReviews({ slug }: { slug: string }) {
  const reviews = REVIEWS.filter((r) => r.cottage === slug);
  if (reviews.length === 0) return null;

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl font-bold text-[--foreground]">Отзывы</h2>
          <div className="flex items-center gap-1 text-sm text-[--muted-foreground]">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-[--foreground]">{avg}</span>
            ({reviews.length})
          </div>
        </div>
        <Link href="/reviews" className="text-xs text-[--primary] font-medium hover:underline">
          Все отзывы
        </Link>
      </div>

      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[--muted] rounded-2xl p-5">
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
            <p className="text-sm text-[--foreground] leading-relaxed">"{r.body}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
