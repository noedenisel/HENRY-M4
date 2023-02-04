const { Router } = require("express");
const models = require("../controllers/usersControllers");

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const { name } = req.query;

  let users;

  try {
    if (name) users = await models.findUsers(name);
    else users = await models.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

usersRouter.get("/:id",async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { name, email, phone, gender } = req.body;
    const newUser = await models.createUser(name, email, phone, gender);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


usersRouter.put("/", (req, res) => {
  const { id, name, email } = req.body;
  try {
    const updateUser = models.updateUser(id, name, email);
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

usersRouter.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await  models.deleteUser(id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
