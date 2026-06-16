"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarDays, Users, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/data";

interface PriceCalculatorProps {
  slug: string;
  priceWeekday: number;
  priceWeekend: number;
  maxGuests: number;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0; // Fri–Sun
}

function calcStay(checkIn: string, checkOut: string, weekday: number, weekend: number) {
  if (!checkIn || !checkOut) return null;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (end <= start) return null;

  let baseTotal = 0;
  let nights = 0;
  const cur = new Date(start);
  while (cur < end) {
    baseTotal += isWeekend(cur) ? weekend : weekday;
    nights++;
    cur.setDate(cur.getDate() + 1);
  }

  // Discount tiers
  let discountPct = 0;
  let discountLabel = "";
  if (nights >= 30) { discountPct = 30; discountLabel = "Скидка 30% (месяц)"; }
  else if (nights >= 7) { discountPct = 15; discountLabel = "Скидка 15% (неделя)"; }

  const discount = Math.round(baseTotal * discountPct / 100);
  const total = baseTotal - discount;

  return { nights, baseTotal, discount, discountPct, discountLabel, total };
}

export function PriceCalculator({ slug, priceWeekday, priceWeekend, maxGuests }: PriceCalculatorProps) {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [result, setResult] = useState<ReturnType<typeof calcStay>>(null);

  useEffect(() => {
    setResult(calcStay(checkIn, checkOut, priceWeekday, priceWeekend));
  }, [checkIn, checkOut, priceWeekday, priceWeekend]);

  const bookingUrl = `/booking?cottage=${slug}${checkIn ? `&check_in=${checkIn}` : ""}${checkOut ? `&check_out=${checkOut}` : ""}&guests=${guests}`;

  return (
    <div className="space-y-4">
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold text-[--foreground]">
          от {priceWeekday.toLocaleString("ru-RU")} ₽
        </span>
        <span className="text-[--muted-foreground] text-sm">/ ночь</span>
      </div>
      <p className="text-xs text-[--muted-foreground]">
        Выходные (Пт–Вс): {priceWeekend.toLocaleString("ru-RU")} ₽ / ночь
      </p>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div>
          <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[--muted-foreground] mb-1.5">
            <CalendarDays className="w-3 h-3" /> Заезд
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full h-10 rounded-xl border border-[--border] bg-[--muted] px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--ring] text-[--foreground]"
          />
        </div>
        <div>
          <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[--muted-foreground] mb-1.5">
            <CalendarDays className="w-3 h-3" /> Выезд
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full h-10 rounded-xl border border-[--border] bg-[--muted] px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--ring] text-[--foreground]"
          />
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[--muted-foreground] mb-1.5">
          <Users className="w-3 h-3" /> Гости
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full h-10 rounded-xl border border-[--border] bg-[--muted] px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--ring] text-[--foreground]"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
            </option>
          ))}
        </select>
      </div>

      {/* Price breakdown */}
      {result && (
        <div className="bg-[--muted] rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between text-[--muted-foreground]">
            <span>
              {result.baseTotal.toLocaleString("ru-RU")} ₽ × {result.nights}{" "}
              {result.nights === 1 ? "ночь" : result.nights < 5 ? "ночи" : "ночей"}
            </span>
            <span>{result.baseTotal.toLocaleString("ru-RU")} ₽</span>
          </div>
          {result.discountPct > 0 && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" /> {result.discountLabel}
              </span>
              <span>−{result.discount.toLocaleString("ru-RU")} ₽</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-[--foreground] text-base border-t border-[--border] pt-2 mt-1">
            <span>Итого</span>
            <span>{result.total.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>
      )}

      <Button asChild size="lg" className="w-full">
        <Link href={bookingUrl}>
          Забронировать
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>

      <a
        href={`https://wa.me/${CONTACT.phoneWhatsApp}?text=${encodeURIComponent("Хочу забронировать коттедж")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-10 rounded-xl border border-[--border] text-sm font-medium text-[--foreground] hover:bg-[--muted] transition-colors"
      >
        Спросить в WhatsApp
      </a>

      <p className="text-xs text-center text-[--muted-foreground]">
        Без предоплаты · Отмена за 48 ч
      </p>
    </div>
  );
}
