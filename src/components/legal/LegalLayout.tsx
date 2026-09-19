import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { LEGAL, LEGAL_DOCS } from "@/content/legal";
import { breadcrumbSchema } from "@/lib/schema";

export function LegalLayout({
  title,
  subtitle,
  href,
  children,
}: {
  title: string;
  subtitle?: string;
  /** Канонический путь документа — используется для хлебных крошек и подсветки в списке */
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16 min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Главная", url: "/" },
              { name: title, url: href },
            ]),
          ),
        }}
      />

      <div className="bg-muted border-b border-border py-14 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
            {title}
          </h1>
          {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
          <p className="text-muted-foreground text-sm mt-3">
            Редакция от {LEGAL.updated} · {LEGAL.entityShort}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-8">
        {children}

        <div className="bg-muted rounded-2xl p-6 mt-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            Вопросы по документу:{" "}
            <a href={`tel:${CONTACT.phoneDial}`} className="text-primary font-medium hover:underline">
              {CONTACT.phone}
            </a>{" "}
            или{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-primary font-medium hover:underline">
              {CONTACT.email}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LEGAL_DOCS.filter((d) => d.href !== href).map((doc) => (
              <li key={doc.href}>
                <Link href={doc.href} className="text-primary hover:underline">
                  {doc.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-foreground mb-3">{heading}</h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <span className="text-primary font-bold shrink-0 mt-0.5">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Блок реквизитов ИП — один и тот же во всех документах */
export function LegalRequisites({ bank = false }: { bank?: boolean }) {
  const rows: [string, string][] = [
    ["Наименование", LEGAL.entityFull],
    ["ИНН", LEGAL.inn],
    ["ОГРНИП", LEGAL.ogrnip],
    ["Адрес оказания услуг", LEGAL.serviceAddress],
    ["Телефон", CONTACT.phone],
    ["E-mail", CONTACT.email],
  ];

  // Оба реквизита появляются автоматически, как только владелец заполнит их в legal.ts
  if (LEGAL.registrar) {
    rows.splice(3, 0, ["Зарегистрировавший орган", LEGAL.registrar]);
  }
  if (LEGAL.registrationAddress) {
    rows.splice(3, 0, ["Адрес регистрации", LEGAL.registrationAddress]);
  }

  if (bank) {
    rows.push(
      ["Расчётный счёт", LEGAL.bank.accountFormatted],
      ["Банк", LEGAL.bank.name],
      ["БИК", LEGAL.bank.bik],
      ["Корр. счёт", LEGAL.bank.corrAccountFormatted],
      ["ИНН банка", LEGAL.bank.inn],
      ["КПП банка", LEGAL.bank.kpp],
    );
  }

  return (
    <dl className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-4 px-5 py-3">
          <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground sm:pt-0.5">{label}</dt>
          <dd className="text-sm text-foreground break-words">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
