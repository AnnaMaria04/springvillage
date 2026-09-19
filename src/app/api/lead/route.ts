import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { corsHeaders, corsOptionsResponse } from "@/lib/cors";

const schema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(7).max(20),
  message: z.string().max(500).optional(),
  source: z.string().max(50).optional(),
  // Согласие на обработку ПД обязательно (152-ФЗ): без него заявку не принимаем.
  consent: z.literal(true, { message: "Требуется согласие на обработку персональных данных" }),
});

async function notifyTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

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
      { error: parsed.error.issues[0]?.message ?? "Validation error" },
      { status: 422 },
    );
  }

  const { name, phone, message, source } = parsed.data;

  // Заявка только пересылается владельцу и нигде не складывается в базу.
  // Раньше здесь был insert в Supabase — проекты расположены во Франкфурте и Огайо,
  // а ч. 5 ст. 18 152-ФЗ требует, чтобы первичная база с ПД граждан РФ находилась
  // в России. Если понадобится хранить заявки — подключайте российскую БД
  // и не забудьте описать её в политике на /privacy.
  const delivered = await notifyTelegram(
    `🏠 <b>Новая заявка на бронирование</b>\n\n` +
    `👤 ${name}\n` +
    `📞 ${phone}\n` +
    (message ? `💬 ${message}\n` : "") +
    `\n📍 Источник: ${source ?? "website"}\n` +
    `✅ Согласие на обработку ПД: да`,
  );

  if (!delivered) {
    // Честная ошибка лучше ложного «заявка отправлена»: гость увидит сообщение
    // формы и сможет позвонить напрямую.
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Пожалуйста, позвоните нам." },
      { status: 502, headers: corsHeaders(origin) },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201, headers: corsHeaders(origin) });
}
