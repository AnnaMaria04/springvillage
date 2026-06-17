"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle, Loader2 } from "lucide-react";

type Props = {
  trigger: React.ReactNode;
  source?: string;
};

type State = "idle" | "loading" | "success" | "error";

export function BookingModal({ trigger, source = "modal" }: Props) {
  const [state, setState] = useState<State>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setState("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source }),
      });
      if (!res.ok) throw new Error("server error");
      setState("success");
      setName("");
      setPhone("");
      setMessage("");
      setConsent(false);
    } catch {
      setState("error");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm data-[state=open]:animate-scale-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 data-[state=open]:animate-scale-in focus:outline-none">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="font-display text-xl font-bold text-foreground">
              Запрос на бронирование
            </Dialog.Title>
            <Dialog.Close className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {state === "success" ? (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Заявка отправлена!
              </h3>
              <p className="text-sm text-muted-foreground">
                Мы свяжемся с вами в течение нескольких часов.
              </p>
              <Dialog.Close className="mt-6 h-10 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors inline-flex items-center">
                Закрыть
              </Dialog.Close>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Имя <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Сообщение
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Желаемые даты, количество гостей..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 rounded border-border text-primary accent-primary"
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Я соглашаюсь с{" "}
                  <a href="/privacy" target="_blank" className="underline text-foreground">
                    политикой конфиденциальности
                  </a>{" "}
                  и даю согласие на обработку персональных данных
                </span>
              </label>
              {state === "error" && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  Что-то пошло не так. Пожалуйста, напишите нам напрямую.
                </p>
              )}
              <button
                type="submit"
                disabled={state === "loading" || !consent}
                className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {state === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                Отправить заявку
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
