"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useBooking } from "@/context/booking-context";
import { buildBookingUrl } from "@/content/booking";

const MESSAGES = [
  "Проверяем свободные даты…",
  "Подбираем лучшие предложения…",
];

function formatDateDMY(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}-${m}-${date.getFullYear()}`;
}

function tomorrowStr(): string {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split("T")[0];
}

function nightsLabel(n: number): string {
  if (n === 1) return "ночь";
  if (n <= 4) return "ночи";
  return "ночей";
}

export function KorbiOverlay() {
  const { isOpen, nights, dfrom: ctxDfrom, dto: ctxDto, adults: ctxAdults, children: ctxChildren, childrenAges: ctxChildrenAges, closeBooking } = useBooking();

  const [step, setStep] = useState<"date-pick" | "booking">("booking");
  const [src, setSrc] = useState<string | undefined>();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  const defaultUrl = useRef(buildBookingUrl()).current;
  const closeRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Reset state on close so next open always starts fresh with loading screen
  useEffect(() => {
    if (isOpen) return;
    setSrc(undefined);
    setIframeLoaded(false);
  }, [isOpen]);

  // Decide mode when overlay opens
  useEffect(() => {
    if (!isOpen) return;
    if (ctxDfrom && ctxDto) {
      setSrc(buildBookingUrl({ dfrom: ctxDfrom, dto: ctxDto, adults: ctxAdults, children: ctxChildren, childrenAges: ctxChildrenAges }));
      setStep("booking");
    } else if (nights) {
      setStep("date-pick");
      setTimeout(() => dateInputRef.current?.focus(), 80);
    } else {
      setStep("booking");
      setSrc(defaultUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, nights, ctxDfrom, ctxDto, ctxAdults, ctxChildren, ctxChildrenAges]);

  // Show loading overlay whenever src is set/changed
  useEffect(() => {
    if (src) setIframeLoaded(false);
  }, [src]);

  // 10s fallback: hide loading overlay regardless
  useEffect(() => {
    if (!src || iframeLoaded) return;
    const t = setTimeout(() => setIframeLoaded(true), 10_000);
    return () => clearTimeout(t);
  }, [src, iframeLoaded]);

  // Rotate loading messages
  useEffect(() => {
    if (!src || iframeLoaded) return;
    const iv = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 2500);
    return () => clearInterval(iv);
  }, [src, iframeLoaded]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Esc + focus trap
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { closeBooking(); return; }
      if (e.key !== "Tab" || !shellRef.current) return;
      const els = [...shellRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      )];
      if (els.length < 2) return;
      if (e.shiftKey && document.activeElement === els[0]) {
        e.preventDefault(); els[els.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === els[els.length - 1]) {
        e.preventDefault(); els[0].focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeBooking]);

  // Focus close button when on booking step
  useEffect(() => {
    if (isOpen && step === "booking") closeRef.current?.focus();
  }, [isOpen, step]);

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value; // YYYY-MM-DD
    if (!val || !nights) return;
    const [y, m, d] = val.split("-").map(Number);
    // Use local date constructor to avoid UTC-offset date shift bugs
    const dfrom = `${String(d).padStart(2,"0")}-${String(m).padStart(2,"0")}-${y}`;
    const checkout = new Date(y, m - 1, d + nights); // d+nights handles month overflow
    setSrc(buildBookingUrl({ dfrom, dto: formatDateDMY(checkout) }));
    setStep("booking");
  }

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
        style={{ background: "rgba(23,36,32,.78)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Shell */}
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
        <div className="flex items-center shrink-0 px-5 py-3" style={{ background: "#2F3E34" }}>
          <p className="text-sm font-semibold leading-none" style={{ color: "#F4EFE4" }}>
            Бронирование · Коттедж WILD
          </p>
          <button
            ref={closeRef}
            onClick={closeBooking}
            className="ml-auto flex items-center gap-1.5 text-sm font-medium rounded-md px-2 py-1 transition-colors cursor-pointer"
            style={{ color: "rgba(244,239,228,.5)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C2A06B")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,239,228,.5)")}
            aria-label="Закрыть окно бронирования"
          >
            Закрыть окно <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Date-pick step ── */}
        {step === "date-pick" && nights && (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-5 px-6"
            style={{ background: "#2F3E34" }}
          >
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold mb-2" style={{ color: "#F4EFE4" }}>
                Когда заезд?
              </h2>
              <p className="text-sm" style={{ color: "rgba(244,239,228,.55)" }}>
                {nights} {nightsLabel(nights)} · выезд рассчитается автоматически
              </p>
            </div>

            <input
              ref={dateInputRef}
              type="date"
              min={tomorrowStr()}
              onChange={handleDateChange}
              className="h-14 px-5 rounded-xl text-base font-medium outline-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,.1)",
                border: "1.5px solid rgba(244,239,228,.2)",
                color: "#F4EFE4",
                colorScheme: "dark",
                minWidth: "220px",
              }}
            />

            <button
              onClick={() => { setSrc(defaultUrl); setStep("booking"); }}
              className="text-sm transition-colors cursor-pointer mt-1"
              style={{ color: "rgba(244,239,228,.35)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(244,239,228,.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,239,228,.35)")}
            >
              Пропустить — выбрать даты в модуле →
            </button>
          </div>
        )}

        {/* ── Booking step: iframe + branded loading layer ── */}
        <div className={`relative overflow-hidden bg-white ${step === "booking" ? "flex-1" : "hidden"}`}>
          {/* Branded loading overlay */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4",
              "transition-opacity duration-500 motion-reduce:transition-none",
              iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100",
            ].join(" ")}
            style={{ background: "#2F3E34" }}
          >
            <div
              className="w-10 h-10 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(194,160,107,.25)", borderTopColor: "#C2A06B" }}
            />
            <p className="text-sm font-medium" style={{ color: "rgba(244,239,228,.7)" }}>
              {MESSAGES[msgIdx]}
            </p>
          </div>

          {/* Iframe */}
          <iframe
            src={src}
            title="Бронирование коттеджа"
            className="absolute inset-0 w-full h-full border-0 bg-white"
            allow="payment"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
