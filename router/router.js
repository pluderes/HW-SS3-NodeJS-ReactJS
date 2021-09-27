const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
//
const userRouter = require("../API/student");

//
app.use("/user", userRouter);
// app.use('/product', middleware, userRouter)

module.exports = app;
