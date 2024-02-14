import nodemailer from "nodemailer";

export const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  port: 587,
  host: "smtp.naver.com",
  pool: false,
  maxConnections: 1,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
