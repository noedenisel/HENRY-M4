const { DataTypes } = require("sequelize")

const TeacherModel = (db) => {
    db.define('Teacher',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        }

    })
}

module.exports = TeacherModel;

