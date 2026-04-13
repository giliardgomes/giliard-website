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
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0; padding: 0; background-color: #fff; font-family: Georgia, serif;">

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #efefef; padding: 40px 16px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">

                  <!-- Header -->
                  <tr>
                    <td style="background-color: tomato; padding: 32px 40px; border-radius: 12px 12px 0 0;">
                      <p style="margin: 0; font-family: Georgia, serif; font-size: 22px; color: #ffffff; letter-spacing: -0.5px;">
                        <img
                          src="https://raw.githubusercontent.com/giliardgomes/giliard-website/main/public/images/logo.png"
                          alt="Giliard Gomes"
                          width="80"
                          style="display: block;"
                        />
                      </p>
                      <p style="margin: 8px 0 0; font-family: Arial, sans-serif; font-size: 13px; color: #111; letter-spacing: 0.5px; text-transform: uppercase;">
                        New contact message
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="background-color: #ffffff; padding: 40px;">

                      <!-- Sender info -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                        <tr>
                          <td style="padding-bottom: 16px; border-bottom: 1px solid #eeeeee;">
                            <p style="margin: 0 0 4px; font-family: Arial, sans-serif; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                              From
                            </p>
                            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #111111; font-weight: 600;">
                              ${name}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 16px;">
                            <p style="margin: 0 0 4px; font-family: Arial, sans-serif; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                              Reply to
                            </p>
                            <a href="mailto:${email}" style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; color: #111111; text-decoration: none; border-bottom: 1px solid #cccccc;">
                              ${email}
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Message -->
                      <p style="margin: 0 0 12px; font-family: Arial, sans-serif; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                        Message
                      </p>
                      <p style="margin: 0; font-family: Georgia, serif; font-size: 17px; line-height: 1.7; color: #333333;">
                        ${message.replace(/\n/g, '<br/>')}
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #fff; padding: 24px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #eeeeee;">
                      <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #aaaaaa; text-align: center;">
                        Sent via the contact form at
                        <a href="https://giliard.com.br" style="color: #aaaaaa;">giliard.com.br</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

        </body>
      </html>
    `,
  });
}