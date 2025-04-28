// lib/resend.ts
import { Resend } from 'resend';
import { getOrderConfirmationEmail, getReportDeliveryEmail } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(options: {
  customerEmail: string;
  bookTitle: string;
  isRush: boolean;
}) {
  const emailData = getOrderConfirmationEmail(options);
  return resend.emails.send(emailData);
}

export async function sendReportDelivery(options: {
  customerEmail: string;
  bookTitle: string;
  reportText: string;
}) {
  const emailData = getReportDeliveryEmail(options);
  return resend.emails.send(emailData);
}