const server = require("./src/app");
const {db} = require('./src/db')

server.listen("3001", async () => {
    await db.sync({force:true});
  console.log("listening on port 3001");
});
