const express = require("express");
const { isAuthenticate, isAuthorize } = require("./Middlewares/auth");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router()

// create new account

router.post("/create", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).send(user);
});

// login account

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) {
    return res.status(404).send("user not found. Wrong credentials");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY,
    {expiresIn: process.env.JWT_EXPIARY_TIME}
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user,
  });
});


// get profile

router.get("/profile",isAuthenticate,async(req,res)=>{
    // console.log(req.user)
    res.status(200).send(req.user)
})

// Get All users

router.get("/allusers",isAuthenticate, isAuthorize, async(req,res)=>{
    const user = await User.find();
    res.status(200).json({
        success:true,
        user
    })
})

// change user to admin and make a admin

router.patch("/assignadmin/:id",isAuthenticate,isAuthorize,async(req,res)=>{
    const {id} = req.params
    let user = await User.findById(id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    user = await User.findByIdAndUpdate(id,{role:req.body.role},{
        new:true,
        runValidators:true,
    });
    user.save({validateBeforeSave:true})
    res.status(200).json({
        success:true,
        user
    })
})

module.exports = router

