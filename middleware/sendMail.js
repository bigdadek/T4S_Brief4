const nodemailer = require('nodemailer');
const path = require('path'); 
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (options) => {
  const templatePath = path.join(__dirname, 'templates', options.template); 

  const html = await renderTemplate(options); 

  const mailOptions = {
    from: 'khadbig20@gmail.com',
    to: options.email,
    subject: options.subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
