"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/lib/data";

declare global {
  interface Window {
    Bnovo_Widget: {
      init: (cb: () => void) => void;
      open: (id: string, config: Record<string, string>) => void;
    };
  }
}

const WIDGET_ID = "_bn_widget_";
const SCRIPT_SRC = "//widget.reservationsteps.ru/js/bnovo.js";

export function BnovoHorizontalWidget() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    function initWidget() {
      window.Bnovo_Widget.init(() => {
        window.Bnovo_Widget.open(WIDGET_ID, {
          type: "horizontal",
          uid: CONTACT.bnovoUid,
          lang: "ru",
          width: "100%",
          width_mobile: "300",
          background: "#2F3E34",
          background_mobile: "#2F3E34",
          bg_alpha: "0",
          bg_alpha_mobile: "0",
          border_color_mobile: "#E6E0D4",
          padding: "0",
          padding_mobile: "0",
          border_radius: "12",
          button_font_size: "15",
          button_height: "56",
          font_type: "inter",
          without_title: "on",
          inp_color: "#1F2A24",
          inp_bordhover: "#C2A06B",
          inp_bordcolor: "#E6E0D4",
          inp_alpha: "100",
          btn_background: "#C2A06B",
          btn_background_over: "#AD8B58",
          btn_textcolor: "#2F3E34",
          btn_textover: "#2F3E34",
          btn_bordcolor: "#C2A06B",
          btn_bordhover: "#AD8B58",
          min_age: "0",
          max_age: "17",
          adults_default: "2",
          dates_preset: "on",
          dfrom_today: "on",
          dfrom_value: "2",
          dto_nextday: "on",
          dto_value: "2",
          cancel_color: "#2F3E34",
          switch_mobiles_width: "800",
        });
      });
    }

    if (typeof window !== "undefined" && window.Bnovo_Widget) {
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
    script.onload = initWidget;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className={[
        "flex items-center",
        "gap-[clamp(20px,4vw,48px)] px-[clamp(20px,5vw,56px)] py-[22px]",
        "[@media(max-width:900px)]:flex-col [@media(max-width:900px)]:items-stretch",
        "[@media(max-width:900px)]:gap-[14px] [@media(max-width:900px)]:text-center",
      ].join(" ")}
      style={{ background: "#2F3E34" }}
    >
      {/* Branded label */}
      <div className="shrink-0" style={{ color: "#F4EFE4", lineHeight: 1.2 }}>
        <strong className="block text-[1.15rem] font-bold uppercase tracking-[.04em]">
          Бронирование
        </strong>
        <span
          className="block text-[.84rem] mt-[5px]"
          style={{ color: "rgba(244,239,228,.6)" }}
        >
          Гарантированное заселение
        </span>
      </div>

      {/* Bnovo widget */}
      <div className="flex-1 min-w-0">
        <div id={WIDGET_ID} className="left w-full">
          <a
            href="https://bnovo.ru/"
            id="_bnovo_link_"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden"
          >
            Биново
          </a>
        </div>
      </div>
    </div>
  );
}
