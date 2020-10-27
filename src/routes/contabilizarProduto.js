const routes = require('express').Router()
const connection = require('../database');
const Produto = require('../database/models/Produto');
const Quarto = require('../database/models/Quarto');
const Reserva = require('../database/models/Reserva');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

routes.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {idProduto, idQuarto} = req.body

    if(!parseInt(idProduto))
        return res.json({
            status: "Erro",
            dados: "Produto inválido"
        })

    if(!parseInt(idQuarto))
        return res.json({
            status: "Erro",
            dados: "Quarto inválido"
        })

    try {
        const resultadoTransaction = await connection.transaction(async t => {
            const produto = await Produto.findOne({
                where: {
                    id: idProduto
                }
            })

            if (!produto)
                return res.json({
                    status: "Erro",
                    dados: "Produto não encontrado"
                })

            const reserva = await Reserva.findOne({
                attributes: [
                    'id'
                ],
                where: {
                    check_in_realizado: true,
                    data_inicio: {[Op.lte]: new Date()},
                    data_fim: {[Op.gte]: new Date()},
                },
                include: {
                    association: 'quarto',
                    attributes: [
                        'id'
                    ],
                    where: {
                        id: idQuarto,
                        livre: false
                    }
                }
            })

            if (!reserva)
                return res.json({
                    status: "Erro",
                    dados: "Reserva não encontrada"
                })

            /*await Reserva.update({
                where: {
                    id: reserva.id
                },
                include: {
                    association: 'consumo_de_produtos',
                    attributes: [
                        'produto_id',
                        'reserva_id'
                    ]
                }
            })*/

            console.log(reserva)




            //return
        })

        console.log(resultadoTransaction)
    }
    catch (erro) {

    }

})

module.exports = routes