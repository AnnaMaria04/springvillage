"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";

export function MobileBookBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="flex border-t border-white/10 bg-pine/95 backdrop-blur-sm">
        <a
          href={`tel:${CONTACT.phoneDial}`}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white/80 hover:text-white text-sm font-medium border-r border-white/10 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Позвонить
        </a>
        <Link
          href="/tseny"
          className="flex-1 flex items-center justify-center py-3.5 bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors"
        >
          Забронировать
        </Link>
      </div>
    </div>
  );
}
