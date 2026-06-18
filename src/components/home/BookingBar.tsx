"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBooking } from "@/context/booking-context";

// ─── Locale ───────────────────────────────────────────────────────────────────

const MONTHS_RU = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
];
const WEEKDAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

// ─── Date helpers ─────────────────────────────────────────────────────────────

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
      && a.getMonth()    === b.getMonth()
      && a.getDate()     === b.getDate();
}

function isWeekend(d: Date) { return d.getDay() === 0 || d.getDay() === 6; }

function pad(n: number) { return String(n).padStart(2, "0"); }

function fmtDot(d: Date) {
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function fmtDMY(d: Date) {
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

function shiftMonth(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function buildGrid(year: number, month: number): (Date | null)[][] {
  const first    = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7;
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

function ageLabel(a: number) {
  if (a === 0) return "до 1 года";
  if (a === 1) return "1 год";
  if (a >= 2 && a <= 4) return `${a} года`;
  return `${a} лет`;
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
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((label, i) => (
          <div
            key={label}
            className="text-center py-1 text-[11px] font-bold"
            style={{ color: i >= 5 ? "#AD8B58" : "rgba(31,42,36,.4)" }}
          >
            {label}
          </div>
        ))}
      </div>
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
            let radius = "9px";
            if (sel && hasBothEnds) {
              radius = isDfrom ? "9px 0 0 9px" : "0 9px 9px 0";
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
                              : sel     ? "#fff"
                              : weekend ? "#AD8B58"
                              : "#1F2A24",
                  fontWeight:   sel ? 700 : undefined,
                  background:   sel     ? "#C2A06B"
                              : inRange ? "rgba(194,160,107,.22)"
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
  border:       "1px solid rgba(255,255,255,.16)",
  borderRadius: "12px",
  padding:      "12px 16px",
  textAlign:    "left",
  cursor:       "pointer",
  transition:   "border-color 250ms ease, background 250ms ease",
};

const FIELD_ACTIVE: React.CSSProperties = {
  background:   "rgba(255,255,255,.10)",
  border:       "1px solid rgba(194,160,107,.65)",
};

const LBL: React.CSSProperties = {
  display:       "block",
  fontSize:      "10px",
  fontWeight:    700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color:         "rgba(244,239,228,.55)",
  marginBottom:  "4px",
};

const VAL: React.CSSProperties = {
  display:    "block",
  fontSize:   "1rem",
  fontWeight: 600,
  color:      "#F4EFE4",
  whiteSpace: "nowrap",
  overflow:   "hidden",
  textOverflow: "ellipsis",
};

const VAL_PH: React.CSSProperties = {
  ...VAL,
  color:      "rgba(244,239,228,.6)",
  fontWeight: 500,
};

// ─── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({
  value, min, max, onDecrement, onIncrement,
}: {
  value: number; min: number; max: number;
  onDecrement: () => void; onIncrement: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        className="w-9 h-9 border rounded-lg flex items-center justify-center text-lg leading-none transition-all cursor-pointer disabled:opacity-35 disabled:cursor-default"
        style={{ borderColor: "#ddd5c5", background: "#fff", color: "#2F3E34" }}
      >
        −
      </button>
      <span className="min-w-[26px] text-center font-bold text-base">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        className="w-9 h-9 border rounded-lg flex items-center justify-center text-lg leading-none transition-all cursor-pointer disabled:opacity-35 disabled:cursor-default"
        style={{ borderColor: "#ddd5c5", background: "#fff", color: "#2F3E34" }}
      >
        +
      </button>
    </div>
  );
}

// ─── BookingBar ───────────────────────────────────────────────────────────────

type Panel = "calendar" | "guests" | null;

export function BookingBar() {
  const { openBooking } = useBooking();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [dfrom,     setDfrom]     = useState<Date | null>(null);
  const [dto,       setDto]       = useState<Date | null>(null);
  const [adults,    setAdults]    = useState(2);
  const [children,  setChildren]  = useState(0);
  const [ages,      setAges]      = useState<number[]>([]);
  const [panel,     setPanel]     = useState<Panel>(null);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const barRef    = useRef<HTMLDivElement>(null);
  const month2    = shiftMonth(viewMonth, 1);
  const canGoBack = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1);

  // Close on outside click
  useEffect(() => {
    if (!panel) return;
    function onDown(e: MouseEvent) {
      if (!barRef.current?.contains(e.target as Node)) setPanel(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [panel]);

  // Close on Esc
  useEffect(() => {
    if (!panel) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setPanel(null); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel]);

  function togglePanel(p: Panel) {
    setPanel(prev => (prev === p ? null : p));
  }

  function handleDay(day: Date) {
    if (!dfrom || dto !== null) {
      setDfrom(day);
      setDto(null);
    } else if (sameDay(day, dfrom)) {
      setDfrom(null);
    } else if (day < dfrom) {
      setDfrom(day);
      setDto(null);
    } else {
      setDto(day);
      setTimeout(() => setPanel(null), 240);
    }
  }

  function handleChildrenChange(n: number) {
    setChildren(n);
    setAges(prev => {
      if (n > prev.length) return [...prev, ...Array<number>(n - prev.length).fill(2)];
      return prev.slice(0, n);
    });
  }

  function guestsText() {
    const adultWord = adults === 1 ? "взрослый" : adults <= 4 ? "взрослых" : "взрослых";
    let s = `${adults} ${adultWord}`;
    if (children > 0) {
      const childWord = children === 1 ? "ребёнок" : children <= 4 ? "ребёнка" : "детей";
      s += `, ${children} ${childWord}`;
    }
    return s;
  }

  function handleSubmit() {
    if (!dfrom || !dto) { setPanel("calendar"); return; }
    openBooking({
      dfrom: fmtDMY(dfrom),
      dto:   fmtDMY(dto),
      adults,
      children,
      childrenAges: children > 0 ? ages : undefined,
    });
  }

  const DD_TRANSITION = "opacity 250ms cubic-bezier(.22,1,.36,1), transform 250ms cubic-bezier(.22,1,.36,1)";

  const ddBase: React.CSSProperties = {
    position:      "absolute",
    top:           "calc(100% + 10px)",
    zIndex:        200,
    background:    "#FBF8F2",
    borderRadius:  "18px",
    boxShadow:     "0 24px 60px -18px rgba(20,30,25,.45)",
    color:         "#1F2A24",
    pointerEvents: panel ? "auto" : "none",
    transition:    DD_TRANSITION,
  };

  const calOpen    = panel === "calendar";
  const guestsOpen = panel === "guests";

  return (
    <div ref={barRef} className="hidden md:block" style={{ background: "#2F3E34", position: "relative", zIndex: 30 }}>

      {/* ── Bar row ─────────────────────────────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        style={{ display: "flex", alignItems: "stretch", gap: "clamp(14px,2vw,32px)", paddingTop: 20, paddingBottom: 20, flexWrap: "wrap" }}
      >
        {/* Title */}
        <div style={{ flex: "0 0 auto", alignSelf: "center", minWidth: 140 }}>
          <strong className="block text-base font-extrabold uppercase tracking-[.05em]" style={{ color: "#F4EFE4" }}>
            Бронирование
          </strong>
          <span className="block text-[.8rem] mt-1" style={{ color: "rgba(244,239,228,.55)" }}>
            Гарантированное заселение
          </span>
        </div>

        {/* Fields */}
        <div style={{ flex: "1 1 420px", display: "flex", gap: 12, flexWrap: "wrap", minWidth: 0 }}>

          {/* ЗАЕЗД */}
          <button
            type="button"
            onClick={() => togglePanel("calendar")}
            aria-expanded={calOpen}
            aria-haspopup="dialog"
            style={{ flex: "1 1 130px", maxWidth: 190, ...FIELD_BASE, ...(calOpen ? FIELD_ACTIVE : {}) }}
          >
            <span style={LBL}>Заезд</span>
            <span style={dfrom ? VAL : VAL_PH}>{dfrom ? fmtDot(dfrom) : "Выбрать дату"}</span>
          </button>

          {/* ВЫЕЗД */}
          <button
            type="button"
            onClick={() => togglePanel("calendar")}
            aria-expanded={calOpen}
            aria-haspopup="dialog"
            style={{ flex: "1 1 130px", maxWidth: 190, ...FIELD_BASE, ...(calOpen ? FIELD_ACTIVE : {}) }}
          >
            <span style={LBL}>Выезд</span>
            <span style={dto ? VAL : VAL_PH}>{dto ? fmtDot(dto) : "Выбрать дату"}</span>
          </button>

          {/* ГОСТИ */}
          <button
            type="button"
            onClick={() => togglePanel("guests")}
            aria-expanded={guestsOpen}
            aria-haspopup="dialog"
            style={{ flex: "1 1 150px", maxWidth: 210, ...FIELD_BASE, ...(guestsOpen ? FIELD_ACTIVE : {}) }}
          >
            <span style={LBL}>Гости</span>
            <span style={VAL}>{guestsText()}</span>
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          onClick={handleSubmit}
          className="font-extrabold uppercase tracking-[.04em] rounded-xl cursor-pointer transition-colors"
          style={{
            flex:       "0 0 auto",
            alignSelf:  "stretch",
            background: "#C2A06B",
            color:      "#2F3E34",
            border:     0,
            padding:    "0 clamp(20px,2.4vw,38px)",
            fontSize:   ".92rem",
            minHeight:  58,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#AD8B58")}
          onMouseLeave={e => (e.currentTarget.style.background = "#C2A06B")}
        >
          Найти номер
        </button>
      </div>

      {/* ── Calendar dropdown ───────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="Выбор дат"
        aria-hidden={!calOpen}
        style={{
          ...ddBase,
          left:      0,
          right:     0,
          margin:    "0 auto",
          width:     "min(720px, calc(100% - 48px))",
          opacity:   calOpen ? 1 : 0,
          transform: calOpen ? "none" : "translateY(-6px)",
        }}
      >
        <div style={{ padding: "22px 24px 18px" }}>
          {/* Nav */}
          <div className="flex items-center justify-between mb-1">
            <button
              type="button"
              onClick={() => setViewMonth(m => shiftMonth(m, -1))}
              disabled={!canGoBack}
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-25 disabled:cursor-default transition-colors hover:bg-black/5"
              style={{ color: "#1F2A24", background: "none", border: 0 }}
              aria-label="Предыдущий месяц"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMonth(m => shiftMonth(m, 1))}
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-black/5"
              style={{ color: "#1F2A24", background: "none", border: 0, marginLeft: "auto" }}
              aria-label="Следующий месяц"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Month grids */}
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

          {/* Hint */}
          <div style={{ marginTop: 16, borderTop: "1px solid #e7e0d2", paddingTop: 12 }}>
            <b style={{ fontSize: ".95rem" }}>
              {!dfrom ? "Выберите дату заезда" : !dto ? "Выберите дату выезда" : `${fmtDot(dfrom)} — ${fmtDot(dto)}`}
            </b>
            <small style={{ display: "block", color: "#6E776F", fontSize: ".78rem", marginTop: 2 }}>
              Цены и наличие — на следующем шаге
            </small>
          </div>
        </div>
      </div>

      {/* ── Guests dropdown ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="Количество гостей"
        aria-hidden={!guestsOpen}
        style={{
          ...ddBase,
          right:     24,
          width:     340,
          maxWidth:  "calc(100vw - 40px)",
          opacity:   guestsOpen ? 1 : 0,
          transform: guestsOpen ? "none" : "translateY(-6px)",
        }}
      >
        <div style={{ padding: "22px 24px" }}>
          <h3 className="font-display text-xl font-semibold mb-1">Количество гостей</h3>
          <p className="text-xs uppercase tracking-widest pb-3 mb-4" style={{ color: "#6E776F", borderBottom: "1px solid #e7e0d2" }}>
            Коттедж WILD · до 5 гостей + дети
          </p>

          {/* Adults */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <b className="block text-sm">Взрослые</b>
            </div>
            <Stepper
              value={adults} min={1} max={5}
              onDecrement={() => setAdults(n => Math.max(1, n - 1))}
              onIncrement={() => setAdults(n => Math.min(5, n + 1))}
            />
          </div>

          {/* Children */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <b className="block text-sm">Дети</b>
              <small style={{ color: "#6E776F", fontSize: ".76rem" }}>младше 5 лет — без места</small>
            </div>
            <Stepper
              value={children} min={0} max={4}
              onDecrement={() => handleChildrenChange(Math.max(0, children - 1))}
              onIncrement={() => handleChildrenChange(Math.min(4, children + 1))}
            />
          </div>

          {/* Age selects */}
          {children > 0 && (
            <div style={{ borderTop: "1px solid #e7e0d2", paddingTop: 14, marginTop: 2 }}>
              {ages.map((age, i) => (
                <div key={i} className="flex justify-between items-center mb-2.5 text-sm">
                  <span>Возраст {i + 1} ребёнка</span>
                  <select
                    value={age}
                    onChange={e => setAges(prev => { const a = [...prev]; a[i] = Number(e.target.value); return a; })}
                    className="font-sans border rounded-lg px-2 py-1.5"
                    style={{ borderColor: "#ddd5c5", background: "#fff", color: "#1F2A24" }}
                  >
                    {Array.from({ length: 13 }, (_, a) => (
                      <option key={a} value={a}>{ageLabel(a)}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Done */}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => setPanel(null)}
              className="rounded-xl px-6 py-2.5 font-bold text-sm cursor-pointer transition-colors"
              style={{ background: "#C2A06B", color: "#2F3E34", border: 0 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#AD8B58")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C2A06B")}
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
