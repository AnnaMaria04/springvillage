"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { BookingModal } from "@/components/booking/BookingModal";

declare global {
  interface Window {
    BookingIframe: new (config: {
      html_id: string;
      uid: string;
      lang: string;
      width: string;
      height: string;
      rooms: string;
      IsMobile: string;
      scroll_to_rooms: string;
    }) => { init: () => void };
  }
}

export function BnovoWidget() {
  const loaded = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js";
    script.async = true;
    script.onload = () => {
      if (window.BookingIframe) {
        try {
          const widget = new window.BookingIframe({
            html_id: "booking_iframe",
            uid: CONTACT.bnovoUid,
            lang: "ru",
            width: "auto",
            height: "auto",
            rooms: "",
            IsMobile: "0",
            scroll_to_rooms: "0",
          });
          widget.init();
        } catch {
          /* handled by the timeout check below */
        }
      }
    };
    script.onerror = () => setStatus("failed");
    document.body.appendChild(script);

    // If the widget hasn't injected an iframe within a few seconds, show fallback
    const timer = setTimeout(() => {
      const el = document.getElementById("booking_iframe");
      setStatus(el && el.querySelector("iframe") ? "ready" : "failed");
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative">
      {/* Bnovo mount point */}
      <div id="booking_iframe" className={status === "ready" ? "min-h-[400px]" : "min-h-0"} />

      {/* Loading skeleton */}
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-border border-t-primary animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Загружаем календарь бронирования…</p>
        </div>
      )}

      {/* Fallback when the live calendar can't load */}
      {status === "failed" && (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mb-5">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-display text-2xl font-bold text-foreground mb-2">
            Проверим свободные даты для вас
          </h4>
          <p className="text-muted-foreground max-w-sm mb-7">
            Напишите желаемые даты — ответим в течение часа и подтвердим бронирование.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <BookingModal
              source="bnovo_fallback"
              trigger={
                <button className="btn-lux h-12 px-8 rounded-full bg-primary text-white text-sm font-semibold cursor-pointer">
                  Запросить даты
                </button>
              }
            />
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-border text-foreground text-sm font-medium hover:bg-cream transition-colors"
            >
              <Phone className="w-4 h-4" /> {CONTACT.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
