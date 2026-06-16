import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Log submission — replace with email/CRM integration when ready
    console.log("[Contact form submission]", {
      ...data,
      timestamp: new Date().toISOString(),
    });

    // TODO: send via Resend, Nodemailer, or Telegram bot
    // await sendEmail({ to: process.env.CONTACT_EMAIL, ...data });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Неверные данные формы" }, { status: 400 });
    }
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
