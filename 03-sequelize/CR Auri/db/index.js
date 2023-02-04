const { Sequelize, Op } = require('sequelize');
const dotenv = require('dotenv');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

dotenv.config();

// const DB_USER = process.env.DB_USER

const {DB_USER, DB_PASSWORD,DB_HOST,DB_NAME} = process.env

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

const { Character, Ability, Role } = db.models;

//Asociaciones o relaciones

//Relación o asociación uno a muchos
Character.hasMany(Ability)
Ability.belongsTo(Character)

//Relación o asociación de muchos a muchos: (esta se usará en el PI)
Character.belongsToMany(Role, {through: 'CharacterRole'})
Role.belongsToMany(Character,{through: 'CharacterRole'})

module.exports = {
  ...db.models,
  db,
  Op
}