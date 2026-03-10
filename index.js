const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const orderRoute = require("./routes/order.route.js");
const shopRoute = require("./routes/shop.route.js");
const otpRoute = require("./routes/signin.otp.route.js");
require("dotenv").config();

const USER = process.env.DBUSER;
const PASS = process.env.DBPASS;
const db_connect = `mongodb+srv://${USER}:${PASS}@node-app.xzterak.mongodb.net/express-Collection?appName=node-app`;
const port = process.env.PORT || 3001;

// =============================

// middleware
app.use(express.json());
app.use(express.static("public"));

// routes
app.listen(port, () => {
  console.log("listening on port: http://localhost:3001/");
});

mongoose.connect(db_connect).then(() => console.log("Connected!"));

app.get("/test", (req, res) => {
  res.json({
    res: "success....\n",
  });
});

app.post("/productstest", (req, res) => {
  console.log(req.body);
  res.json(req.body);
  //   res.send("done");
});
app.use("/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/shops", shopRoute);
app.use("/api/sign-in-otp", otpRoute);
// check latest v3