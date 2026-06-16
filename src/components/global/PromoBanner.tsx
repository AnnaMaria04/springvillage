"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-[--primary] text-white text-sm py-2.5 px-4 text-center z-40 border-b border-[--primary-light]/30">
      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto pr-8">
        <span className="text-yellow-300 shrink-0">✦</span>
        <span>
          <strong>Лето 2024:</strong> скидка 15% на неделю с 1 июня по 31 августа —{" "}
          <Link href="/booking" className="underline underline-offset-2 font-semibold hover:text-white/80 transition-colors">
            забронировать
          </Link>
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
        aria-label="Закрыть"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
