const express = require("express");
const morgan = require("morgan");
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter")
const { Page } = require("./db");
const Pages = require("./models/Pages");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);
// app.use("/posts", postsRouter);

app.post("/pages", async (req, res)=>{
   const {title} = req.body
try{
    
    const newPage = await Page.create({title})
    await newPage.addUsers(users) // ? sequealize crea el metodo con el nombre automaticamente
    res.status(201).json(newPage)

}  catch(error){
    res.status(400).json({error: error.message})
}
    
})

module.exports = app;