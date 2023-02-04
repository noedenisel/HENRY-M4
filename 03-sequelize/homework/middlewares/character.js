const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post("/", async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body;
  
    if (!code || !name || !hp || !mana)
      res.status(404).send("Falta enviar datos obligatorios");
    else {
      try {
        let newCharacter = await Character.create({code,name,age,race,hp,mana,date_added,
        });
        res.status(201).json(newCharacter);
      } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
      }
    }
  });

  router.get("/", async (req,res) => {
    
  })

module.exports = router;