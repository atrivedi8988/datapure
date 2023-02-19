const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

// Config files
require("dotenv").config({ path: "./config.env" });


// All routes 

const User = require("./user.model");

app.post("/create", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).send(user);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) {
    return res.status(404).send("user not found. Wrong credentials");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY,
    process.env.JWT_EXPIARY_TIME
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user,
  });
});


app.get("/profile",isAuthenticate,async(req,res)=>{

})

// All Middlewares

const isAuthenticate = (req,res,next)=>{
    
}


// connecting to the mongodb server

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
});
