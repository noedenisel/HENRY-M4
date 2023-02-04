const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', 
  {
    name: {
      type: DataTypes.STRING,
      unique: "nameMana",
      allowNull: false
    },
    description : {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      unique: "nameMana",
      allowNull: false
    }
  }
  )
}