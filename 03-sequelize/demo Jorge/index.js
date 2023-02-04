// ? levantar el servidor y ponerlo a escuchar en un puerto

const app = require("./src/app");
const { database } = require("./src/db") // ? me traigo al index la conexion que declare
const PORT = 3001


// database.sync()
// ? metodo de la db para conectarse/Sincronizar
// console.log(database.sync()); // ? promesa pending

database
    .sync({ force: true})   // **  el forceTrue elimina todas las tablas de la db y las vuelve a crear en base a los modelos. Hay que ponerlo siemore
                            // ** alternativa: alter:true actualiza las db en base a los modelos
    // .sync({alter:true})                        
    .then(() => { // ? conecto correctamente a la db
    app.listen(PORT, () => { // ? succesHandler pone a escuchar al servidor en el puerto 3001
    console.log("listening on port", 3001);
});
})
    .catch((err) => console.log(err.message))








