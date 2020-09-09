const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

routes.delete('/', async (req, res) =>{

    const {id, senha} = req.body

    if(!parseInt(id)){
        return res.json({Status: "Erro", dados: "id inválido"})
    }

    try {
        const reserva = await Reserva.findOne({
            where: {
                id,
                senha
            }
        })

        if(!reserva)
            return res.json({Status: "Erro", dados: "Falha ao excluir reserva"})

        await reserva.destroy()

        await reserva.save()

        return res.json({Status: "sucesso"})

    } catch (error) {
        return res.json({Status: "Erro", dados: "Falha ao excluir reserva"})
    }
})

module.exports = routes