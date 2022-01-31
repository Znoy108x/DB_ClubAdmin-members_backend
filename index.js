//------------------- express-------------------
const express = require("express")
const app = express()
app.use(express.json())
//------------------- express --------------------------


//------------------- cors -- --------------------------
const cors = require("cors")
app.use(cors())
//------------------- cors -- --------------------------



//------------------- data base ------------------------
const connectToMongo = require("./db")
connectToMongo();
//------------------- data base ------------------------




//------------------- route --------------------------
app.get("/",(req,res)=>{
    res.send("hello abhay")
})
app.use("/api/auth",require("./routes/auth"))
app.use("/api/member",require("./routes/member"))
//------------------- route --------------------------



const port = 5000
app.listen(port , ()=>{
    console.log(`Running on http://localhost:${port}`)
})