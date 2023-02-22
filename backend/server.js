const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

// Config files
require("dotenv").config({ path: "./config.env" });


// All Middlewares


// All routes 
const userRoute = require("./user.route")
const productRoute = require("./product.route")
app.use("/",userRoute)
app.use("/",productRoute)




// connecting to the mongodb server

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
});
