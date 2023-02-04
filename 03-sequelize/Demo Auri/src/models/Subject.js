const { DataTypes } = require("sequelize");

const SubjectModel = (db) => {
  db.define("Subject", {
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },{
    timestamps:false
  });
};

module.exports = SubjectModel;