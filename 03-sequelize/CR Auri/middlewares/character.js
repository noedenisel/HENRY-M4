const { Router } = require("express");
const { Op, Character, Role, Ability } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { code, name, age, race, hp, mana } = req.body;
  if (!code || !name || !hp || !mana)
    return res.status(404).send("Falta enviar datos obligatorios");
  try {
    const newCharacter = await Character.create({
      code,
      name,
      age,
      race,
      hp,
      mana,
    });
    res.status(201).json(newCharacter)
  } catch (error) {
    res.status(404).send("Error en alguno de los datos provistos")
  }
});

router.get('/', async(req,res)=>{
    try {
        const { race, age } = req.query

        let characters;
        if(race && age){
          characters = await Character.findAll({
           where:{
            race,
            age
           }
          })
          return res.status(200).json(characters)
        }
        if(race){
            characters = await Character.findAll({
                where:{race}
            })
            return res.status(200).json(characters)
        }
        characters = await Character.findAll();
        return res.status(200).json(characters)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/young', async (req,res)=>{
  try {
    const character = await Character.findAll({
      where:{
        age: {
          [Op.lt]:25
        }
      }
    })
    res.status(200).send(character)
  } catch (error) {
    return res.status(404).send(error.message)
  }
})

router.get('/:code', async(req,res)=>{
    try {
        const { code } = req.params;
        const character = await Character.findByPk(code)
        if(!character) throw Error(`El código ${code} no corresponde a un personaje existente`);
        return res.status(200).json(character)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/addAbilities',async (req,res)=>{
    try {
      const { codeCharacter, abilities } = req.body;
      const character = await Character.findByPk(codeCharacter)
      const ability = await Ability.bulkCreate(abilities)
      await character.addAbility(ability)
      res.status(200).send('ok')
    } catch (error) {
      return res.status(404).send(error.message)
    }
})

router.put('/:attribute', async (req,res)=>{
  try {
    const { attribute } = req.params;
    const { value } = req.query;
    await Character.update({
      [attribute]:value
    },{
      where:{
        [attribute]:null
      }
    })
    res.status(200).send('Personajes actualizados')
  } catch (error) {
    return res.status(404).send(error.message)
  }
})

module.exports = router;
