const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const Quarto = require('../database/models/Quarto')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {num_quarto} = req.body

    if(!parseInt(num_quarto)){
        return res.json({status: "Erro", dados: "numero de quarto inválido"})
    }
    
    try {
        const quarto = await Quarto.findOne({
            where:{
                num_quarto
            }
        })

        await quarto.update({
            livre: false,
        })

        return res.json({status: "Sucesso", dados: quarto})

    } catch (error) {
        console.log(error)
        return res.json({status: "erro", dados: "erro ao efetuar check-in"})
    }
})

module.exports = routes