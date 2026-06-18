"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useBooking } from "@/context/booking-context";
import { BOOKING } from "@/content/booking";

export function KorbiOverlay() {
  const { isOpen, closeBooking } = useBooking();
  const [src, setSrc] = useState<string | undefined>();
  const closeRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  // Lazy: set iframe src on first open, never on page load
  useEffect(() => {
    if (isOpen && !src) setSrc(BOOKING.moduleUrl);
  }, [isOpen, src]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Esc to close + basic focus trap (shell elements only; cross-origin iframe handles its own focus)
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { closeBooking(); return; }
      if (e.key !== "Tab" || !shellRef.current) return;

      const focusable = shellRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const els = [...focusable];
      if (els.length < 2) return;
      const first = els[0];
      const last = els[els.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeBooking]);

  // Move focus to close button when overlay opens
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Бронирование"
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center",
        "transition-opacity duration-300 motion-reduce:transition-none",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(23,36,32,.78)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Modal shell — fullscreen on mobile, padded+capped on desktop */}
      <div
        ref={shellRef}
        className={[
          "relative z-10 flex flex-col overflow-hidden",
          "w-full h-screen",
          "md:max-w-[1200px] md:h-[calc(100vh-6vh)] md:rounded-2xl",
          "shadow-[0_32px_80px_rgba(0,0,0,0.55)]",
        ].join(" ")}
      >
        {/* Brand chrome bar */}
        <div
          className="flex items-center shrink-0 px-5 py-3"
          style={{ background: "#2F3E34" }}
        >
          <p className="text-sm font-semibold leading-none" style={{ color: "#F4EFE4" }}>
            Бронирование · Коттедж WILD
          </p>
          <button
            ref={closeRef}
            onClick={closeBooking}
            className="ml-auto flex items-center gap-1.5 text-sm font-medium rounded-md px-2 py-1 transition-colors cursor-pointer"
            style={{ color: "rgba(244,239,228,.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C2A06B")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,239,228,.5)")}
            aria-label="Закрыть окно бронирования"
          >
            Закрыть окно
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Booking iframe — src set only on first open */}
        <iframe
          src={src}
          title="Бронирование коттеджа"
          className="flex-1 w-full border-0 bg-white"
          allow="payment"
        />
      </div>
    </div>
  );
}
