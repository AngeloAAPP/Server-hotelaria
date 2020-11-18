const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const ConsumoDeServicos = require('../database/models/ConsumoDeServicos')
const ConsumoDeProdutos = require('../database/models/ConsumoDeProdutos')
const Produto = require('../database/models/Produto')
const Servico = require('../database/models/Servico')


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
        order: ['dia']
    })

    const servicosConsumidos = await ConsumoDeServicos.findAll({
        where: {
            reserva_id: reserva.id,
            concluido: true
        },
        attributes: ['id','servico_id','reserva_id', 'dia', 'concluido'],
        order: ['dia']
    })

    const produtos = await Produto.findAll({
        attributes: ['id','nome','custo'],
        where : {
            categoria: 'Frigobar'
        },
    })

    let total = 0

    const consumoP = produtosConsumidos.map( consumido => { 


        const [p] = produtos.filter(prod => prod.dataValues.id === consumido.dataValues.produto_id).map(prod => prod.dataValues)
        total += p.custo
    
        return {
            nome: p.nome,
            custo: p.custo,
            data: consumido.dataValues.dia,
        }
    })
    
    const servicos = await Servico.findAll({
        attributes: ['id','nome','custo']
    })

    const consumoS = servicosConsumidos.map( consumido => { 

        const [s] = servicos.filter(serv => serv.dataValues.id === consumido.dataValues.servico_id).map(serv => serv.dataValues)

    
        total += s.custo
    
        return {
            nome: s.nome,
            custo: s.custo,
            data: consumido.dataValues.dia,
        }
    })

    return res.json({status: "Sucesso", dados: {produtosConsumidos: consumoP, servicosConsumidos: consumoS, total: total.toFixed(2)}})    
})

module.exports = routes