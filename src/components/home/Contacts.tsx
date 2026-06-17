"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, Send, Clock } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Contacts() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus("ok");
      } else {
        const d = await res.json();
        setErr(d.error ?? "Ошибка");
        setStatus("error");
      }
    } catch {
      setErr("Ошибка соединения");
      setStatus("error");
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Channels */}
        <div>
          <div className="space-y-3">
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="flex items-center gap-3 p-4 rounded-2xl border border-[--border] hover:bg-[--cream] transition-colors"
            >
              <Phone className="w-4 h-4 text-[--primary] shrink-0" />
              <span className="font-medium text-[--foreground]">{CONTACT.phone}</span>
            </a>
            <a
              href={`https://wa.me/${CONTACT.phoneWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-[--border] hover:bg-[--cream] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[--primary] shrink-0" />
              <span className="font-medium text-[--foreground]">WhatsApp</span>
            </a>
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-[--border] hover:bg-[--cream] transition-colors"
            >
              <Send className="w-4 h-4 text-[--primary] shrink-0" />
              <span className="font-medium text-[--foreground]">Telegram</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 p-4 rounded-2xl border border-[--border] hover:bg-[--cream] transition-colors"
            >
              <Mail className="w-4 h-4 text-[--primary] shrink-0" />
              <span className="font-medium text-[--foreground]">{CONTACT.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-[--muted-foreground] mt-6">
            <Clock className="w-4 h-4" /> {CONTACT.hours}
          </div>
          <p className="text-sm text-[--muted-foreground] mt-2">{CONTACT.addressFull}</p>
        </div>

        {/* Form */}
        <div>
          {status === "ok" ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <h3 className="font-display text-2xl font-bold text-[--foreground] mb-2">
                Сообщение отправлено
              </h3>
              <p className="text-[--muted-foreground]">Ответим в течение часа.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  required
                  placeholder="Имя"
                  className="h-12 rounded-2xl border border-[--border] px-4 text-sm focus:outline-none focus:border-[--primary] bg-white"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Телефон"
                  className="h-12 rounded-2xl border border-[--border] px-4 text-sm focus:outline-none focus:border-[--primary] bg-white"
                />
              </div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full h-12 rounded-2xl border border-[--border] px-4 text-sm focus:outline-none focus:border-[--primary] bg-white"
              />
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Сообщение"
                className="w-full rounded-2xl border border-[--border] px-4 py-3 text-sm focus:outline-none focus:border-[--primary] bg-white resize-none"
              />
              {status === "error" && <p className="text-xs text-red-500">{err}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Отправка…" : "Отправить"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
