const userSchema = require("../models/userSchema");
const { sendEmail } = require("../utils/emailServices");
const { generateOTP, generateAccToken, generateRefreshToken, generateResetToken } = require("../utils/helpers");
const { isValidEmail, isValidPassword } = require("../utils/regexValidation");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, phone, address, role } = req.body;

    if (!email) return res.status(400).send({ message: "Email is required." });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Please enter valid email." });
    if (!password)
      return res.status(400).send({ message: "Password is required." });
    if (!isValidPassword(password))
      return res.status(400).send({
        message: "Please choose strong password.(Atleast 1 letter & 1 number)",
      });

    const existUser = await userSchema.findOne({ email });
    if (existUser)
      return res.status(400).send({ message: "Email already exists." });

    const generateOtp = generateOTP();

    const userData = new userSchema({
      fullName,
      email,
      password,
      phone,
      address,
      role,
      otp: generateOtp,
      otpExpire: Date.now() + 2 * 60 * 1000,
    });
    sendEmail({
      email: email,
      subject: "Email Verification",
      otp: generateOtp,
    });
    userData.save();

    res
      .status(201)
      .send({ message: "Registration Success,Please verify your email." });
  } catch (error) {
    console.log(error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp) return res.status(400).send({ message: "OTP is required" });
    if (!email) return res.status(400).send({ message: "Invalid request" });

    const user = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpire: { $gt: new Date() }, // expiry check in DB
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP",});
    }

    user.isVerified = true;
    user.otp = null;
    user.save();

    res.status(200).send({ message: "Verification Successful." });
  } catch (error) {
    console.log(error);
  }
};

const resendOTP = async(req,res)=>{
    try {
        const{email} = req.body

        if (!email) return res.status(400).send({ message: "Invalid request" });

        const user = await userSchema.findOne({
            email,
            isVerified : false
        })

        if (!user) return res.status(400).send({ message: "Invalid request" });

        const generateOtp = generateOTP()

        sendEmail({email:email,subject:'Verify your email' ,otp : generateOtp})

        user.otp = generateOTP()
        user.otpExpire = Date.now() + 2 * 60 * 1000
        user.save()

        res.status(200).send({message : 'OTP send'})


    } 
    
    catch (error) {
      console.log(error)    
    }
}

const signIn = async (req,res)=>{
    try {
        const{email,password} = req.body

        if(!email) return res.status(400).send({message : 'Email is required'})
        if(!password) return res.status(400).send({message : 'Password is required'})

        const existUser = await userSchema.findOne({email})
        if(!existUser) return res.status(400).send({message : 'User Not Registered'})
        if(!existUser.isVerified) return res.status(400).send({message : 'Your email is not verify,please verfy your email.'})

        const matchedPass = await existUser.comparePassword(password)
        if(!matchedPass) return res.status(400).send({message : 'Incorrect password'})

        const accToken = generateAccToken(existUser)
        const refToken = generateRefreshToken(existUser)
        
        res.cookie('X_AS-TOKEN',accToken)
        res.cookie('R_FS-TOKEN',refToken)

        res.status(200).send({message : 'Login Successful.'})


    } 
    
    catch (error) {
      console.log(error)    
    }
}

const forgotPass = async(req,res)=>{
  try {
    const {email} = req.body
    if(!email) return res.status(400).send({message : 'Email is required'})
    if(!isValidEmail) return res.status(400).send({message : 'Enter Valid Email.'})

    const existUser = await userSchema.findOne({email})
    if(!existUser) return res.status(400).send({message :'Email not found'})

    const resetPass = generateResetToken(existUser)
    const Reset_Pass_Link = `${process.env.CLIENT_URL || "http://localhost:8000/"}/resetPass/?sec=${resetPass}`
    
    sendEmail({
      email: email,
      subject: "reset password",
      otp: Reset_Pass_Link,
    });

    res.status(200).send({message : 'reset pass link in your email.'})
    
    

  } 
  catch (error) {
    console.log(error)  
  }
}

module.exports = { signUp, verifyOTP,resendOTP,signIn };
