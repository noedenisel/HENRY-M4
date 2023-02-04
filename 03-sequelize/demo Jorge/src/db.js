const { Sequelize, INTEGER, DataTypes,  } = require ("sequelize")
const UserModel = require ("./models/User")
const PostModel = require ("./models/Post")
const PageModel = require ("./models/Pages")


const DB_USER = "postgres";
const DB_PASSWORD = "Noedenisel33082433"
const DB_HOST = "localhost:5432"


const database = new Sequelize (
    // `postgres://postgres:Noedenisel33082433@localhost:5432/democlase`
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/democlase`,
    {logging : false } // ? para que no salga tooooooodo ese choclo en la consola 
    );
// ? conexion con la db 

//"postgres://user:pass@example.com:5432/dbname"
//  ?        nombreusuario postgres por defecto:password@host de la db/nombre de la db

// TODO modularizar el modelo en models / User.js

// database.define("User",
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         }, 
//         name : {
//             type: DataTypes.STRING,
//             allowNull: false, 
//         },
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//         phone: {
//             type: DataTypes.STRING
//         },
//         gender: {
//             type: DataTypes.ENUM("Male", "Female") 
//         }
//     }
// )


UserModel(database) // ? fn que recibe la instancia de sql que recibe el modelo
PostModel(database)
PageModel(database)


const { User, Post, Pages } = database.models
//? relacion entre los dos modelos
// ?                   models esta adentro de database
// ? Ahora tengo a User y a Post

User.hasMany(Post) // ? tiene a varios
Post.belongsTo(User) // ? pertenece a 


User.belongsToMany(Pages, {through: "UserPage"});
Pages.belongsToMany(User, {through: "UserPage"})
// ?                      nombre de la tabla intermedia, le pongo el nombre que quiero



module.exports = { database, ...database.models  } //** Database en esta instancia ya tiene definidos los modelos dentro 
// ? exporto database x un lado y por el otro (todos)los modelos               