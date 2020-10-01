const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const connection = require('../database')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {id_reserva} = req.body

    if(!parseInt(id_reserva)){
        return res.json({status: "Erro", dados: "ID da reserva inválido"})
    }
    
    try {
        const resultadoTransaction = await connection.transaction(async t => {

            const reserva = await Reserva.findOne({
                where: {
                    id: id_reserva
                },
                attributes: [
                    'id',
                    'check_in_realizado'
                ],
                include: {
                    association: 'quarto',
                    attributes: [
                        'id',
                        'livre'
                    ]
                }
            })

            if (reserva.dataValues.check_in_realizado)
                return res.json({status: "Erro", dados: "O check-in já foi realizado"})

            if (!reserva.quarto.dataValues.livre)
                return res.json({status: "Erro", dados: "O quarto está ocupado"})

            await reserva.update({
                check_in_realizado: true,
            })

            await reserva.quarto.update({
                livre: false,
            })

            return reserva.quarto
        })

        return res.json({status: "Sucesso", dados: {...resultadoTransaction}})

    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Erro ao efetuar check-in"})
    }
})

module.exports = routes