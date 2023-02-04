const { DataTypes } = require("sequelize")

const hash = (string)=>{
    return string.split('').reverse().join('')
}

const StudentModel = (db) => {
    db.define('Student',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fullname:{
            type:DataTypes.VIRTUAL,
            get(){
                return `${this.name} ${this.lastname}`
            }
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            get(){
                const changeWord = this.getDataValue('username')
                return changeWord ? changeWord.toUpperCase() : null
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            set(value){
               return this.setDataValue('password', hash(value))
            }
        },
        birth:{
            type:DataTypes.DATEONLY
        }
    })
}

module.exports = StudentModel;