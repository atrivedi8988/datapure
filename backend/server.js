const cors = require("cors")
const User = require("./user.model")
const express = require("express")
const app = express()


app.use(express.json())
app.use(cors())
require("dotenv").config()

app.post("/create",async(req,res)=>{
    const user = await User.create(req.body)
    res.status(201).send(user)
})


const mongoose = require("mongoose")
mongoose.set("strictQuery",false)
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listening on ${process.env.PORT}`)
    })
})