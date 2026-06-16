"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, Send } from "lucide-react";
import { CONTACT } from "@/lib/data";

const contacts = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${CONTACT.phoneWhatsApp}?text=${encodeURIComponent("Здравствуйте! Хочу узнать о бронировании коттеджа.")}`,
    bg: "#25D366",
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Telegram",
    href: CONTACT.telegram,
    bg: "#229ED9",
    icon: Send,
    external: true,
  },
  {
    label: CONTACT.phone,
    href: `tel:${CONTACT.phoneDial}`,
    bg: "var(--primary)",
    icon: Phone,
    external: false,
  },
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Menu items */}
      {open && (
        <div className="flex flex-col gap-2 mb-1 animate-slide-up">
          {contacts.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border border-[--border] pr-4 pl-2 py-2.5 text-sm font-medium text-[--foreground] hover:shadow-2xl transition-all duration-150 hover:-translate-y-0.5"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: c.bg }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {c.label}
              </a>
            );
          })}
        </div>
      )}

      {/* Main button */}
      <div className="relative">
        {/* Ping ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-whatsapp pointer-events-none"
            style={{ background: "#25D366" }}
          />
        )}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: open ? "#1a1a1a" : "#25D366" }}
          className="relative w-14 h-14 rounded-full text-white shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
          aria-label={open ? "Закрыть меню связи" : "Связаться с нами"}
        >
          {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
