const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmails(certificates, subject, message) {
  for (const cert of certificates) {
    if (!cert.email) {
      console.error('❌ Skipping email sending: no email address for', cert);
      continue;
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to: cert.email,
        subject: subject,
        text: `${message}\n\nRegards,\nCertificate Generator Team`,
        attachments: [{ filename: `${cert.name}.pdf`, path: cert.path }],
      });

      // ✅ Success log
      console.log(`📤 Email sent to: ${cert.email}`);
    } catch (error) {

    }
  }
}

module.exports = { sendEmails };
