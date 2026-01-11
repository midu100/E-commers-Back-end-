const { verifyToken } = require("../utils/helpers")

const authMiddleware = async(req,res,next)=>{
    try {
        const token =req.cookies

        if(!token['X_AS-TOKEN']) return res.status(400).send({message : 'Token missing'})
        
        const decoded = verifyToken(token['X_AS-TOKEN'])
        console.log(decoded)
        if(!decoded) return res.status(400).send({message : 'Invalid request.'})
        req.user = decoded
        next()
    } 
    
    catch (error) {
        console.log(error)
    }
}

module.exports = {authMiddleware}