const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const generateOTP = ()=> {
  return Math.floor(1000 + Math.random() * 9000);
}

const generateAccToken = (user)=>{
  return jwt.sign(
    { 
      _id : user._id,
      email:user.email,
      role : user.role
    }, 
    process.env.JWT_SEC, 
    { expiresIn: '1h' });
}

const generateRefreshToken = (user)=>{
  return jwt.sign(
    { 
      _id : user._id,
      email:user.email,
      role : user.role
    }, 
    process.env.JWT_SEC, 
    { expiresIn: '15d' });
}

const verifyToken = (token)=>{
  try {
  const decoded = jwt.verify(token, process.env.JWT_SEC);
  return decoded
} catch(err) {
  return null
}
}

const generateResetToken = (user)=>{
  const resetToken = crypto.randomBytes(16).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  return {resetToken,hashedToken}
}

const hashResetToken = (token)=>{
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    return hashedToken
}


module.exports = {generateOTP,generateAccToken,generateRefreshToken,verifyToken,generateResetToken,hashResetToken}