"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/lib/data";

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

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js";
    script.async = true;
    script.onload = () => {
      if (window.BookingIframe) {
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
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="booking_iframe"
      style={{ paddingBottom: 32, position: "relative" }}
      className="min-h-[400px]"
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          marginTop: 12,
          fontFamily: '"Proxima nova", "Helvetica Neue", Arial, sans-serif',
          fontSize: 12,
          lineHeight: "1em",
          opacity: 0.5,
          zIndex: 3,
          bottom: 0,
        }}
      >
        <div style={{ color: "#1403FC", background: "rgba(0,0,0,0)" }}>
          <a
            style={{ color: "#808080", background: "#ffffff" }}
            href="http://bnovo.ru/"
            id="bnovo_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Система управления отелем Bnovo ©
          </a>
        </div>
      </div>
    </div>
  );
}
