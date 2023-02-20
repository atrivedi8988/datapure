const User = require("../user.model")
const jwt = require("jsonwebtoken")

exports.isAuthenticate = async(req,res,next)=>{
    let token = req.headers.authorization
    if(!token){
        return res.status(400).send("you are not logged in")
    }
    token = token.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,decode)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            // console.log(decode)
            const user = await User.findById(decode.id)
            if(!user){
                return res.status(400).send("user not exist")
            }
            // console.log(user)
            req.user = user
            next()
        }
    })

}

exports.isAuthorize = async(req,res,next)=>{
    if(req.user.role==="user"){
        res.status(400).json({
            success : false,
            message : "Only accessed by a admin and you are not admin"
        })
    }
    if(req.user.role==="admin"){
        next()
    }
}
