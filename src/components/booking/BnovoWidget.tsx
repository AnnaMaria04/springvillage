"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { BookingModal } from "@/components/booking/BookingModal";

declare global {
  interface Window {
    BookingIframe: new (config: Record<string, string>) => { init: () => void };
  }
}

const SCRIPT_SRC = "https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js";

type Props = {
  instanceId?: string;
  dfrom?: string; // "DD-MM-YYYY"
  dto?: string;   // "DD-MM-YYYY"
  adults?: number;
};

export function BnovoWidget({ instanceId = "booking_iframe", dfrom, dto, adults }: Props) {
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    function initWidget() {
      try {
        const config: Record<string, string> = {
          html_id: instanceId,
          uid: CONTACT.bnovoUid,
          lang: "ru",
          width: "100%",
          height: "auto",
          rooms: "",
          IsMobile: "0",
          scroll_to_rooms: "0",
        };
        if (dfrom) config.dfrom = dfrom;
        if (dto) config.dto = dto;
        if (adults) config.adults = String(adults);
        new window.BookingIframe(config).init();
      } catch {
        setStatus("failed");
      }
    }

    function loadAndInit() {
      if (window.BookingIframe) {
        initWidget();
        return;
      }
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", initWidget);
        return;
      }
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => { if (window.BookingIframe) initWidget(); else setStatus("failed"); };
      script.onerror = () => setStatus("failed");
      document.body.appendChild(script);
    }

    loadAndInit();

    const timer = setTimeout(() => {
      const el = document.getElementById(instanceId);
      if (el?.querySelector("iframe")) {
        setStatus("ready");
      } else {
        setStatus("failed");
      }
    }, 6000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[400px]">
      <div id={instanceId} className={status === "failed" ? "hidden" : ""} />

      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-border border-t-pine animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Загружаем календарь…</p>
        </div>
      )}

      {status === "failed" && (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center mb-5">
            <Calendar className="w-6 h-6 text-pine" />
          </div>
          <h4 className="font-display text-2xl font-bold text-foreground mb-2">
            Проверим даты для вас
          </h4>
          <p className="text-muted-foreground max-w-sm mb-7">
            Напишите желаемые даты — ответим в течение часа.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <BookingModal
              source="bnovo_fallback"
              trigger={
                <button className="h-12 px-8 rounded-full bg-pine text-white text-sm font-semibold cursor-pointer">
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
