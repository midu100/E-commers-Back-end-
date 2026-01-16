const emailTemp = (item) => {
  return `
  <div class="max-w-xl mx-auto font-sans bg-gray-100 p-5">
          
          <div class="bg-white p-8 rounded-lg text-center flex flex-col items-center">
            
            <h2 class="text-gray-900 text-2xl mb-2 font-semibold">
              Email Verification
            </h2>

            <p class="text-gray-600 text-sm mb-6">
              Thank you for choosing <b>E-commers</b>.
              Please use the OTP below to verify your email address.
            </p>

            <div class="my-6 w-48 bg-gray-900 text-white text-2xl tracking-widest rounded-md font-bold py-3 flex justify-center">
              ${item}
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

        </div>`;
};


const resetPassTemp = (item) => {
  return `
  <div class="max-w-xl mx-auto font-sans bg-gray-100 p-5">
          
    <div class="bg-white p-8 rounded-lg text-center flex flex-col items-center">
      
      <h2 class="text-gray-900 text-2xl mb-2 font-semibold">
        Reset Your Password
      </h2>

      <p class="text-gray-600 text-sm mb-6">
        We received a request to reset your <b>E-commers</b> account password.
        Click the button below to create a new password.
      </p>

      <a href="${item}"
        style="
          background:#111827;
          color:#ffffff;
          text-decoration:none;
          padding:12px 28px;
          border-radius:6px;
          font-size:14px;
          font-weight:600;
          margin:16px 0;
          display:inline-block;
        ">
        Reset Password
      </a>

      <p class="text-gray-500 text-xs mt-4">
        This link will expire in <b>10 minutes</b>.
      </p>

      <p class="text-gray-400 text-xs mt-6">
        If you did not request a password reset, please ignore this email.
      </p>

      <p class="text-gray-400 text-xs mt-4 break-all">
        Or copy and paste this link:<br/>
        ${item}
      </p>

    </div>

    <p class="text-center text-gray-300 text-[10px] mt-4">
      © ${new Date().getFullYear()} E-commers. All rights reserved.
    </p>

  </div>`;
};

module.exports = { emailTemp,resetPassTemp };
