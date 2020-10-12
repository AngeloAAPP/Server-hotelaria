const routes = require('express').Router()
const Servico = require('../database/models/Servico')

// Exemplo: http://localhost:3001/excluirServico/5
routes.delete('/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        var idServico = parseInt(req.params.id);

        const excluido = await Servico.destroy({
            where: { id: idServico }
        });

        if (!excluido)
            return res.json({ status: "Erro", dados: "Falha ao excluir serviço" })

        const servicos = await Servico.findAll({
            order: [['nome', 'ASC']]
        })
        
        return res.json({ status: "Sucesso", dados: servicos })

    } catch (error) {
        console.log(error)
        return res.json({ status: "Erro", dados: "Falha ao excluir o serviço" })
    }
})

module.exports = routes