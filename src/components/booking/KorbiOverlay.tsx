"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useBooking } from "@/context/booking-context";
import { buildBookingUrl } from "@/content/booking";

function formatDateDMY(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}-${m}-${date.getFullYear()}`;
}


function nightsLabel(n: number): string {
  if (n === 1) return "ночь";
  if (n <= 4) return "ночи";
  return "ночей";
}

export function KorbiOverlay() {
  const { isOpen, nights, dfrom: ctxDfrom, dto: ctxDto, adults: ctxAdults, children: ctxChildren, childrenAges: ctxChildrenAges, closeBooking } = useBooking();

  const [step, setStep] = useState<"date-pick" | "booking">("booking");
  const defaultUrl = useRef(buildBookingUrl()).current;
  // Pre-load the default Bnovo URL in the background so modal opens instantly
  const [src, setSrc] = useState<string>(defaultUrl);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

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

  function handleDateInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "");
    // Auto-insert dots: 27.06.2026
    let formatted = val;
    if (val.length > 2) formatted = val.slice(0, 2) + "." + val.slice(2);
    if (val.length > 4) formatted = formatted.slice(0, 5) + "." + val.slice(4, 8);
    e.target.value = formatted;

    if (val.length < 8) return; // not complete yet
    const d = Number(val.slice(0, 2));
    const m = Number(val.slice(2, 4));
    const y = Number(val.slice(4, 8));
    if (!d || !m || !y || m > 12 || d > 31 || !nights) return;
    const checkin = new Date(y, m - 1, d);
    if (isNaN(checkin.getTime()) || checkin < new Date()) return;
    const dfrom = `${String(d).padStart(2,"0")}-${String(m).padStart(2,"0")}-${y}`;
    const checkout = new Date(y, m - 1, d + nights);
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
              type="text"
              inputMode="numeric"
              placeholder="ДД.ММ.ГГГГ"
              maxLength={10}
              onChange={handleDateInput}
              className="h-14 px-5 rounded-xl text-base font-medium outline-none"
              style={{
                background: "rgba(255,255,255,.1)",
                border: "1.5px solid rgba(244,239,228,.2)",
                color: "#F4EFE4",
                minWidth: "220px",
                letterSpacing: "0.08em",
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

        {/* ── Booking step: iframe ── */}
        <div className={`relative overflow-hidden bg-white ${step === "booking" ? "flex-1" : "hidden"}`}>
          <iframe
            src={src}
            title="Бронирование коттеджа"
            className="absolute inset-0 w-full h-full border-0 bg-white"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
