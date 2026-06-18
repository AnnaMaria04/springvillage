"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBooking } from "@/context/booking-context";

// ─── Locale ───────────────────────────────────────────────────────────────────

const MONTHS_RU = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
];
const SHORT_MONTHS = [
  "янв","фев","мар","апр","май","июн",
  "июл","авг","сен","окт","ноя","дек",
];
const WEEKDAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

// ─── Date helpers ─────────────────────────────────────────────────────────────

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
      && a.getMonth()    === b.getMonth()
      && a.getDate()     === b.getDate();
}

function isWeekend(d: Date) { return d.getDay() === 0 || d.getDay() === 6; }

function fmtDisplay(d: Date) { return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`; }

function fmtDMY(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function guestsLabel(n: number) {
  if (n === 1) return "гость";
  if (n <= 4)  return "гостя";
  return "гостей";
}

function shiftMonth(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function buildGrid(year: number, month: number): (Date | null)[][] {
  const first    = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // Mon = 0
  const count    = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(startDow).fill(null),
    ...Array.from({ length: count }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

// ─── MonthGrid ────────────────────────────────────────────────────────────────

interface MonthGridProps {
  year:  number;
  month: number;
  today: Date;
  dfrom: Date | null;
  dto:   Date | null;
  onDay: (d: Date) => void;
}

function MonthGrid({ year, month, today, dfrom, dto, onDay }: MonthGridProps) {
  const rows        = buildGrid(year, month);
  const hasBothEnds = dfrom !== null && dto !== null;

  return (
    <div>
      <p className="text-center text-sm font-semibold mb-3" style={{ color: "#1F2A24" }}>
        {MONTHS_RU[month]} {year}
      </p>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((label, i) => (
          <div
            key={label}
            className="text-center py-1 text-[11px] font-semibold"
            style={{ color: i >= 5 ? "#C2A06B" : "rgba(31,42,36,.4)" }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      {rows.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((day, di) => {
            if (!day) return <div key={di} className="h-10" />;

            const past    = day < today;
            const isDfrom = dfrom ? sameDay(day, dfrom) : false;
            const isDto   = dto   ? sameDay(day, dto)   : false;
            const sel     = isDfrom || isDto;
            const inRange = !!(dfrom && dto && day > dfrom && day < dto);
            const weekend = isWeekend(day);

            let radius = "8px";
            if (sel && hasBothEnds) {
              radius = isDfrom ? "8px 0 0 8px" : "0 8px 8px 0";
            } else if (inRange) {
              radius = "0";
            }

            return (
              <button
                key={di}
                type="button"
                disabled={past}
                onClick={() => onDay(day)}
                className="h-10 flex items-center justify-center text-sm transition-colors"
                style={{
                  cursor:       past ? "default" : "pointer",
                  color:        past    ? "rgba(31,42,36,.25)"
                              : sel     ? "#2F3E34"
                              : weekend ? "#C2A06B"
                              : "#1F2A24",
                  fontWeight:   sel ? 700 : undefined,
                  background:   sel     ? "#C2A06B"
                              : inRange ? "rgba(194,160,107,.18)"
                              : "transparent",
                  borderRadius: (sel || inRange) ? radius : undefined,
                }}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Shared field styles ──────────────────────────────────────────────────────

const FIELD_BASE: React.CSSProperties = {
  background:   "rgba(255,255,255,.06)",
  border:       "1px solid rgba(255,255,255,.14)",
  borderRadius: "12px",
};

const FIELD_ACTIVE: React.CSSProperties = {
  background: "rgba(255,255,255,.12)",
  border:     "1px solid rgba(194,160,107,.55)",
};

const LABEL_STYLE: React.CSSProperties = {
  display:       "block",
  fontSize:      "11px",
  fontWeight:    600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color:         "rgba(244,239,228,.5)",
  lineHeight:    1,
};

const VALUE_STYLE: React.CSSProperties = {
  display:    "block",
  fontSize:   "14px",
  fontWeight: 500,
  color:      "#F4EFE4",
  marginTop:  "5px",
  whiteSpace: "nowrap",
};

// ─── BookingBar ───────────────────────────────────────────────────────────────

type ActiveField = "dfrom" | "dto" | null;

export function BookingBar() {
  const { openBooking } = useBooking();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [dfrom,         setDfrom]         = useState<Date | null>(null);
  const [dto,           setDto]           = useState<Date | null>(null);
  const [guests,        setGuests]        = useState(2);
  const [active,        setActive]        = useState<ActiveField>(null);
  const [viewMonth,     setViewMonth]     = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  const barRef      = useRef<HTMLDivElement>(null);
  const calOpen     = active !== null;
  const month2      = shiftMonth(viewMonth, 1);
  const canGoBack   = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close calendar on outside click
  useEffect(() => {
    if (!calOpen) return;
    function onDown(e: MouseEvent) {
      if (!barRef.current?.contains(e.target as Node)) setActive(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [calOpen]);

  // Close calendar on Esc
  useEffect(() => {
    if (!calOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setActive(null); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [calOpen]);

  function handleDay(day: Date) {
    if (!dfrom || dto !== null) {
      setDfrom(day);
      setDto(null);
      setActive("dto");
      return;
    }
    if (sameDay(day, dfrom)) { setDfrom(null); return; }
    if (day < dfrom)         { setDfrom(day); setDto(null); return; }
    setDto(day);
    setActive(null); // close when range complete
  }

  function toggleField(field: ActiveField) {
    setActive(prev => (prev === field ? null : field));
  }

  function handleSubmit() {
    if (!dfrom || !dto) { setActive("dfrom"); return; }
    openBooking({ dfrom: fmtDMY(dfrom), dto: fmtDMY(dto), adults: guests });
  }

  const CAL_TRANSITION = reducedMotion
    ? "none"
    : "opacity var(--dur-hover) var(--ease), transform var(--dur-hover) var(--ease)";

  return (
    /* position:relative is the anchor for the floating calendar */
    <div ref={barRef} style={{ background: "#2F3E34", position: "relative" }}>

      {/* ── Bar row ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 sm:px-8 lg:px-12 py-[22px]">

        {/* Title block */}
        <div className="shrink-0 sm:mr-3">
          <strong
            className="block text-[1.05rem] font-bold uppercase tracking-[.06em]"
            style={{ color: "#F4EFE4" }}
          >
            Бронирование
          </strong>
          <span className="block text-[.82rem] mt-[5px]" style={{ color: "rgba(244,239,228,.6)" }}>
            Гарантированное заселение
          </span>
        </div>

        {/* Fields */}
        <div className="flex flex-col sm:flex-row flex-1 gap-2">

          {/* ЗАЕЗД */}
          <button
            type="button"
            onClick={() => toggleField("dfrom")}
            aria-expanded={active === "dfrom"}
            aria-haspopup="dialog"
            className="flex-1 px-4 py-3 text-left cursor-pointer"
            style={active === "dfrom" ? { ...FIELD_BASE, ...FIELD_ACTIVE } : FIELD_BASE}
          >
            <span style={LABEL_STYLE}>Заезд</span>
            <span style={VALUE_STYLE}>{dfrom ? fmtDisplay(dfrom) : "Выбрать дату"}</span>
          </button>

          {/* ВЫЕЗД */}
          <button
            type="button"
            onClick={() => toggleField("dto")}
            aria-expanded={active === "dto"}
            aria-haspopup="dialog"
            className="flex-1 px-4 py-3 text-left cursor-pointer"
            style={active === "dto" ? { ...FIELD_BASE, ...FIELD_ACTIVE } : FIELD_BASE}
          >
            <span style={LABEL_STYLE}>Выезд</span>
            <span style={VALUE_STYLE}>{dto ? fmtDisplay(dto) : "Выбрать дату"}</span>
          </button>

          {/* ГОСТИ */}
          <div className="flex-1 px-4 py-3" style={FIELD_BASE}>
            <span style={LABEL_STYLE}>Гости</span>
            <div className="flex items-center gap-2 mt-[5px]">
              <button
                type="button"
                onClick={() => setGuests(n => Math.max(1, n - 1))}
                disabled={guests <= 1}
                className="w-7 h-7 flex items-center justify-center text-xl leading-none disabled:opacity-30 cursor-pointer disabled:cursor-default select-none"
                style={{ color: "rgba(244,239,228,.85)" }}
                aria-label="Уменьшить количество гостей"
              >
                −
              </button>
              <span
                className="text-sm font-medium text-center"
                style={{ color: "#F4EFE4", minWidth: "72px", whiteSpace: "nowrap" }}
              >
                {guests} {guestsLabel(guests)}
              </span>
              <button
                type="button"
                onClick={() => setGuests(n => Math.min(5, n + 1))}
                disabled={guests >= 5}
                className="w-7 h-7 flex items-center justify-center text-xl leading-none disabled:opacity-30 cursor-pointer disabled:cursor-default select-none"
                style={{ color: "rgba(244,239,228,.85)" }}
                aria-label="Увеличить количество гостей"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* НАЙТИ НОМЕР */}
        <button
          type="button"
          onClick={handleSubmit}
          className="sm:self-center h-12 px-8 rounded-xl text-sm font-bold uppercase tracking-[.08em] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
          style={{ background: "#C2A06B", color: "#2F3E34" }}
        >
          Найти номер
        </button>
      </div>

      {/* ── Floating calendar panel ─────────────────────────────────────────── */}
      {/*
        Always in DOM; toggled via opacity/transform/pointer-events.
        position:absolute anchors it under the green bar without pushing content.
        z-index:200 floats it above the page sections below.
      */}
      <div
        role="dialog"
        aria-label="Выбор дат"
        aria-hidden={!calOpen}
        style={{
          position:        "absolute",
          top:             "calc(100% + 8px)",
          left:            0,
          right:           0,
          zIndex:          200,
          /* Entry/exit animation — opacity + slight translateY/scale */
          opacity:         calOpen ? 1 : 0,
          transform:       calOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.98)",
          transformOrigin: "top center",
          pointerEvents:   calOpen ? "auto" : "none",
          transition:      CAL_TRANSITION,
          /* Calendar look */
          background:   "#FFFFFF",
          borderRadius: "16px",
          boxShadow:    "0 24px 64px rgba(31,42,36,.22), 0 2px 16px rgba(31,42,36,.08)",
          overflowY:    "auto",
          maxHeight:    "90vh",
        }}
      >
        <div style={{ padding: "8px 28px 28px" }}>
          {/* Navigation row */}
          <div className="flex items-center justify-between py-3">
            <button
              type="button"
              onClick={() => setViewMonth(m => shiftMonth(m, -1))}
              disabled={!canGoBack}
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-default hover:bg-black/5 transition-colors"
              style={{ color: "#2F3E34" }}
              aria-label="Предыдущий месяц"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMonth(m => shiftMonth(m, 1))}
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer hover:bg-black/5 transition-colors"
              style={{ color: "#2F3E34" }}
              aria-label="Следующий месяц"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Month grids — 1 on mobile, 2 on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <MonthGrid
              year={viewMonth.getFullYear()}
              month={viewMonth.getMonth()}
              today={today}
              dfrom={dfrom}
              dto={dto}
              onDay={handleDay}
            />
            <div className="hidden sm:block">
              <MonthGrid
                year={month2.getFullYear()}
                month={month2.getMonth()}
                today={today}
                dfrom={dfrom}
                dto={dto}
                onDay={handleDay}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
