const { Sequelize } = require('sequelize')
const StudentModel = require('./models/Student')
const SubjectModel = require('./models/Subject')
const TeacherModel = require('./models/Teacher')

const user = 'postgres'
const password = 'henry2023'
const dbname = 'mi_db'
	
const db = new Sequelize(`postgres://${user}:${password}@localhost:5432/${dbname}`,{logging: false} )

StudentModel(db)
SubjectModel(db)
TeacherModel(db)

console.log(db.models);

const {  Student, Subject, Teacher } = db.models;

//Muchos a muchos
Student.belongsToMany(Subject,{through:'StudentSubject'})
Subject.belongsToMany(Student, {through:'StudentSubject'})


module.exports = {db, ...db.models};


