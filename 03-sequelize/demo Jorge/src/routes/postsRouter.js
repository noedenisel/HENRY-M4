const { Router } = require("express");
const models = require("../controllers/postsControllers")

const postsRouter = Router();

postsRouter.get("/", (req, res) =>{
    const posts = models.getPosts();
    res.status(200).json(posts)
    //traer todos los posts
})

postsRouter.get("/:id", (req, res) =>{
    const { id } = req.params;
    
    try {
        const post = models.getPostById(id);
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    //traer post que coincida con el ID (si existe)
})

postsRouter.post("/", (req, res) =>{
    const { title, contents, userId } = req.body;

    try {
        const result = models.createPost(title, contents, userId);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // chequear que manden title, contents y userId, sino error..
    // Chequear que el userId exista en el array de usuarios.. sino error
    // cree un post nuevo
    // recibe por body: title, contents, userId
})

postsRouter.put("/", (req, res) => {
    const { id, title, contents } = req.body;

    try {
        const result = models.updatePost(id, title, contents);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // recibe por body: id, title, content y modifica.
    // verifica que el ID exista.
})

postsRouter.delete("/:id/delete", (req, res) => {
    const { id } = req.params;

    try {
        const result = models.deletePost(id);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // elimina un posts, 
    // verificar que el ID exista
})



module.exports = postsRouter;


