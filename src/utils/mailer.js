// utils/mailer.js
import { Resend } from "resend";
import createError from "http-errors";
import dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send email via Resend:", err);
    throw createError(500, err);
  }
};
