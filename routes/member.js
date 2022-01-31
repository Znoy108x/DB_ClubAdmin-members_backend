const express = require("express")
const router = express.Router()
const Member = require("../models/Member")
const {body ,validationResult} = require("express-validator")
const fetchUser = require("../middleware/fetchUser")
router.post("/addmember",[
    body("name","Enter a big name").isLength({min:5}),
    body("email","Enter a valid email").isEmail(),
    body("rollnumber" , "Enter a valid Roll Number").isLength({min : 11}),
],fetchUser,async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors})
    }
    try{
        const {name , email , age , branch , year , rollnumber , address , profilepic}  = req.body;
        const member = await new Member({
            admin:req.admin._id , name , email , age , branch , year , rollnumber , address , profilepic
        }).save();
        res.status(200).json({member})
    }catch(err){
        res.status(501).json("Error while creating the member")
    }
})

router.get('/fetchallmembers',fetchUser ,async (req,res)=>{
    try{
        const members = await Member.find({admin : req.admin._id})
        res.status(200).json(members)
    }catch(err){
        res.status(501).json(err)
    }
})

router.put('/updMem/:id',fetchUser,async (req , res)=>{
    const {name , email , age , branch , year , rollnumber , address , profilepic}  = req.body;
    try{
        const newMem = {}
        if(name){
            newMem.name= name;
        }
        if(email){
            newMem.email= email;
        }
        if(age){
            newMem.age= age;
        }
        if(branch){
            newMem.branch= branch;
        }
        if(rollnumber){
            newMem.rollnumber= rollnumber;
        }
        if(address){
            newMem.address= address;
        }
        if(name){
            newMem.name= name;
        }
        if(profilepic){
            newMem.profilepic= profilepic;
        }
        let member = await Member.findById(req.params.id)
        if(!member){
            res.status(400).json("Member Not Found")
        }
        if(member.admin.toString() !== req.admin._id){
            res.status(400).json("You Cannot Update The Member")
        }
        member = await Member.findByIdAndUpdate(req.params.id , {$set :newMem})
        res.status(200).json(member)
    }catch(err){
        res.status(501).json(err)
    }
})




router.delete("/delmember/:id" , fetchUser , async (req,res)=>{
    try{
        let member = await Member.findById(req.params.id)
        if(!member){
            res.status(400).json("Member Not Found")
        }
        if(member.admin.toString() !== req.admin._id){
            res.status(400).json("Not Allowed")
        }
        member = await Member.findByIdAndDelete(req.params.id)
        res.status(200).json({success:"Member id removed from UCC"})
    }catch(err){
        res.status(501).json(err)
    }
})
module.exports = router;