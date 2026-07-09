"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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

function pad(n: number) { return String(n).padStart(2, "0"); }
function fmtDot(d: Date) { return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`; }
function fmtDMY(d: Date) { return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`; }
function isWeekend(d: Date) { return d.getDay() === 0 || d.getDay() === 6; }
function shiftMonth(d: Date, delta: number) { return new Date(d.getFullYear(), d.getMonth() + delta, 1); }

function buildGrid(year: number, month: number): (Date | null)[][] {
  const startDow = (new Date(year, month, 1).getDay() + 6) % 7;
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

function MonthGrid({ year, month, today, dfrom, dto, onDay }: {
  year: number; month: number; today: Date;
  dfrom: Date | null; dto: Date | null; onDay: (d: Date) => void;
}) {
  const rows        = buildGrid(year, month);
  const hasBothEnds = dfrom !== null && dto !== null;

  return (
    <div>
      <p className="font-display text-center font-semibold mb-3" style={{ fontSize: "1.05rem", color: "#1F2A24" }}>
        {MONTHS_RU[month]} {year}
      </p>
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <span key={d} className="text-center block" style={{ fontSize: ".68rem", fontWeight: 700, color: i >= 5 ? "#AD8B58" : "#6E776F", paddingBottom: 7 }}>
            {d}
          </span>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} className="grid grid-cols-7">
          {row.map((day, ci) => {
            if (!day) return <span key={ci} />;
            const isPast    = day < today && !sameDay(day, today);
            const isFrom    = !!(dfrom && sameDay(day, dfrom));
            const isTo      = !!(dto   && sameDay(day, dto));
            const isEnd     = isFrom || isTo;
            const isInRange = hasBothEnds && dfrom && dto && day > dfrom && day < dto;
            const isWe      = isWeekend(day);

            let bg    = "transparent";
            let color = isWe ? "#AD8B58" : "#1F2A24";
            let br    = "9px";

            if (isEnd) {
              bg    = "#C2A06B";
              color = "#fff";
              if (hasBothEnds) {
                if (isFrom && !isTo) br = "9px 0 0 9px";
                else if (isTo && !isFrom) br = "0 9px 9px 0";
              }
            } else if (isInRange) {
              bg = "rgba(194,160,107,.22)";
              br = "0";
            }

            return (
              <button
                key={ci}
                type="button"
                disabled={isPast}
                onClick={() => onDay(day)}
                style={{
                  aspectRatio: "1", border: 0,
                  background: bg, color: isPast ? "#c7c2b6" : color,
                  cursor: isPast ? "default" : "pointer",
                  borderRadius: br, fontSize: ".88rem",
                  fontFamily: "inherit", fontWeight: isEnd ? 700 : undefined,
                  transition: "background 200ms ease",
                }}
                onMouseEnter={e => { if (!isPast && !isEnd) e.currentTarget.style.background = "rgba(194,160,107,.22)"; }}
                onMouseLeave={e => { if (!isPast && !isEnd) e.currentTarget.style.background = isInRange ? "rgba(194,160,107,.22)" : "transparent"; }}
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

// ─── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({ value, min, max, onDecrement, onIncrement }: {
  value: number; min: number; max: number; onDecrement: () => void; onIncrement: () => void;
}) {
  const btn = (disabled: boolean): React.CSSProperties => ({
    width: 33, height: 33, border: "1px solid #ddd5c5", background: "#fff",
    borderRadius: 9, fontSize: "1.05rem", lineHeight: 1, cursor: disabled ? "default" : "pointer",
    color: "#2F3E34", opacity: disabled ? 0.35 : 1, display: "flex",
    alignItems: "center", justifyContent: "center",
    transition: "border-color 200ms ease, background 200ms ease",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
      <button type="button" onClick={onDecrement} disabled={value <= min} style={btn(value <= min)}>−</button>
      <span style={{ minWidth: 24, textAlign: "center", fontWeight: 700, fontSize: ".92rem" }}>{value}</span>
      <button type="button" onClick={onIncrement} disabled={value >= max} style={btn(value >= max)}>+</button>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bcb5a5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v4M16 3v4"/>
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bcb5a5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6"/>
    </svg>
  );
}

// ─── BookingBar ───────────────────────────────────────────────────────────────

const EASE = "cubic-bezier(.22,1,.36,1)";
const LBL: React.CSSProperties  = { display: "block", fontSize: ".72rem", color: "#8a8575", marginBottom: 1, fontWeight: 500 };
const VAL: React.CSSProperties  = { display: "block", fontSize: ".98rem", fontWeight: 700, color: "#1F2A24", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const VAL_PH: React.CSSProperties = { ...VAL, color: "#9a9484", fontWeight: 600 };

function fieldStyle(active: boolean, wide = false): React.CSSProperties {
  return {
    flex: "0 0 auto", width: wide ? 208 : 158,
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
    textAlign: "left", background: "#fff", border: 0, borderRadius: 8,
    padding: "7px 13px", minHeight: 54, color: "#1F2A24", cursor: "pointer",
    boxShadow: active ? "0 0 0 2px #C2A06B" : "none",
    transition: `box-shadow 250ms ${EASE}`,
  };
}

type Panel = "calendar" | "guests" | null;

export function BookingBar() {
  const { openBooking } = useBooking();

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

  const [dfrom,     setDfrom]     = useState<Date | null>(null);
  const [dto,       setDto]       = useState<Date | null>(null);
  const [adults,    setAdults]    = useState(2);
  const [children,  setChildren]  = useState(0);
  const [ages,      setAges]      = useState<number[]>([]);
  const [panel,     setPanel]     = useState<Panel>(null);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const wrapRef   = useRef<HTMLDivElement>(null);
  const month2    = shiftMonth(viewMonth, 1);
  const canGoBack = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1);

  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setPanel(null); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [panel]);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPanel(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel]);

  function togglePanel(p: Panel) { setPanel(prev => (prev === p ? null : p)); }

  function handleDay(day: Date) {
    if (!dfrom || dto !== null) { setDfrom(day); setDto(null); }
    else if (sameDay(day, dfrom)) { setDfrom(null); }
    else if (day < dfrom) { setDfrom(day); setDto(null); }
    else { setDto(day); setTimeout(() => setPanel(null), 240); }
  }

  function handleChildrenChange(n: number) {
    setChildren(n);
    setAges(prev => n > prev.length ? [...prev, ...Array<number>(n - prev.length).fill(2)] : prev.slice(0, n));
  }

  function guestsText() {
    const aw = adults === 1 ? "взрослый" : "взрослых";
    let s = `${adults} ${aw}`;
    if (children > 0) {
      const cw = children === 1 ? "ребёнок" : children <= 4 ? "ребёнка" : "детей";
      s += `, ${children} ${cw}`;
    }
    return s;
  }

  function handleSubmit() {
    if (!dfrom || !dto) { setPanel("calendar"); return; }
    openBooking({ dfrom: fmtDMY(dfrom), dto: fmtDMY(dto), adults, children, childrenAges: children > 0 ? ages : undefined });
  }

  const DD_TR = `opacity 250ms ${EASE}, transform 250ms ${EASE}`;
  const ddBase: React.CSSProperties = {
    position: "absolute", top: "calc(100% + 10px)", zIndex: 50,
    background: "#FBF8F2", borderRadius: 16,
    boxShadow: "0 24px 60px -18px rgba(20,30,25,.45)", color: "#1F2A24",
    pointerEvents: panel ? "auto" : "none", transition: DD_TR,
  };

  const calOpen    = panel === "calendar";
  const guestsOpen = panel === "guests";

  return (
    <div className="hidden md:block" style={{ background: "#2F3E34" }}>
      {/* ── Bar row ── */}
      <div
        ref={wrapRef}
        style={{
          position: "relative", zIndex: 30,
          maxWidth: 1120, margin: "0 auto",
          padding: "13px clamp(18px,4vw,40px)",
          display: "flex", alignItems: "center",
          gap: "clamp(14px,2vw,28px)", flexWrap: "wrap",
        }}
      >
        {/* Title */}
        <div style={{ flex: "0 0 auto", color: "#F4EFE4", minWidth: 140 }}>
          <strong style={{ display: "block", fontSize: ".95rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>
            Бронирование
          </strong>
          <span style={{ display: "block", fontSize: ".74rem", color: "rgba(244,239,228,.55)", marginTop: 3 }}>
            Гарантированное заселение
          </span>
        </div>

        {/* Controls */}
        <div style={{ flex: "0 1 auto", marginLeft: "auto", display: "flex", alignItems: "stretch", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>

          {/* ЗАЕЗД */}
          <button type="button" onClick={() => togglePanel("calendar")} aria-expanded={calOpen} aria-haspopup="dialog" style={fieldStyle(calOpen)}>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={LBL}>Заезд</span>
              <span style={dfrom ? VAL : VAL_PH}>{dfrom ? fmtDot(dfrom) : "Выбрать дату"}</span>
            </span>
            <CalendarIcon />
          </button>

          {/* ВЫЕЗД */}
          <button type="button" onClick={() => togglePanel("calendar")} aria-expanded={calOpen} aria-haspopup="dialog" style={fieldStyle(calOpen)}>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={LBL}>Выезд</span>
              <span style={dto ? VAL : VAL_PH}>{dto ? fmtDot(dto) : "Выбрать дату"}</span>
            </span>
            <CalendarIcon />
          </button>

          {/* ГОСТИ */}
          <button type="button" onClick={() => togglePanel("guests")} aria-expanded={guestsOpen} aria-haspopup="dialog" style={fieldStyle(guestsOpen, true)}>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={LBL}>Гости</span>
              <span style={VAL}>{guestsText()}</span>
            </span>
            <PersonIcon />
          </button>

          {/* НАЙТИ НОМЕР */}
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              flex: "0 0 auto", alignSelf: "stretch",
              background: "#C2A06B", color: "#2F3E34", border: 0, borderRadius: 8,
              padding: "0 24px", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: ".04em", fontSize: ".82rem", cursor: "pointer",
              minHeight: 54, whiteSpace: "nowrap", transition: `background 250ms ${EASE}`,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#AD8B58")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C2A06B")}
          >
            Найти&nbsp;номер
          </button>
        </div>

        {/* ── Calendar dropdown ── */}
        <div
          role="dialog" aria-label="Выбор дат" aria-hidden={!calOpen}
          style={{
            ...ddBase,
            left: "clamp(18px,4vw,40px)", right: "clamp(18px,4vw,40px)",
            margin: "0 auto", width: "min(680px, 100%)",
            opacity: calOpen ? 1 : 0, transform: calOpen ? "none" : "translateY(-6px)",
          }}
        >
          <div style={{ padding: "20px 22px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <button type="button" onClick={() => setViewMonth(m => shiftMonth(m, -1))} disabled={!canGoBack} aria-label="Назад"
                style={{ background: "none", border: 0, cursor: canGoBack ? "pointer" : "default", color: "#1F2A24", fontSize: "1.25rem", padding: "6px 10px", borderRadius: 8, opacity: canGoBack ? 1 : 0.25 }}>‹</button>
              <button type="button" onClick={() => setViewMonth(m => shiftMonth(m, 1))} aria-label="Вперёд"
                style={{ background: "none", border: 0, cursor: "pointer", color: "#1F2A24", fontSize: "1.25rem", padding: "6px 10px", borderRadius: 8, marginLeft: "auto" }}>›</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <MonthGrid year={viewMonth.getFullYear()} month={viewMonth.getMonth()} today={today} dfrom={dfrom} dto={dto} onDay={handleDay} />
              <div className="hidden sm:block">
                <MonthGrid year={month2.getFullYear()} month={month2.getMonth()} today={today} dfrom={dfrom} dto={dto} onDay={handleDay} />
              </div>
            </div>

            <div style={{ marginTop: 14, borderTop: "1px solid #e7e0d2", paddingTop: 11 }}>
              <b style={{ fontSize: ".92rem" }}>
                {!dfrom ? "Выберите дату заезда" : !dto ? "Выберите дату выезда" : `${fmtDot(dfrom)} — ${fmtDot(dto)}`}
              </b>
              <small style={{ display: "block", color: "#6E776F", fontSize: ".76rem", marginTop: 2 }}>Цены и наличие — на следующем шаге</small>
            </div>
          </div>
        </div>

        {/* ── Guests dropdown ── */}
        <div
          role="dialog" aria-label="Количество гостей" aria-hidden={!guestsOpen}
          style={{
            ...ddBase,
            right: "clamp(18px,4vw,40px)", width: 330, maxWidth: "calc(100vw - 36px)",
            opacity: guestsOpen ? 1 : 0, transform: guestsOpen ? "none" : "translateY(-6px)",
          }}
        >
          <div style={{ padding: "20px 22px" }}>
            <h3 className="font-display font-semibold mb-1" style={{ fontSize: "1.15rem", margin: "0 0 4px" }}>Количество гостей</h3>
            <p style={{ fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#6E776F", borderBottom: "1px solid #e7e0d2", paddingBottom: 11, marginBottom: 15 }}>
              Коттедж WILD · до 5 гостей + дети
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15, gap: 12 }}>
              <b style={{ fontSize: ".92rem" }}>Взрослые</b>
              <Stepper value={adults} min={1} max={5} onDecrement={() => setAdults(n => Math.max(1, n-1))} onIncrement={() => setAdults(n => Math.min(5, n+1))} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: children > 0 ? 0 : 15, gap: 12 }}>
              <div>
                <b style={{ display: "block", fontSize: ".92rem" }}>Дети</b>
                <small style={{ color: "#6E776F", fontSize: ".74rem" }}>младше 5 лет — без места</small>
              </div>
              <Stepper value={children} min={0} max={4} onDecrement={() => handleChildrenChange(Math.max(0, children-1))} onIncrement={() => handleChildrenChange(Math.min(4, children+1))} />
            </div>

            {children > 0 && (
              <div style={{ borderTop: "1px solid #e7e0d2", paddingTop: 13, marginTop: 15 }}>
                {ages.map((age, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: ".88rem" }}>
                    <span>Возраст {i + 1} ребёнка</span>
                    <select
                      value={age}
                      onChange={e => setAges(prev => { const a = [...prev]; a[i] = Number(e.target.value); return a; })}
                      style={{ fontFamily: "inherit", padding: "6px 9px", border: "1px solid #ddd5c5", borderRadius: 9, background: "#fff", color: "#1F2A24" }}
                    >
                      {Array.from({ length: 13 }, (_, a) => <option key={a} value={a}>{ageLabel(a)}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <button
                type="button" onClick={() => setPanel(null)}
                style={{ background: "#C2A06B", color: "#2F3E34", border: 0, borderRadius: 10, padding: ".65em 1.5em", fontWeight: 700, cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#AD8B58")}
                onMouseLeave={e => (e.currentTarget.style.background = "#C2A06B")}
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
