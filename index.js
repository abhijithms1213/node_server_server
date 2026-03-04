const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
require("dotenv").config();

const USER = process.env.DBUSER;
const PASS = process.env.DBPASS;
const db_connect = `mongodb+srv://${USER}:${PASS}@node-app.xzterak.mongodb.net/express-Collection?appName=node-app`;
const port = process.env.PORT || 3002;

// =============================

// middleware
app.use(express.json());

// routes
app.listen(port, () => {
  console.log("listening on port: http://localhost:3002/");
});

mongoose.connect(db_connect).then(() => console.log("Connected!"));

app.get("/", (req, res) => {
  res.json({
    res: "success....",
  });
});

app.post("/productstest", (req, res) => {
  console.log(req.body);
  res.json(req.body);
  //   res.send("done");
});
app.use("/products", productRoute);
