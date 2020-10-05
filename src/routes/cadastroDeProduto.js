const routes = require('express').Router()
const Produto = require('../database/models/Produto')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {nome, custo} = req.body

    if(!parseFloat(custo))
        return res.json({status: "Erro", dados: "Custo do produto inválido"})

    try {

        const existeProduto = await Produto.findOne(
            {
                where: {
                    nome
                }
            }
        )

        if(existeProduto)
            return res.json({status: "Erro", dados: "Produto já cadastrado"})
        
        const produto = await Produto.create(
            {
                nome,
                custo,
                categoria: "Frigobar"
            }
        )

        if(!produto)
            return res.json({status: "Erro", dados: "Erro ao cadastrar produto"})

        const produtos = await Produto.findAll({
            where: {
                categoria: "Frigobar"
            }
        })

        return res.json({status: "Sucesso", dados: produtos})

    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Erro ao cadastrar produto"})
    }

})

module.exports = routes