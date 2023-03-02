const User = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { thrownErrorMessage } = require("../Middlewares/responseMessage");
const crypto = require("crypto");

// Register New User

exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
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
};

// Login a User

exports.loggedInUser = async (req, res) => {
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
};

// Get Profile Authenticate User

exports.getProfileAuthenticateUser = async (req, res) => {
  // console.log(req.user)
  res.status(200).send(req.user);
};

// Get All User --- Admin authorize

exports.getAllUserByAdmin = async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
};

// Make Admin Any user

exports.makeAdmin = async (req, res) => {
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
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    const token = crypto.randomBytes(20).toString("hex");
    // token = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    user.resetPasswordTokenExpiry = (Date.now() + 15 * 60 * 1000).toString();

    user.save();

    const link = `http://localhost:3000/reset/${user._id}/${user.resetPasswordToken}`;
    // console.log(token)
    // console.log(link)
    // console.log(user)
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
        to: req.body.email,
        subject: "Password Reset",
        html: `<a href=${link}>click here</a>, for reset your password`,
      });
      res.status(200).json({
        success: true,
        message: "Password Reset Email Sent... Please Check Your Email",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err,
      });
    }
  } else {
    return thrownErrorMessage(res, 404, "User not found from this email");
  }
};

// Reset Password

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  if (token && id) {
    console.log(crypto.createHash("sha256").update(token).digest("hex"));
    console.log(id);
    const user = await User.findOne({ resetPasswordToken: token });
    // const user = await User.findById(id)
    // console.log(user)
    if (user) {
      if (user.resetPasswordTokenExpiry > Date.now()) {
        await User.findByIdAndUpdate(user._id, {
          $set: req.body,
        });
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;

        user.save();
        res.status(200).json({
          success: true,
          message: "Password changed successfully",
        });
      } else {
        return thrownErrorMessage(res, 500, "token is Expired");
      }
    } else {
      return thrownErrorMessage(res, 404, "User not found. Invalid Link");
    }
  } else {
    return thrownErrorMessage(res, 400, "Invalid Link");
  }
};
