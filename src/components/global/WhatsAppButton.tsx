"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, Send } from "lucide-react";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded menu */}
      {open && (
        <div className="flex flex-col gap-2 mb-1 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <a
            href="https://wa.me/74951234567?text=Здравствуйте!%20Хочу%20узнать%20о%20бронировании%20коттеджа."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-xl shadow-lg border border-[--border] px-4 py-3 text-sm font-medium text-[--foreground] hover:bg-[--muted] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            WhatsApp
          </a>
          <a
            href="https://t.me/springvillage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-xl shadow-lg border border-[--border] px-4 py-3 text-sm font-medium text-[--foreground] hover:bg-[--muted] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#229ED9] flex items-center justify-center shrink-0">
              <Send className="w-4 h-4 text-white" />
            </div>
            Telegram
          </a>
          <a
            href="tel:+74951234567"
            className="flex items-center gap-3 bg-white rounded-xl shadow-lg border border-[--border] px-4 py-3 text-sm font-medium text-[--foreground] hover:bg-[--muted] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[--primary] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            Позвонить
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#1db954] transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
        aria-label={open ? "Закрыть" : "Написать нам"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>

      {/* Pulse ring */}
      {!open && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      )}
    </div>
  );
}
