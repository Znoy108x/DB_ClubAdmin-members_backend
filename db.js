const mongoose = require("mongoose")

const db_name = "ucc"
const mongoUri = `mongodb+srv://abhay:abhay@cluster0.i8prg.mongodb.net/${db_name}?retryWrites=true&w=majority
`
const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log(`Connected To The Mongo ${db_name }   Successfully ^.^`)
    })
}
module.exports = connectToMongo