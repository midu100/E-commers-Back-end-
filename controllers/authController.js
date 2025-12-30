const userSchema = require("../models/userSchema")
const { sendEmail } = require("../utils/emailServices")
const { generateOTP } = require("../utils/helpers")
const { isValidEmail, isValidPassword } = require("../utils/regexValidation")

const signUp = async(req,res)=>{
    try {

        const {fullName,email,password,phone,address,role} = req.body

        if(!email) return res.status(400).send({message : 'Email is required.'})
        if(!isValidEmail(email)) return res.status(400).send({message : 'Please enter valid email.'})
        if(!password) return res.status(400).send({message : 'Password is required.'})
        if(!isValidPassword(password)) return res.status(400).send({message : 'Please choose strong password.(Atleast 1 letter & 1 number)'})

        const existUser = await userSchema.findOne({email})
        if(existUser) return res.status(400).send({message : 'Email already exists.'})

        const generateOtp = generateOTP()

        const userData = new userSchema({
            fullName,
            email,
            password,
            phone,
            address,
            role,
            otp : generateOtp,
            otpExpire : Date.now() + 2 * 60 * 1000,
        })
        sendEmail({email : email ,subject : 'Email Verification', otp : generateOtp})
        userData.save()

        

        res.status(201).send({message : 'Registration Success,Please verify your email.'})
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {signUp}