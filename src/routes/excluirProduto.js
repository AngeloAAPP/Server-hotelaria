const routes = require('express').Router()
const Produto = require('../database/models/Produto')

// Exemplo: http://localhost:3001/excluirProduto/5
routes.delete('/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        var idProduto = parseInt(req.params.id);

        const excluido = await Produto.destroy({
            where: { id: idProduto }
        });

        if (!excluido)
            return res.json({ status: "Erro", dados: "Falha ao excluir produto" })

        const produtos = await Produto.findAll({
            where: {
                categoria: "Frigobar"
            },
            order: [['nome', 'ASC']]
        })
        
        return res.json({ status: "Sucesso", dados: produtos })

    } catch (error) {
        console.log(error)
        return res.json({ status: "Erro", dados: "Falha ao excluir o produto" })
    }
})

module.exports = routes