const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
    
  },
});

const sendEmail =async ({email,subject,otp}) => {
  const info = await transporter.sendMail({
    from: `"E-commers" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: `<div class="max-w-xl mx-auto font-sans bg-gray-100 p-5">
          
          <div class="bg-white p-8 rounded-lg text-center flex flex-col items-center">
            
            <h2 class="text-gray-900 text-2xl mb-2 font-semibold">
              Email Verification
            </h2>

            <p class="text-gray-600 text-sm mb-6">
              Thank you for choosing <b>E-commers</b>.
              Please use the OTP below to verify your email address.
            </p>

            <div class="my-6 w-48 bg-gray-900 text-white text-2xl tracking-widest rounded-md font-bold py-3 flex justify-center">
              ${otp}
            </div>

            <p class="text-gray-500 text-xs">
              This OTP will expire in <b>2 minutes</b>.
            </p>

            <p class="text-gray-400 text-xs mt-6">
              If you did not request this, please ignore this email.
            </p>

          </div>

          <p class="text-center text-gray-300 text-[10px] mt-4">
            © ${new Date().getFullYear()} E-commers. All rights reserved.
          </p>

        </div>`
  });
}

module.exports = {sendEmail}