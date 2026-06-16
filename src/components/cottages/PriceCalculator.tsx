"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface PriceCalculatorProps {
  slug: string;
  priceWeekday: number;
  priceWeekend: number;
  maxGuests: number;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0;
}

function getNightPrice(date: Date, weekday: number, weekend: number) {
  return isWeekend(date) ? weekend : weekday;
}

function calcTotal(checkIn: string, checkOut: string, weekday: number, weekend: number) {
  if (!checkIn || !checkOut) return null;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (end <= start) return null;
  let total = 0;
  let nights = 0;
  const cur = new Date(start);
  while (cur < end) {
    total += getNightPrice(cur, weekday, weekend);
    nights++;
    cur.setDate(cur.getDate() + 1);
  }
  return { total, nights };
}

export function PriceCalculator({ slug, priceWeekday, priceWeekend, maxGuests }: PriceCalculatorProps) {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [calc, setCalc] = useState<{ total: number; nights: number } | null>(null);

  useEffect(() => {
    setCalc(calcTotal(checkIn, checkOut, priceWeekday, priceWeekend));
  }, [checkIn, checkOut, priceWeekday, priceWeekend]);

  return (
    <div className="space-y-4">
      {/* Price headline */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[--foreground]">
          от {priceWeekday.toLocaleString("ru-RU")} ₽
        </span>
        <span className="text-[--muted-foreground] text-sm">/ ночь</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary">Будни: {priceWeekday.toLocaleString("ru-RU")} ₽</Badge>
        <Badge variant="accent">Пт–Вс: {priceWeekend.toLocaleString("ru-RU")} ₽</Badge>
      </div>

      {/* Date pickers */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wide flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Заезд
          </label>
          <Input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className="h-10 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wide flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Выезд
          </label>
          <Input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className="h-10 text-sm" />
        </div>
      </div>

      {/* Guests */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wide flex items-center gap-1">
          <Users className="w-3 h-3" /> Гости
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="flex h-10 w-full rounded-lg border border-[--input] bg-[--background] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring]"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
            </option>
          ))}
        </select>
      </div>

      {/* Price breakdown */}
      {calc && (
        <div className="bg-[--muted] rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between text-[--muted-foreground]">
            <span>Стоимость за {calc.nights} {calc.nights === 1 ? "ночь" : calc.nights < 5 ? "ночи" : "ночей"}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-[--foreground] border-t border-[--border] pt-2">
            <span>Итого</span>
            <span>{calc.total.toLocaleString("ru-RU")} ₽</span>
          </div>
          {calc.nights >= 7 && (
            <div className="text-xs text-[--primary] font-medium">
              🎉 При бронировании от 7 ночей скидка 15% — уточните при бронировании
            </div>
          )}
        </div>
      )}

      <Button asChild size="lg" className="w-full">
        <Link
          href={`/booking?cottage=${slug}${checkIn ? `&check_in=${checkIn}` : ""}${checkOut ? `&check_out=${checkOut}` : ""}&guests=${guests}`}
        >
          Забронировать <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>

      <p className="text-xs text-center text-[--muted-foreground]">
        Бесплатная отмена за 48 часов · Без предоплаты
      </p>
    </div>
  );
}
