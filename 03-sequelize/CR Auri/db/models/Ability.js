const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:"name_mana_cost"
    },
    description:{
      type:DataTypes.TEXT
    },
    mana_cost:{
      type:DataTypes.FLOAT,
      allowNull:false,
      unique:"name_mana_cost",
      validate:{
        manaValueValidator(value){
          if(value > 250.0 || value < 10.0) throw new Error('El mana no está en el rango')
        }
      }
    },
    summary:{
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${Math.floor(this.mana_cost)} points of mana) - Description: ${this.description}`
      }
    }

  })
}