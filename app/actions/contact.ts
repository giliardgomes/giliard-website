"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  await resend.emails.send({
    from: "hello@giliard.com.br",
    to: "giliard.gomes59@gmail.com",
    subject: `New message from ${name}`,
    html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
  });
}