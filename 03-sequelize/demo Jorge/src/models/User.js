const {  DataTypes } = require ("sequelize")

module.exports = (database) => {
    database.define("User", // ** nombre de modelo en Mayuscula
// ? Instancia de sequelice 
// ? permite definir los modelos con los que voy a trabajar
// ? Primer argumento nombre de modelo
// ? Segundo argumento: atributos

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, // ? serial
        name : {
            type: DataTypes.STRING,
            allowNull: false, // ? = constrate NOT NULL
        },
        email: {
            type: DataTypes.STRING,
            unique: true,// ? = constrate UNIQUE
        },
        phone: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM("male", "female") // ? permite dar opciones
        }
    }
)
}