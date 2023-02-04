const {  DataTypes } = require ("sequelize")


module.exports = (database) => {
    database.define("Pages", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          }
    }, {timestamps: false})
}