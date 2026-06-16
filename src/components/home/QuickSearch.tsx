"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickSearch() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (checkIn && checkOut) {
      const a = new Date(checkIn);
      const b = new Date(checkOut);
      if (b <= a) {
        setError("Дата выезда должна быть позже даты заезда");
        return;
      }
      const nights = Math.round((b.getTime() - a.getTime()) / 86400000);
      if (nights < 1) {
        setError("Минимум 1 ночь");
        return;
      }
    }

    const params = new URLSearchParams();
    if (checkIn) params.set("check_in", checkIn);
    if (checkOut) params.set("check_out", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-[--border] p-5 sm:p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
            {/* Check-in */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider mb-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> Заезд
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => { setCheckIn(e.target.value); setError(""); }}
                className="w-full h-11 rounded-xl border border-[--border] bg-[--muted] px-3 text-sm text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-transparent"
              />
            </div>
            {/* Check-out */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider mb-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> Выезд
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => { setCheckOut(e.target.value); setError(""); }}
                className="w-full h-11 rounded-xl border border-[--border] bg-[--muted] px-3 text-sm text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--ring] focus:border-transparent"
              />
            </div>
            {/* Guests */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider mb-1.5">
                <Users className="w-3.5 h-3.5" /> Гости
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full h-11 rounded-xl border border-[--border] bg-[--muted] px-3 text-sm text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--ring]"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit */}
            <Button type="submit" size="lg" className="h-11 px-6 sm:mt-0">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Найти</span>
              <span className="sm:hidden">Найти коттеджи</span>
            </Button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
