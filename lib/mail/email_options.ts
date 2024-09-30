const nodeMailer = require(`nodemailer`);
export let transporter = nodeMailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: "rightson@univora.store",
    pass: process.env.EMAIL_PASSWORD_RIGHTSON,
  },
});
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export function mail_options({
  from,
  to,
  subject,
  html,
  replyTo,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): EmailOptions {
  return {
    from,
    to,
    subject,
    html,
    replyTo,
  };
}
