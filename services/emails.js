import nodemailer from 'nodemailer';
import { htmlCode } from './html.js';

export const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.nodeMailerEmail,
      pass: process.env.nodeMailerPassword,
    },
  });

  const info = await transporter.sendMail({
    from: '"YourApp" <process.env.nodeMailerEmail>', // sender address
    to: options.email, // recipient
    subject: "Password Reset Code", // Subject line
    html: htmlCode(options.code), // HTML body with reset code
  });

  console.log("Message sent: %s", info.messageId);
};
