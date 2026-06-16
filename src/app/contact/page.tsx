"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-[--background]">
      <div className="bg-[--muted] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[--foreground] mb-3">Контакты</h1>
          <p className="text-[--muted-foreground] text-lg">Свяжитесь с нами любым удобным способом</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info + Map */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[--foreground] mb-5">Как с нами связаться</h2>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Телефон", value: "+7 (495) 123-45-67", href: "tel:+74951234567" },
                  { icon: Mail, label: "Email", value: "info@springvillage.ru", href: "mailto:info@springvillage.ru" },
                  { icon: MapPin, label: "Адрес", value: "Московская область, 50 км от МКАД по Ярославскому шоссе", href: null },
                  { icon: Clock, label: "Режим работы", value: "Ежедневно с 9:00 до 21:00", href: null },
                ].map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[--primary]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[--muted-foreground] uppercase tracking-wider mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-[--foreground] font-medium">{item.value}</div>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Yandex map — real Spring Village location */}
            <div className="rounded-2xl overflow-hidden border border-[--border] shadow-sm">
              <iframe
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=193725846598"
                width="100%"
                height="400"
                frameBorder="0"
                title="Spring Village на карте"
                allowFullScreen
                loading="lazy"
                className="block"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[--primary]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[--primary]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[--foreground] mb-2">Сообщение отправлено!</h3>
                <p className="text-[--muted-foreground] text-sm">Мы ответим вам в течение часа.</p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-xl font-bold text-[--foreground] mb-5">Написать нам</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[--foreground]">Имя *</label>
                      <Input required placeholder="Ваше имя" className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[--foreground]">Телефон</label>
                      <Input placeholder="+7 (000) 000-00-00" type="tel" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[--foreground]">Email *</label>
                    <Input required type="email" placeholder="email@example.com" className="h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[--foreground]">Тема</label>
                    <select className="flex h-11 w-full rounded-lg border border-[--input] bg-[--background] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring]">
                      <option>Вопрос о бронировании</option>
                      <option>Вопрос о коттедже</option>
                      <option>Корпоративные мероприятия</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[--foreground]">Сообщение *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ваш вопрос или пожелание..."
                      className="flex w-full rounded-lg border border-[--input] bg-[--background] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Отправляем...</>
                    ) : (
                      "Отправить сообщение"
                    )}
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
