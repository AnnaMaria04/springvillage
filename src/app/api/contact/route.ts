import { NextResponse } from "next/server";
import { z } from "zod";
import { corsHeaders, corsOptionsResponse } from "@/lib/cors";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().max(20).optional(),
  email: z.string().email(),
  subject: z.string().max(100).optional(),
  message: z.string().min(5).max(2000),
  // Согласие на обработку ПД обязательно (152-ФЗ): без него обращение не принимаем.
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

export async function OPTIONS(req: Request) {
  return corsOptionsResponse(req.headers.get("origin"));
}

export async function POST(req: Request) {
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
      { error: parsed.error.issues[0]?.message ?? "Неверные данные формы" },
      { status: 400 },
    );
  }

  const { name, phone, email, subject, message } = parsed.data;

  // Обращение только пересылается владельцу и нигде не складывается в базу.
  // Раньше здесь был insert в Supabase (Франкфурт / Огайо), а ч. 5 ст. 18 152-ФЗ
  // требует первичную базу с ПД граждан РФ на территории России.
  const delivered = await notifyTelegram(
    `📩 <b>Новое сообщение с сайта</b>\n\n` +
    `👤 ${name}\n` +
    `📧 ${email}\n` +
    (phone ? `📞 ${phone}\n` : "") +
    (subject ? `📌 ${subject}\n` : "") +
    `✅ Согласие на обработку ПД: да\n` +
    `\n${message}`,
  );

  if (!delivered) {
    return NextResponse.json(
      { error: "Не удалось отправить сообщение. Пожалуйста, позвоните нам." },
      { status: 502, headers: corsHeaders(origin) },
    );
  }

  return NextResponse.json({ success: true }, { headers: corsHeaders(origin) });
}
