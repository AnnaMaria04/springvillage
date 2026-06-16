"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function QuickSearch() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("check_in", checkIn);
    if (checkOut) params.set("check_out", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative -mt-12 z-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[--border] p-6 lg:p-8">
        <h2 className="font-serif text-xl font-bold text-[--foreground] mb-6 text-center">
          Проверьте доступность
        </h2>
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Check-in */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Заезд
              </label>
              <Input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-12"
              />
            </div>
            {/* Check-out */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Выезд
              </label>
              <Input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-12"
              />
            </div>
            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Гости
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-[--input] bg-[--background] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] transition-shadow"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto sm:px-10">
            <Search className="w-4 h-4" />
            Найти коттеджи
          </Button>
        </form>
      </div>
    </section>
  );
}
