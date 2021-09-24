const express = require("express");
const path = require("path");
const fs = require("fs");
//
const userRouter = require("./user");
//
const app = express();

const middleware_getStudent = async (req, res, next) => {
  const read = await fs.promises.readFile(
    path.resolve(__dirname, "student.json"),
    "utf8"
  );
  console.log(__dirname);
  req.real_name = read;
  console.log("req");
  next();
};

const newStudent = { id: 3, name: "duc", age: 23 };

const readFile = async () => {
  const read = await fs.promises.readFile(
    path.resolve(__dirname, "student.json"),
    "utf8"
  );
  return JSON.parse(read);
};

const checkExistID = async (id) => {
  let students = await readFile();
  let listID = students.flatMap((e) => e.id);
  return listID.indexOf(id);
};

const middleware_addStudent = async (req, res, next) => {
  const checkID = await checkExistID(newStudent.id);
  if (checkID > -1) {
    console.log("ID đã tồn tại!");
  } else {
    let students = await readFile();
    students.push(newStudent);
    writeFile(students);
    console.log("Thêm mới thành công!");
  }
  req.addStudent = "qq";
  console.log("req");
  next();
};

const middleware_deleteStudent = (req, res, next) => {
  req.deleteStudent = "qq";
  console.log("req");
  next();
};

//
app.use("/user", userRouter);
// app.use('/product', middleware, userRouter)

module.exports = app;
