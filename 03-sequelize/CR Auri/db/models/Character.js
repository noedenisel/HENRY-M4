const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code:{
      type: DataTypes.STRING(5),
      primaryKey:true,
      allowNull:false,
      validate:{
        validatorCode(value){
          if(value.toLowerCase() === "henry"){
            throw new Error('El código no puede ser henry')
          }
        }
      }
    },
    name:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        notIn:[["Henry","SoyHenry","Soy Henry"]]
      }
    },
    age:{
      type:DataTypes.INTEGER,
      get(){
        const changeAge = this.getDataValue('age')
        return changeAge ? `${changeAge} years old` : changeAge
      }
    },
    race:{
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue:'Other'
    },
    hp:{
      type:DataTypes.FLOAT,
      allowNull:false,
    },
    mana:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    date_added:{
      type:DataTypes.DATEONLY,
      defaultValue:DataTypes.NOW
    }
  },{
    timestamps:false
  })
}