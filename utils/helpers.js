const jwt = require('jsonwebtoken');

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
  return jwt.sign(
    { 
      _id : user._id,
      email:user.email,
    }, 
    process.env.JWT_SEC, 
    { expiresIn: '2h' });
}


module.exports = {generateOTP,generateAccToken,generateRefreshToken,verifyToken,generateResetToken}