"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [consent, setConsent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (status === "ok") {
    return (
      <p className="text-sm text-emerald-300 font-medium">
        ✓ Вы подписаны на рассылку!
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputRef.current?.value ?? "";
    if (!consent) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Ошибка. Попробуйте ещё раз.");
        setStatus("error");
      } else {
        setStatus("ok");
      }
    } catch {
      setErrorMsg("Ошибка соединения. Попробуйте позже.");
      setStatus("error");
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="email"
          required
          placeholder="ваш@email.ru"
          className="flex-1 sm:w-56 h-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-3 text-sm focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          disabled={status === "loading" || !consent}
          className="h-10 px-4 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90 transition-colors shrink-0 disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Подписаться"}
        </button>
      </form>
      <label className="flex items-start gap-2.5 mt-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-white"
        />
        <span className="text-[11px] text-white/55 leading-relaxed">
          Согласен на{" "}
          <Link href="/soglasie" className="underline text-white/80 hover:text-white">
            обработку персональных данных
          </Link>{" "}
          и получение рекламной рассылки. Отписаться можно в любой момент.
        </span>
      </label>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1.5">{errorMsg}</p>
      )}
    </div>
  );
}
