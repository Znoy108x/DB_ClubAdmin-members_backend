const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const {body , validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const json_web_token = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET = "@bh@y2is0@0good2boy"
 
router.post('/createadmin',[
    body('name',"Enter a valid name").isLength({min:5}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a password of min length 5").isLength({min:5}),
],async (req,res)=>{
    let success = false;
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({success , error:error})
    }
    let admin = await Admin.findOne({email : req.body.email})
    if(admin){
        return res.status(400).json({success , message:"Admin Already Have An Account..."})
    }
    try{
        let admin;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        
        admin = await Admin.create({
            name : req.body.name,
            email :req.body.email,
            password :hashedPassword,
        })
        const data = {
            admin:admin
        }
        const authToken = json_web_token.sign(data , JWT_SECRET)
        success = true;
        res.status(200).json({success , authToken})
    }catch(err){
        res.status(501).json({success , err})
    }
})

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password Cannot Be Blank').exists()
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status({errors , success})
    }
    const {email , password} = req.body;
    try{
        let admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({success ,error:'Please Create A User First' })
        }
        const passwordCompare = await bcrypt.compare(password ,admin.password)
        if(!passwordCompare){
            res.status(400).json({success ,error:"Please Try To login With correct credentials"})
        }
        const payload = {
            admin:admin
        }
        const authToken = json_web_token.sign(payload , JWT_SECRET)
        success = true;
        res.status(200).json({success , authToken})
    }catch(err){
        res.status(501).json("Internal Error")
    }
})

router.post('/getadmin',fetchUser ,async  (req,res)=>{
    try{
        const adminId = req.admin._id
        const admin = await Admin.findById(adminId).select("-password")
        res.status(200).json(admin)
    }catch(err){
        res.status(501).json(err)
    }
})
module.exports = router;