"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { BnovoModal } from "@/components/booking/BnovoModal";

function toDisplay(val: string) {
  if (!val) return null;
  const [y, m, d] = val.split("-");
  return `${d}.${m}.${y}`;
}

function toBnovo(val: string) {
  if (!val) return undefined;
  const [y, m, d] = val.split("-");
  return `${d}-${m}-${y}`;
}

const todayStr = () => new Date().toISOString().split("T")[0];
const tomorrowStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

export function StickyBookingBar() {
  const [open, setOpen] = useState(false);
  const [dfrom, setDfrom] = useState("");
  const [dto, setDto] = useState("");
  const [guests, setGuests] = useState(2);

  return (
    <>
      {/* Sticky bar — sits in page flow after hero, sticks on scroll */}
      <div className="sticky top-16 lg:top-20 z-40 bg-pine/97 backdrop-blur-sm border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.18)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex items-center gap-3">
          <div className="hidden xl:block shrink-0 mr-4">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">Бронирование</p>
            <p className="text-white/40 text-[11px] mt-0.5">Гарантированное заселение</p>
          </div>

          {/* Check-in */}
          <label className="flex-1 relative flex items-center gap-2.5 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">Заезд</p>
              <p className="text-white text-sm font-medium truncate">
                {dfrom ? toDisplay(dfrom) : "Выбрать дату"}
              </p>
            </div>
            <input
              type="date"
              min={todayStr()}
              value={dfrom}
              onChange={(e) => {
                setDfrom(e.target.value);
                if (dto && e.target.value >= dto) setDto("");
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>

          <div className="w-px h-7 bg-white/15 shrink-0" />

          {/* Check-out */}
          <label className="flex-1 relative flex items-center gap-2.5 bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-4 py-2.5 cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">Выезд</p>
              <p className="text-white text-sm font-medium truncate">
                {dto ? toDisplay(dto) : "Выбрать дату"}
              </p>
            </div>
            <input
              type="date"
              min={dfrom || tomorrowStr()}
              value={dto}
              onChange={(e) => setDto(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>

          <div className="w-px h-7 bg-white/15 shrink-0" />

          {/* Guests */}
          <div className="flex-1 flex items-center gap-2.5 bg-white/10 rounded-lg px-4 py-2.5">
            <Users className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <div className="flex-1">
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none mb-0.5">Гости</p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="text-white/50 hover:text-white text-base leading-none cursor-pointer px-0.5"
                >−</button>
                <span className="text-white text-sm font-medium w-20 text-center">
                  {guests} {guests === 1 ? "гость" : guests < 5 ? "гостя" : "гостей"}
                </span>
                <button
                  onClick={() => setGuests((g) => Math.min(5, g + 1))}
                  className="text-white/50 hover:text-white text-base leading-none cursor-pointer px-0.5"
                >+</button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="shrink-0 h-10 px-6 rounded-lg bg-wood text-white text-sm font-semibold uppercase tracking-wider hover:bg-wood/85 transition-colors cursor-pointer"
          >
            Найти номер
          </button>
        </div>
      </div>

      <BnovoModal
        open={open}
        onOpenChange={setOpen}
        dfrom={toBnovo(dfrom)}
        dto={toBnovo(dto)}
        adults={guests}
      />
    </>
  );
}
