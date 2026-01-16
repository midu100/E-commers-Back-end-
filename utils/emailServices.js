const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
    
  },
});

const sendEmail =async ({email,template,subject,item}) => {
  const info = await transporter.sendMail({
    from: `"E-commers" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: template(item)
  });
}

module.exports = {sendEmail}