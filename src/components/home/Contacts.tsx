"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Contacts() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const body = { name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"), message: fd.get("message") };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { setStatus("ok"); } else { const d = await res.json(); setErr(d.error ?? "Ошибка"); setStatus("error"); }
    } catch { setErr("Ошибка соединения"); setStatus("error"); }
  }

  return (
    <section id="contacts" className="section-y bg-[--background]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-4">Связь</p>
            <h2 className="font-display text-4xl font-bold text-[--foreground] mb-4">
              Остались вопросы?
            </h2>
            <p className="text-[--muted-foreground] leading-relaxed mb-8">
              Ответим быстро — обычно в течение часа. Звоните, пишите в WhatsApp или заполните форму.
            </p>

            <div className="space-y-3">
              <a href={`tel:${CONTACT.phoneDial}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-[--border] hover:border-[--primary]/30 hover:bg-[--muted] transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[--primary]" />
                </div>
                <div>
                  <div className="text-xs text-[--muted-foreground] mb-0.5">Телефон</div>
                  <div className="font-medium text-[--foreground] text-sm">{CONTACT.phone}</div>
                </div>
              </a>
              <a href={`https://wa.me/${CONTACT.phoneWhatsApp}?text=Здравствуйте%2C%20интересует%20бронирование%20Коттеджа%20WILD`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-[--border] hover:border-[--primary]/30 hover:bg-[--muted] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[--primary]" />
                </div>
                <div>
                  <div className="text-xs text-[--muted-foreground] mb-0.5">WhatsApp</div>
                  <div className="font-medium text-[--foreground] text-sm">Написать сейчас</div>
                </div>
              </a>
              <a href={CONTACT.telegram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-[--border] hover:border-[--primary]/30 hover:bg-[--muted] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-[--primary]" />
                </div>
                <div>
                  <div className="text-xs text-[--muted-foreground] mb-0.5">Telegram</div>
                  <div className="font-medium text-[--foreground] text-sm">@springvillage</div>
                </div>
              </a>
              <a href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-[--border] hover:border-[--primary]/30 hover:bg-[--muted] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[--primary]" />
                </div>
                <div>
                  <div className="text-xs text-[--muted-foreground] mb-0.5">Email</div>
                  <div className="font-medium text-[--foreground] text-sm">{CONTACT.email}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-[--border] p-8">
            {status === "ok" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-14 h-14 rounded-full bg-[--primary]/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[--foreground] mb-2">Сообщение отправлено</h3>
                <p className="text-[--muted-foreground] text-sm">Ответим в течение часа.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-[--foreground] mb-6">Написать нам</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[--muted-foreground] mb-1.5">Имя</label>
                    <input name="name" required placeholder="Ваше имя"
                      className="w-full h-10 rounded-lg border border-[--border] px-3 text-sm focus:outline-none focus:border-[--primary] bg-[--background]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[--muted-foreground] mb-1.5">Телефон</label>
                    <input name="phone" type="tel" placeholder="+7 (___) ___-__-__"
                      className="w-full h-10 rounded-lg border border-[--border] px-3 text-sm focus:outline-none focus:border-[--primary] bg-[--background]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[--muted-foreground] mb-1.5">Email</label>
                  <input name="email" type="email" required placeholder="email@example.ru"
                    className="w-full h-10 rounded-lg border border-[--border] px-3 text-sm focus:outline-none focus:border-[--primary] bg-[--background]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[--muted-foreground] mb-1.5">Сообщение</label>
                  <textarea name="message" rows={4} placeholder="Интересующие даты, вопросы..."
                    className="w-full rounded-lg border border-[--border] px-3 py-2.5 text-sm focus:outline-none focus:border-[--primary] bg-[--background] resize-none" />
                </div>
                {status === "error" && <p className="text-xs text-red-500">{err}</p>}
                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Отправка…" : "Отправить"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
