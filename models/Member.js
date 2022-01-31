const mongoose = require("mongoose")
const {Schema} = mongoose;
const MemberSchema = new Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'admin'
    },
    name:{
        type : String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true
    },
    rollnumber:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Member =  mongoose.model("member", MemberSchema)
module.exports =Member