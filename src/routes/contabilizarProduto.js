const routes = require('express').Router()
const connection = require('../database');
const Produto = require('../database/models/Produto');
const Reserva = require('../database/models/Reserva');
const Sequelize = require('sequelize');
const ConsumoDeProdutos = require('../database/models/ConsumoDeProdutos');
const Op = Sequelize.Op

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {idProduto, quantProduto, idQuarto} = req.body

    if(!parseInt(idProduto))
        return res.json({
            status: "Erro",
            dados: "Produto inválido"
        })

    if(!parseInt(quantProduto) || quantProduto <= 0)
        return res.json({
            status: "Erro",
            dados: "Quantidade inválida"
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
                return {
                    status: "Erro",
                    dados: "Produto não encontrado"
                }

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
                return {
                    status: "Erro",
                    dados: "Reserva não encontrada"
                }

            for (let i = 0; i < quantProduto; i++) {
                const consumoDeProduto = await ConsumoDeProdutos.create(
                    {
                        produto_id: idProduto,
                        reserva_id: reserva.id,
                        dia: new Date().toLocaleString("pt-BR")
                    }
                )
                
                if(!consumoDeProduto)
                    return {status: "Erro", dados: "Erro no consumo do produto"}
            }

            return {status: "Sucesso"}
        })

        return res.json(resultadoTransaction)
    }
    catch (erro) {
        console.log(erro)
        return res.json({
            status: "Erro",
            dados: "Erro no servidor"
        })
    }

})

module.exports = routes