import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { corsHeaders, corsOptionsResponse } from "@/lib/cors";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().max(20).optional(),
  email: z.string().email(),
  subject: z.string().max(100).optional(),
  message: z.string().min(5).max(2000),
});

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  }).catch(() => {});
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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    const supabase = createClient(url, key);
    await supabase.from("contacts").insert({ name, phone, email, subject, message });
  }

  await notifyTelegram(
    `📩 <b>Новое сообщение с сайта</b>\n\n` +
    `👤 ${name}\n` +
    `📧 ${email}\n` +
    (phone ? `📞 ${phone}\n` : "") +
    (subject ? `📌 ${subject}\n` : "") +
    `\n${message}`,
  );

  return NextResponse.json({ success: true }, { headers: corsHeaders(origin) });
}
