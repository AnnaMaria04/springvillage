import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { corsHeaders, corsOptionsResponse } from "@/lib/cors";

const schema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(7).max(20),
  message: z.string().max(500).optional(),
  source: z.string().max(50).optional(),
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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    message: message ?? null,
    source: source ?? "website",
  });

  if (error) {
    console.error("Supabase lead insert error:", error.message);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  await notifyTelegram(
    `🏠 <b>Новая заявка на бронирование</b>\n\n` +
    `👤 ${name}\n` +
    `📞 ${phone}\n` +
    (message ? `💬 ${message}\n` : "") +
    `\n📍 Источник: ${source ?? "website"}`,
  );

  return NextResponse.json({ ok: true }, { status: 201, headers: corsHeaders(origin) });
}
