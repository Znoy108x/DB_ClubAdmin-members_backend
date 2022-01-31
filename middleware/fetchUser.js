const json_web_token = require("jsonwebtoken")
const JWT_SECRET = "@bh@y2is0@0good2boy";
const fetchUser = (req , res , next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try{
        const data = json_web_token.verify(token ,JWT_SECRET)
        req.admin = data.admin
        next()
    }catch(err){
        res.status(401).send({error:"Please Authenticate Using A Valid Token"})
    }
}
module.exports = fetchUser