const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { param } = require("../router/router");

// Create
const createFile = (student) => {
  try {
    if (fs.existsSync(path.resolve(__dirname, "student.json"))) {
      return false;
    } else {
      writeFile(student);
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

// Write
const writeFile = async (student) => {
  await fs.writeFile(
    path.resolve(__dirname, "student.json"),
    JSON.stringify(student),
    function (err) {
      if (err) {
        throw err;
      }
    }
  );
};

// Get data
const getData = async () => {
  const students = await fs.promises.readFile(
    path.resolve(__dirname, "student.json"),
    "utf8"
  );
  return JSON.parse(students);
};

const findStudent = async (params) => {
  let students = await getData();
  let result = [];

  if (params.value && params.key) {
    for (let i = 0; i < students.length; i++) {
      let listKey = Object.keys(students[i]);
      listKey = listKey.map((e) => e.toLowerCase());
      if (
        listKey.indexOf(params.key.toLowerCase()) > -1 &&
        students[i][params.key.toLowerCase()] == params.value
      ) {
        result.push(students[i]);
      }
    }
  } else if (params.value) {
    for (let i = 0; i < students.length; i++) {
      let listValue = Object.values(students[i]);
      console.log("listValue", listValue);
      console.log("params.value", params.value);
      if (listValue.includes(params.value)) {
        result.push(students[i]);
      }
    }
  }
  return result;
};

// find student younger or same age
const findAge = async (age) => {
  let students = await getData();
  let result = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].age <= Number(age)) {
      result.push(students[i]);
    }
  }
  return result;
};

// checkExitID
const checkExistID = async (id) => {
  let students = await getData();
  let listID = students.flatMap((e) => e.id);
  return listID.indexOf(id);
};

// Add new student
const addStudent = async (newStudent) => {
  const checkID = await checkExistID(newStudent.id);
  if (checkID > -1) {
    return false;
  } else {
    let students = await getData();
    newStudent.id = uuidv4();
    students.push(newStudent);
    writeFile(students);
    return true;
  }
};

// Update info student
const updateInfo = async (params) => {
  let students = await getData();
  let ID = Number(params.ID);
  let dataUpdate = params.updateData;
  // console.log("dataUpdate", dataUpdate);
  const checkID = await checkExistID(ID);
  if (checkID > -1) {
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === ID) {
        students[i] = { ...students[i], ...dataUpdate };
      }
    }
    await writeFile(students);
    return true;
  } else {
    return false;
  }
};

// delete
const deleteStudent = async (ID) => {
  const checkID = await checkExistID(Number(ID));
  let students = await getData();
  if (checkID > -1) {
    students.splice(checkID, 1);
    writeFile(students);
    return true;
  } else {
    return false;
  }
};

// export
module.exports = {
  createFile,
  getData,
  findStudent,
  findAge,
  addStudent,
  updateInfo,
  deleteStudent,
};
