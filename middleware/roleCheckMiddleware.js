const roleCheckMiddleware = (...roles)=>{
    return (req,res,next)=>{
        try {
            if(roles.includes(req.user.role)){
                return next()
            }
            return res.status(400).send({message : 'Invalid Request'})
        } 
        catch (error) {
           console.log(error)    
        }
    }
}


module.exports = roleCheckMiddleware