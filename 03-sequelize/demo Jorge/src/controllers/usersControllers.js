const { User, Pages} = require("../db");
const { Op } = require("sequelize");

// const {User} = require("../models/User");

//Convertir estas funciones que antes usaban el array a que ahora usen el modelo


const createUser = async (name, email, phone, gender) => {

    const newUser = await User.create({ name, email, phone, gender }); 
    //                    ? devuelve una promesa
 
    return newUser;
  };

    // if(!name || !email) throw Error("Missing data")

    // const newUser = {
    //     id: userId++,
    //     name,
    //     email,
    // }
    // users.push(newUser);
    // return newUser;



const getUsers = async () => {
    // return users;
    const users = await User.findAll({
        include: {
            model: Pages,
            attributes: ["title"], // ? le digo que quiero que me traiga (id no)
            through: { // ? para "deshacerme" de la tabla intermedia
                attributes: []
            }
        }
    }) // ? devuelve todos los registros del modelo
    return users
}


const getUserById = async (id) => {
    const user = await User.findByPk(id)
    // const user = users.find(u => u.id === Number(id))
    // if(!user) throw Error(`User ${id} does not exist`)
    return user;
}

const findUsers = async (name) => {

    // const results = await User.findAll({
    //     where: { name }
    // }) 

    const results = await User.findAll({
        where: {
            name: { 
                [Op.iLike]: `%${name}%`
            }
           
        }
    }) 
    return results;
    // const results = users.filter(u => u.name === name)
    // if(!results.length) throw Error("Users not found");
  
}


// const updateUser = (id, name, email) => {
//     if(!id || !name || !email) throw Error("Missing data")

    // const user = users.find(u => u.id === Number(id))
    // if(!user) throw Error(`User ${id} does not exist`)

//     const user = getUserById(id);

//     user.name = name;
//     user.email = email;

//     return user;
// }

const deleteUser = async (id) => {
    const userToDelete = await User.findByPk(id)
//?                                 devuelve una o ninguna cosa
    await userToDelete.destroy()
    // const user = getUserById(id);
    // users = users.filter(u => u.id !== Number(id))
    return userToDelete;
}

module.exports = {
    createUser,
    getUsers,  
    getUserById,
    findUsers,
  
    // updateUser,
    deleteUser,
}