const { Router } = require('express');
const { Ability, Character } = require('../db');
const router = Router();

router.post('/', async (req,res)=>{
    try {
        const { name, mana_cost, description } = req.body;
        if(!name || !mana_cost) throw new Error("Falta enviar datos obligatorios")

        const createAbility = await Ability.create({ name, mana_cost, description})
        res.status(201).send(createAbility)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/setCharacter', async (req,res)=>{
    try {
        const { idAbility, codeCharacter } = req.body

        const ability = await Ability.findByPk(idAbility)
        const results = await ability.setCharacter(codeCharacter)
        res.status(200).send(results)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router;