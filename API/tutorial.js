const fs = require("fs");
const path = require("path");

// stringtify: lấy một đối tượng JavaScript và chuyển đổi nó thành một chuỗi JSON
// parse: nhận vào một chuỗi JSON và chuyển đổi (transform) nó thành một đối tượng JavaScript để thao tác

// ------------------------------------------------------
const student = [{ id: 1, name: "trung", age: 23 }];

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
// writeFile(student);

// Create
const createFile = (student) => {
  try {
    if (fs.existsSync(path.resolve(__dirname, "student.json"))) {
      console.log("File đã tồn tại!");
    } else {
      writeFile(student);
      console.log("Ghi file thành công!");
    }
  } catch (err) {
    console.error(err);
  }
};
// createFile(student);

// ------------------------------------------------------
// Read
const readFile = async () => {
  const read = await fs.promises.readFile(
    path.resolve(__dirname, "student.json"),
    "utf8"
  );
  return JSON.parse(read);
};

const getStudents = async () => {
  let data = await readFile();
  console.log(data);
};

// ----------------------------------------------------------
// Find by keyword and value
const findStudent = (key, value) => {
  const find = async () => {
    let students = await readFile();
    for (let i = 0; i < students.length; i++) {
      let listKey = Object.keys(students[i]);
      listKey = listKey.map((e) => e.toLowerCase());

      if (!isNaN(value)) {
        if (
          listKey.indexOf(key.toLowerCase()) > -1 &&
          students[i][key.toLowerCase()] == value
        ) {
          console.log(students[i]);
        } else {
          console.log("Không tìm đượcccc!");
        }
      } else {
        if (
          listKey.indexOf(key.toLowerCase()) > -1 &&
          students[i][key].toLowerCase() == value.toLowerCase()
        ) {
          console.log(students[i]);
        } else {
          console.log("Không tìm được!");
        }
      }
    }
  };
  find();
};
// findStudent("iD", "1");

// ---------------------------------------------------------
// Update:
// add new student
const newStudent = { id: 3, name: "duc", age: 23 };

const checkExistID = async (id) => {
  let students = await readFile();
  let listID = students.flatMap((e) => e.id);
  return listID.indexOf(id);
};

const addNewstudent = async (newStudent) => {
  const checkID = await checkExistID(newStudent.id);
  if (checkID > -1) {
    console.log("ID đã tồn tại!");
  } else {
    let students = await readFile();
    students.push(newStudent);
    writeFile(students);
    console.log("Thêm mới thành công!");
  }
};
// addNewstudent(newStudent);

// Update info student
const updateStudent = async (id, key, newValue) => {
  const checkID = await checkExistID(id);
  let students = await readFile();
  if (checkID > -1) {
    for (let i = 0; i < students.length; i++) {
      if (students[i].id == id) {
        let listKey = Object.keys(students[i]);
        listKey = listKey.map((e) => e.toLowerCase());
        if (listKey.indexOf(key.toLowerCase()) > -1) {
          students[i][key.toLowerCase()] = newValue;
        } else {
          console.log("Không có thuộc tính " + key);
          return 0;
        }
      }
    }
    writeFile(students);
    console.log("Update thành công!");
    // console.log(students);
  } else {
    console.log("ID không tồn tại!");
  }
};
// updateStudent(1, "age", 18);

// --------------------------------------------------
// Delete
const deleteStudent = async (id) => {
  const checkID = await checkExistID(id);
  let students = await readFile();
  if (checkID > -1) {
    students.splice(checkID, 1);
    writeFile(students);
    console.log("Xóa thành công!");
  } else {
    console.log("ID không tồn tại!");
  }
};
// deleteStudent(2);
