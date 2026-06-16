"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-sm text-emerald-300 font-medium">
        ✓ Вы подписаны на рассылку!
      </p>
    );
  }

  return (
    <form
      className="flex gap-2 w-full sm:w-auto"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="ваш@email.ru"
        className="flex-1 sm:w-56 h-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-3 text-sm focus:outline-none focus:border-white/40"
      />
      <button
        type="submit"
        className="h-10 px-4 rounded-lg bg-white text-[--primary] text-sm font-semibold hover:bg-white/90 transition-colors shrink-0"
      >
        Подписаться
      </button>
    </form>
  );
}
