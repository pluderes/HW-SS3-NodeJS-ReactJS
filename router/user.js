const express = require("express");
const { getData, findStudent, addStudent } = require("../model/student");

let userRouter = express.Router();

const controller = (req, res) => {
  console.log(req.params);
  res.send("get method" + req.params.user);
};

userRouter.get("/all", async (req, res) => {
  try {
    const { key = "", value = "" } = req.query || {};

    if (!key && !value) {
      const result = await getData();
      res.json(result);
      return 1;
    } else {
      const result = await findStudent({ key, value });
      res.json(result);
      return 1;
    }
  } catch (error) {
    console.log("error get data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

userRouter.post("/add", async (req, res) => {
  try {
    const newStudent = req.body;
    await addStudent(newStudent);
    res.json({
      msg: "Thêm thành công!",
    });
  } catch (error) {
    console.log("error add data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

userRouter.patch("/", (req, res) => {
  res.send("patch method");
});

userRouter.put("/", (req, res) => {
  res.send("put method");
});

userRouter.delete("/", (req, res) => {
  res.send("delete method");
});

module.exports = userRouter;
