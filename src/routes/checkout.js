const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

routes.post("/", async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {id} = req.query;

    if(!id)
        return res.json({
            status: "Erro",
            dados: "ID não foi informado"
        })

    const reserva = await Reserva.findOne({
        where: {
            id: id
        },
        attributes: ['id'],
        include: {
            association: 'quarto',
            attributes: ['id', 'livre']
        }
    })

    if(!reserva){
        return res.json({
            status: "Erro",
            dados: "Reserva não encontrada com o ID: " + id
        })
    }

    await reserva.quarto.update({ livre: true})
    

    return res.json({status: "Sucesso", dados: 'checkout efetuado com sucesso'})    
})

module.exports = routes