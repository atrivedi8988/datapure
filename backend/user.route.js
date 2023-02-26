const express = require("express");
const { isAuthenticate, isAuthorize } = require("./Middlewares/auth");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { thrownErrorMessage } = require("./responseMessage");
const { sendEmail } = require("./Middlewares/sendEmail");

const router = express.Router();

// create new account

router.post("/create", async (req, res) => {
  let user = await User.find({ email: req.body.email });
  if (user) {
    return thrownErrorMessage(
      res,
      400,
      "User is already exist with this email id"
    );
  } else {
    user = await User.create(req.body);
    user.save();
    res.status(201).json({
      success: true,
      user,
    });
  }
});

// login account

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) {
    return thrownErrorMessage(res, 404, "user not found. Wrong credentials");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIARY_TIME }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user,
  });
});

// get profile

router.get("/profile", isAuthenticate, async (req, res) => {
  // console.log(req.user)
  res.status(200).send(req.user);
});

// Get All users

router.get("/allusers", isAuthenticate, isAuthorize, async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

// change user to admin and make a admin

router.patch(
  "/assignadmin/:id",
  isAuthenticate,
  isAuthorize,
  async (req, res) => {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
      return thrownErrorMessage(res, 404, "User not found");
    }
    user = await User.findByIdAndUpdate(
      id,
      { role: req.body.role },
      {
        new: true,
        runValidators: true,
      }
    );
    user.save({ validateBeforeSave: true });
    res.status(200).json({
      success: true,
      user,
    });
  }
);

// forgot password
router.post("/forgot", isAuthenticate, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const new_secret = user._id + email
    const token = jwt.sign({id:user._id},new_secret,{expiresIn:"15minute"})
    // const transporter = sendEmail;
    const link = `http://localhost:8080/reset/${user._id}/${token}`;
    console.log(token)
    console.log(link)
    // console.log(await transporter())
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });
      const info = await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<a href=${link}>click here</a>, for reset your password`,
      });
      res.status(200).send(info)
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    return thrownErrorMessage(res, 404, "user is not found from this email");
  }

});

module.exports = router;
