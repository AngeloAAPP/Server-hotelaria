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

        if (!reserva){
            return res.json({status: "Erro", dados: "Falha ao realizar check-in"})
        }

        if (reserva.check_in_realizado)
            return res.json({status: "Erro", dados: "O check-in já foi realizado"})

        if (!reserva.quarto.livre)
            return res.json({status: "Erro", dados: "O quarto está ocupado"})

        await reserva.update({
            check_in_realizado: true,
        })

        await reserva.quarto.update({
            livre: false,
        })

        await reserva.save()

        await reserva.quarto.save()

        return res.json({status: "Sucesso", dados: "Check-in realizado com sucesso!"})

    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Erro ao efetuar check-in"})
    }
})

module.exports = routes