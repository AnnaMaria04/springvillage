"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBooking } from "@/context/booking-context";

// ─── Locale ──────────────────────────────────────────────────────────────────

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
  if (n <= 4) return "гостя";
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

            // Flatten inner edge of range endpoints so highlight is continuous
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
                              : inRange  ? "rgba(194,160,107,.18)"
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

// ─── BookingBar ───────────────────────────────────────────────────────────────

type ActiveField = "dfrom" | "dto" | null;

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

export function BookingBar() {
  const { openBooking } = useBooking();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [dfrom,         setDfrom]         = useState<Date | null>(null);
  const [dto,           setDto]           = useState<Date | null>(null);
  const [adults,        setAdults]        = useState(2);
  const [children,      setChildren]      = useState(0);
  const [active,        setActive]        = useState<ActiveField>(null);
  const [viewMonth,     setViewMonth]     = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  const barRef         = useRef<HTMLDivElement>(null);
  const calOpen        = active !== null;
  const month2         = shiftMonth(viewMonth, 1);
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoBack      = viewMonth > thisMonthStart;

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
      // Start fresh range
      setDfrom(day);
      setDto(null);
      setActive("dto");
      return;
    }
    // dfrom set, dto not yet
    if (sameDay(day, dfrom)) { setDfrom(null); return; }
    if (day < dfrom)         { setDfrom(day); setDto(null); return; }
    // Valid end date — close calendar
    setDto(day);
    setActive(null);
  }

  function toggleField(field: ActiveField) {
    setActive(prev => (prev === field ? null : field));
  }

  function handleSubmit() {
    // If dates not chosen, open the calendar to prompt selection
    if (!dfrom || !dto) { setActive("dfrom"); return; }
    openBooking({ dfrom: fmtDMY(dfrom), dto: fmtDMY(dto), adults, children: children > 0 ? children : undefined });
  }

  return (
    <div ref={barRef} style={{ background: "#2F3E34" }}>

      {/* ── Bar row ─────────────────────────────────────────────────────────── */}
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
            className="flex-1 px-4 py-3 text-left"
            style={active === "dfrom" ? { ...FIELD_BASE, ...FIELD_ACTIVE } : FIELD_BASE}
          >
            <span style={LABEL_STYLE}>Заезд</span>
            <span style={VALUE_STYLE}>{dfrom ? fmtDisplay(dfrom) : "Выбрать дату"}</span>
          </button>

          {/* ВЫЕЗД */}
          <button
            type="button"
            onClick={() => toggleField("dto")}
            className="flex-1 px-4 py-3 text-left"
            style={active === "dto" ? { ...FIELD_BASE, ...FIELD_ACTIVE } : FIELD_BASE}
          >
            <span style={LABEL_STYLE}>Выезд</span>
            <span style={VALUE_STYLE}>{dto ? fmtDisplay(dto) : "Выбрать дату"}</span>
          </button>

          {/* ГОСТИ — adults + children steppers */}
          <div
            className="flex-1 px-4 py-3"
            style={FIELD_BASE}
          >
            <span style={LABEL_STYLE}>Гости</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "5px" }}>
              {/* Adults row */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ ...VALUE_STYLE, marginTop: 0, fontSize: "12px", color: "rgba(244,239,228,.55)", minWidth: "56px" }}>
                  Взрослые
                </span>
                <button type="button" onClick={() => setAdults(n => Math.max(1, n - 1))} disabled={adults <= 1}
                  className="w-6 h-6 flex items-center justify-center rounded text-lg leading-none disabled:opacity-30 cursor-pointer disabled:cursor-default"
                  style={{ color: "rgba(244,239,228,.8)", background: "none", border: "none" }}
                  aria-label="Уменьшить взрослых">−</button>
                <span style={{ ...VALUE_STYLE, marginTop: 0, minWidth: "20px", textAlign: "center" }}>{adults}</span>
                <button type="button" onClick={() => setAdults(n => Math.min(5, n + 1))} disabled={adults >= 5}
                  className="w-6 h-6 flex items-center justify-center rounded text-lg leading-none disabled:opacity-30 cursor-pointer disabled:cursor-default"
                  style={{ color: "rgba(244,239,228,.8)", background: "none", border: "none" }}
                  aria-label="Увеличить взрослых">+</button>
              </div>
              {/* Children row */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ ...VALUE_STYLE, marginTop: 0, fontSize: "12px", color: "rgba(244,239,228,.55)", minWidth: "56px" }}>
                  Дети
                </span>
                <button type="button" onClick={() => setChildren(n => Math.max(0, n - 1))} disabled={children <= 0}
                  className="w-6 h-6 flex items-center justify-center rounded text-lg leading-none disabled:opacity-30 cursor-pointer disabled:cursor-default"
                  style={{ color: "rgba(244,239,228,.8)", background: "none", border: "none" }}
                  aria-label="Уменьшить детей">−</button>
                <span style={{ ...VALUE_STYLE, marginTop: 0, minWidth: "20px", textAlign: "center" }}>{children}</span>
                <button type="button" onClick={() => setChildren(n => Math.min(3, n + 1))} disabled={children >= 3}
                  className="w-6 h-6 flex items-center justify-center rounded text-lg leading-none disabled:opacity-30 cursor-pointer disabled:cursor-default"
                  style={{ color: "rgba(244,239,228,.8)", background: "none", border: "none" }}
                  aria-label="Увеличить детей">+</button>
              </div>
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

      {/* ── Expanding calendar (light panel) ────────────────────────────────── */}
      <div
        style={{
          display:          "grid",
          gridTemplateRows: calOpen ? "1fr" : "0fr",
          transition:       reducedMotion ? "none" : "grid-template-rows 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Inner div must have overflow:hidden for grid-template-rows trick */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              background:   "#FBF8F2",
              borderRadius: "0 0 16px 16px",
              padding:      "8px 28px 28px",
              boxShadow:    "0 12px 40px rgba(31,42,36,.12)",
            }}
          >
            {/* Navigation */}
            <div className="flex items-center justify-between py-3">
              <button
                type="button"
                onClick={() => setViewMonth(m => shiftMonth(m, -1))}
                disabled={!canGoBack}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default hover:bg-black/5"
                style={{ color: "#2F3E34", background: "none", border: "none" }}
                aria-label="Предыдущий месяц"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMonth(m => shiftMonth(m, 1))}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-black/5"
                style={{ color: "#2F3E34", background: "none", border: "none" }}
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
    </div>
  );
}
