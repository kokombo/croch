import nodemailer = require("nodemailer");

const sendEmail = async (data: Email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: data.from,
    to: data.to,
    html: data.html,
    subject: data.subject,
    text: data.text,
  });
};

export = sendEmail;
