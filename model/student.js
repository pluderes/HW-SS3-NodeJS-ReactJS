const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { param } = require("../router/user");

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
  if (params.value && params.key) {
    for (let i = 0; i < students.length; i++) {
      let listKey = Object.keys(students[i]);
      listKey = listKey.map((e) => e.toLowerCase());
      if (
        listKey.indexOf(params.key.toLowerCase()) > -1 &&
        students[i][params.key.toLowerCase()] == params.value
      ) {
        return students[i];
      }
    }
  } else if (params.value) {
    for (let i = 0; i < students.length; i++) {
      let listValue = Object.values(students[i]);
      console.log("listValue", listValue);
      console.log("params.value", params.value);
      if (listValue.includes(params.value)) {
        return students[i];
      }
    }
  }
};

const checkExistID = async (id) => {
  let students = await getData();
  let listID = students.flatMap((e) => e.id);
  return listID.indexOf(id);
};

const addStudent = async (newStudent) => {
  const checkID = await checkExistID(newStudent.id);
  if (checkID > -1) {
    console.log("ID đã tồn tại!");
  } else {
    let students = await getData();
    newStudent.id = uuidv4();
    students.push(newStudent);
    writeFile(students);
    console.log("Thêm mới thành công!");
  }
};

// export
module.exports = {
  getData,
  findStudent,
  addStudent,
};
