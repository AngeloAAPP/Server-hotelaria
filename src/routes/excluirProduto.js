const routes = require('express').Router()
const Produto = require('../database/models/Produto')

// Exemplo: http://localhost:3001/excluirProduto/5
routes.delete('/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        var produtoId = parseInt(req.params.id);

        const deleted = await Produto.destroy({
            where: { id: produtoId }
        });

        if (!deleted)
            return res.json({ status: "Erro", dados: "Falha ao excluir produto" })

        return res.json({ status: "Sucesso" })

    } catch (error) {
        console.log(error)
        return res.json({ status: "Erro", dados: "Falha ao excluir o produto" })
    }
})

module.exports = routes