import { BnovoWidget } from "@/components/booking/BnovoWidget";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/data";

export const metadata = {
  title: "Бронирование — Spring Village",
  description: "Забронируйте коттедж онлайн. Мгновенное подтверждение, лучшие цены напрямую.",
};

export default function BookingPage() {
  return (
    <div className="pt-16 min-h-screen bg-[--background]">
      <div className="bg-[--muted] border-b border-[--border] py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary] mb-3">Онлайн</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[--foreground] mb-2">
            Бронирование
          </h1>
          <p className="text-[--muted-foreground] text-lg max-w-xl">
            Выберите коттедж и даты — мгновенное подтверждение и лучшие цены напрямую.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-4 sm:p-6 overflow-hidden">
              <BnovoWidget />
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-6">
              <h2 className="font-display text-lg font-bold text-[--foreground] mb-4">
                Нужна помощь?
              </h2>
              <p className="text-sm text-[--muted-foreground] mb-5">
                Мы на связи ежедневно {CONTACT.hours}.
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${CONTACT.phoneDial}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[--border] hover:border-[--primary]/40 hover:bg-[--muted] transition-all text-sm font-medium text-[--foreground]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[--primary]" />
                  </div>
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[--border] hover:border-[--primary]/40 hover:bg-[--muted] transition-all text-sm font-medium text-[--foreground]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[--primary]" />
                  </div>
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[--border] hover:border-[--primary]/40 hover:bg-[--muted] transition-all text-sm font-medium text-[--foreground]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[--primary]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[--primary]" />
                  </div>
                  Telegram
                </a>
              </div>
            </div>

            <div className="bg-[--muted] rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-[--foreground] mb-4">
                Гарантии
              </h2>
              <ul className="space-y-2.5 text-sm text-[--foreground]">
                {[
                  "Лучшая цена при бронировании напрямую",
                  "Бесплатная отмена за 48 часов",
                  "Мгновенное подтверждение",
                  "Поддержка 7 дней в неделю",
                  "Безопасная оплата",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2">
                    <span className="text-[--primary] font-bold shrink-0">✓</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
