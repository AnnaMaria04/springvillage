"use client";

import Link from "next/link";

type Props = {
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  /** id-префикс, чтобы несколько форм на одной странице не конфликтовали */
  idPrefix: string;
};

/**
 * Одна обязательная галочка — согласие на обработку персональных данных (152-ФЗ).
 * Намеренно не плодим галочки: остальные документы доступны ссылками в подвале.
 */
export function ConsentFields({ consent, onConsentChange, idPrefix }: Props) {
  return (
    <label htmlFor={`${idPrefix}-consent`} className="flex items-start gap-3 cursor-pointer">
      <input
        id={`${idPrefix}-consent`}
        type="checkbox"
        checked={consent}
        onChange={(e) => onConsentChange(e.target.checked)}
        required
        className="mt-0.5 w-4 h-4 shrink-0 rounded border-border text-primary accent-primary"
      />
      <span className="text-xs text-muted-foreground leading-relaxed">
        Я даю{" "}
        <Link href="/soglasie" target="_blank" className="underline text-foreground">
          согласие на обработку персональных данных
        </Link>{" "}
        и принимаю{" "}
        <Link href="/privacy" target="_blank" className="underline text-foreground">
          политику их обработки
        </Link>
        .
      </span>
    </label>
  );
}
