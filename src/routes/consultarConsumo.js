const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const ConsumoDeServicos = require('../database/models/ConsumoDeServicos')
const ConsumoDeProdutos = require('../database/models/ConsumoDeProdutos')
const Produto = require('../database/models/Produto')


routes.get("/", async (req,res) => {
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
        }
    })

    if(!reserva){
        return res.json({
            status: "Erro",
            dados: "Reserva não encontrada com o ID: " + id
        })
    }

    const produtosConsumidos = await ConsumoDeProdutos.findAll({
        where: {
            reserva_id: reserva.id
        },
        attributes: ['id','produto_id','reserva_id', 'dia'],
    })

    const servicosConsumidos = await ConsumoDeServicos.findAll({
        where: {
            reserva_id: reserva.id,
            concluido: false
        },
        attributes: ['id','servico_id','reserva_id', 'dia', 'concluido'],
    })

    const produtos = await Produto.findAll({
        attributes: ['id','nome','custo'],
        where : {
            categoria: 'Frigobar'
        }
    })


    const consumoP = produtosConsumidos.map( consumido => { 
        const [p] = produtos.filter(produto => produto.id === consumido.id)
        const teste = p.map( p => p.nome)
        console.log(teste)
        return '1'
    })
    

    return res.json({status: "Sucesso", dados: {produtosConsumidos, servicosConsumidos, produtos}})    
})

module.exports = routes