const routes = require('express').Router()
const Produto = require('../database/models/Produto')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    let {id, nome, custo} = req.body

    if (!parseInt(id)) {
        return res.json({status: "Erro", dados: "ID inválido"})
    }

    if(nome === "")
        return res.json({status: "Erro", dados: "Nome do produto inválido"})

    if(!parseFloat(custo))
        return res.json({status: "Erro", dados: "Custo do produto inválido"})

    try {
        const produto = await Produto.findOne({
            attributes: [
                'id',
                'nome',
                'custo'
            ],
            where: {
                id
            }
        })

        if (!produto)
            return res.json({status: "Erro", dados: "Falha ao alterar produto"})

        const produtoExist = await Produto.findOne({
            where: {
                nome
            }
        })

        if(produtoExist)
            return res.json({status: "Erro", dados: "Nome do produto já existente"})

        let {nome: nomeAntigo, custo: custoAntigo} = produto.dataValues
        let dadosNovos = {}

        if (nomeAntigo !== nome)
            dadosNovos.nome = nome

        if (custoAntigo !== custo)
            dadosNovos.custo = custo

        if (dadosNovos !== {}) {
            await produto.update(dadosNovos)

            await produto.save()
        }

        const listaDeProdutos = await Produto.findAll({
            where: {
                categoria: "Frigobar"
            }
        })

        return res.json({status: "Sucesso", dados: listaDeProdutos})
        
    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Falha ao alterar os dados do produto"})
    }
})

module.exports = routes