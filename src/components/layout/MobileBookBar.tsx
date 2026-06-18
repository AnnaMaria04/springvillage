"use client";

import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { useBooking } from "@/context/booking-context";

export function MobileBookBar() {
  const { openBooking } = useBooking();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/10 bg-pine/97 backdrop-blur-sm">
      <div className="flex">
        <a
          href={`tel:${CONTACT.phoneDial}`}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white/80 hover:text-white text-sm font-medium border-r border-white/10 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Позвонить
        </a>
        <button
          onClick={openBooking}
          className="flex-1 flex items-center justify-center py-3.5 bg-wood text-white text-sm font-semibold cursor-pointer"
        >
          Забронировать
        </button>
      </div>
    </div>
  );
}
