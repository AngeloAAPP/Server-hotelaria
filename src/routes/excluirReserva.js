const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

routes.delete('/', async (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {id, senha} = req.body

    if(!parseInt(id)){
        return res.json({status: "Erro", dados: "id inválido"})
    }

    try {
        const reserva = await Reserva.findOne({
            where: {
                id,
                senha
            }
        })

        if(!reserva)
            return res.json({status: "Erro", dados: "Falha ao excluir reserva"})

        await reserva.destroy()

        await reserva.save()

        return res.json({status: "Sucesso"})

    } catch (error) {
        return res.json({status: "Erro", dados: "Falha ao excluir reserva"})
    }
})

module.exports = routes