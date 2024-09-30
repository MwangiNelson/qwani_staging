import { mail_options, transporter } from "@/lib/mail/email_options";
import ContactFormEmail from "@/lib/mail/templates/contact_form";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.error();
  }
  const html = await render(
    ContactFormEmail({
      name,
      email,
      message,
    })
  );
  const mail = mail_options({
    from: `"QWANI" <rightson@univora.store>`,
    replyTo: email,
    to: "chari.rightson@gmail.com",
    subject: "New Contact Form Submission",
    html,
  });
  const email_sent = await transporter.sendMail(mail);
  return NextResponse.json({ email_sent });
}
