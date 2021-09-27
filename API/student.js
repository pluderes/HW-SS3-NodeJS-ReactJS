const express = require("express");
let userRouter = express.Router();
const {
  createFile,
  getData,
  findStudent,
  findAge,
  addStudent,
  updateInfo,
  deleteStudent,
} = require("../controller/CRUD");

// get and find student
userRouter.get("/get", async (req, res) => {
  try {
    const { key = "", value = "" } = req.query || {};
    if (!key && !value) {
      const result = await getData();
      res.json(result);
    } else {
      const result = await findStudent({ key, value });
      res.json(result);
    }
  } catch (error) {
    console.log("error get data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

// find student younger or same age
userRouter.get("/findAge/:age", async (req, res) => {
  try {
    const result = await findAge(req.params.age);
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.log("error get data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

// add new student
userRouter.post("/add", async (req, res) => {
  try {
    const newStudent = req.body;
    const result = await addStudent(newStudent);
    if (result) {
      res.json({
        msg: "Added succesfully!",
      });
    }
  } catch (error) {
    console.log("error add data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

userRouter.patch("/update/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const ID = req.params.id;
    const result = await updateInfo({ ID, updateData });
    if (result == true) {
      res.json({
        msg: "Updated successfully!",
      });
    } else {
      console.log("error add data: ID not found");
      res.status(500).json({
        msg: "error add data: ID not found",
      });
    }
  } catch (error) {
    console.log("error update data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

userRouter.put("/", (req, res) => {
  res.send("put method");
});

userRouter.delete("/delete/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const result = await deleteStudent(ID);
    if (result == true) {
      res.json({
        msg: "Successfully deleted!",
      });
    } else {
      console.log("error delete data: ID not found");
      res.status(500).json({
        msg: "error delete data: ID not found",
      });
    }
  } catch (error) {
    console.log("error update data", error);
    res.status(500).json({
      msg: error,
    });
  }
});

module.exports = userRouter;
