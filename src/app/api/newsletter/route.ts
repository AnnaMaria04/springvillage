import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { corsHeaders, corsOptionsResponse } from "@/lib/cors";

const schema = z.object({
  email: z.string().email("Введите корректный e-mail"),
  // Рассылка — реклама: согласие обязательно и должно быть подтверждаемым
  // (ст. 18 ФЗ «О рекламе», ст. 9 152-ФЗ).
  consent: z.literal(true, { message: "Требуется согласие на получение рассылки" }),
});

export async function OPTIONS(req: NextRequest) {
  return corsOptionsResponse(req.headers.get("origin"));
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ошибка валидации" },
      { status: 400 },
    );
  }

  const { email } = parsed.data;

  // ⚠️ Подписки сейчас никуда не сохраняются. Раньше e-mail складывался в Supabase
  // (Франкфурт / Огайо) — это нарушало ч. 5 ст. 18 152-ФЗ о размещении первичной базы
  // с ПД граждан РФ в России. Форма подписки на сайте не выведена, поэтому маршрут
  // фактически не используется. Прежде чем включать рассылку: завести список у
  // российского провайдера, описать его в политике на /privacy и в /soglasie.
  void email;

  return NextResponse.json({ ok: true }, { headers: corsHeaders(origin) });
}
