const express = require("express");
const morgan = require("morgan");
const { Op } = require("sequelize");
const { Student, Teacher, Subject } = require("./db");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

//GET

server.get("/students", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      const students = await Student.findAll();
      // console.log(students.map(s => s.toJSON()));
      return res.status(200).send(students);
    } 
      console.log(username.toLowerCase());
      const student = await Student.findOne({
        where: { username },
      });
      console.log(student);
      if (!student) throw new Error("this student does not exist");
      return res.status(200).send(student);
    
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

server.get("/students", async (req, res) => {
  try {
    const { name, lastName } = req.query;
    const students = await Student.findAll({
      attributes: [name, lastName],
    });
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findByPk(id);
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.get("/teacher", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const teach = await Teacher.findAll();
      res.status(200).send(teach);
    }
    const teach = await Teacher.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    res.status(200).send(teach);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Ruta POST

server.post("/students", async (req, res) => {
  //crear un usuario en la DB
  //   res.send('todo ok con el post')
  try {
    const { name, lastname, username, birth, password } = req.body;
    const newStudent = await Student.create({
      name,
      lastname,
      username,
      password,
      birth,
    });
    res.status(201).send(newStudent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.post("/teachers", async (req, res) => {
  //crear un usuario en la DB
  //   res.send('todo ok con el post')
  try {
    const { name, lastname, email } = req.body;
    const newTeacher = await Teacher.create({
      name,
      lastname,
      email,
    });
    res.status(201).send(newTeacher);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.post("/subjects", async (req, res) => {
  //crear un usuario en la DB
  //   res.send('todo ok con el post')
  try {
    const { name, description, students } = req.body;
    const newSubject = await Subject.create({
      name,
      description,
    });
    await newSubject.addStudents(students);
    res.status(201).send(newSubject);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Ruta DELETE

server.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const student = await Student.findByPk(id);
    // console.log(student);
    // console.log(student.toJSON());
    await student.destroy();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = server;
