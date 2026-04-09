/**
 * utils/email.ts — Email Sending Utility
 *
 * Centralizes email sending logic using nodemailer or any SMTP service.
 * Keeps email templates and sending logic in one place.
 *
 * Usage:
 *   import { sendEmail } from '@/utils/email';
 *   await sendEmail({
 *     to: 'user@example.com',
 *     subject: 'Welcome!',
 *     html: '<h1>Welcome to our app</h1>',
 *   });
 *
 * Dependencies: nodemailer (npm install nodemailer @types/nodemailer)
 */

// import nodemailer from 'nodemailer';
// import { env } from '../config';

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }

// const transporter = nodemailer.createTransport({
//   host: env.EMAIL_HOST,
//   port: env.EMAIL_PORT,
//   secure: env.EMAIL_PORT === 465,
//   auth: {
//     user: env.EMAIL_USER,
//     pass: env.EMAIL_PASS,
//   },
// });

// export async function sendEmail(options: EmailOptions): Promise<void> {
//   await transporter.sendMail({
//     from: env.EMAIL_FROM,
//     to: options.to,
//     subject: options.subject,
//     html: options.html,
//     text: options.text,
//   });
// }
