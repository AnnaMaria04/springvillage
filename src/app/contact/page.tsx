"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT } from "@/lib/data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Ошибка");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Ошибка при отправке. Позвоните нам.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon: Phone, label: "Телефон", value: CONTACT.phone, href: `tel:${CONTACT.phoneDial}` },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: "Адрес", value: CONTACT.address, href: null },
    { icon: Clock, label: "Режим работы", value: CONTACT.hours, href: null },
  ];

  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Контакты</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">
            Свяжитесь с нами
          </h1>
          <p className="text-[--muted-foreground] text-lg">Ответим в течение 15 минут</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: info + map */}
          <div className="space-y-8">
            <div className="space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[--primary]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[--primary]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-[--foreground] font-medium text-sm">{item.value}</div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            {/* Quick contact buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${CONTACT.phoneWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-[#1db954] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#229ED9] text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-[#1a8fc4] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Telegram
              </a>
            </div>

            {/* Yandex map */}
            <div className="rounded-2xl overflow-hidden border border-[--border] shadow-sm">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=${CONTACT.yandexMapOid}`}
                width="100%"
                height="380"
                frameBorder="0"
                title="Spring Village на карте"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[--primary]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-[--primary]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[--foreground] mb-2">Сообщение отправлено!</h3>
                <p className="text-[--muted-foreground] text-sm">Ответим в течение 15 минут.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold text-[--foreground] mb-6">Написать нам</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider">Имя *</label>
                      <Input name="name" required placeholder="Ваше имя" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider">Телефон</label>
                      <Input name="phone" placeholder="+7 (000) 000-00-00" type="tel" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider">Email *</label>
                    <Input name="email" required type="email" placeholder="email@example.com" className="h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider">Тема</label>
                    <select
                      name="subject"
                      className="flex h-11 w-full rounded-xl border border-[--input] bg-[--background] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--ring]"
                    >
                      <option>Вопрос о бронировании</option>
                      <option>Вопрос о коттедже</option>
                      <option>Корпоративные мероприятия</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider">Сообщение *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Ваш вопрос или пожелание..."
                      className="flex w-full rounded-xl border border-[--input] bg-[--background] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--ring] resize-none"
                    />
                  </div>

                  {serverError && (
                    <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{serverError}</p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Отправляем...</>
                    ) : "Отправить сообщение"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
