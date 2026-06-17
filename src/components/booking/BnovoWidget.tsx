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

const SCRIPT_SRC = "https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js";

export function BnovoWidget({ instanceId = "booking_iframe" }: { instanceId?: string }) {
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    function initWidget() {
      try {
        new window.BookingIframe({
          html_id: instanceId,
          uid: CONTACT.bnovoUid,
          lang: "ru",
          width: "auto",
          height: "auto",
          rooms: "",
          IsMobile: "0",
          scroll_to_rooms: "0",
        }).init();
      } catch {
        /* timer below will catch failure */
      }
    }

    if (window.BookingIframe) {
      initWidget();
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => { if (window.BookingIframe) initWidget(); };
      script.onerror = () => setStatus("failed");
      document.body.appendChild(script);
    }

    const timer = setTimeout(() => {
      const el = document.getElementById(instanceId);
      setStatus(el?.querySelector("iframe") ? "ready" : "failed");
    }, 4000);

    return () => clearTimeout(timer);
  // instanceId won't change during a component's lifetime
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <div id={instanceId} className={status === "ready" ? "min-h-[400px]" : "min-h-0"} />

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-border border-t-primary animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Загружаем календарь бронирования…</p>
        </div>
      )}

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
