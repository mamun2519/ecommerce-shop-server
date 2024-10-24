const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["Get", "Post"],
  })
);
// ------
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// middelwar
app.use(cookieParser());
app.use(express.json());

app.use(fileUpload());
app.use(express.static("public"));
// all rout

// router hendeler
const product = require("./router/productRouter.js");
const user = require("./router/userRouter");
const order = require("./router/orderRoute");
const errorHandeler = require("./utilits/errorHandeling");
app.use("/product", product);
app.use("/user", user);
app.use("/order", order);

app.use("/", (req, res) => {
  res.send("hellw world");
});

app.use(errorHandeler);

module.exports = app;
