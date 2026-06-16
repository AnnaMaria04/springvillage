"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MobileStickyBarProps {
  slug: string;
  price: number;
}

export function MobileStickyBar({ slug, price }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[--border] shadow-2xl px-4 py-3">
      <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
        <div>
          <span className="text-lg font-bold text-[--foreground]">
            от {price.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-xs text-[--muted-foreground] ml-1">/ ночь</span>
        </div>
        <Button asChild size="lg" className="shrink-0 px-8">
          <Link href={`/booking?cottage=${slug}`}>Забронировать</Link>
        </Button>
      </div>
    </div>
  );
}
