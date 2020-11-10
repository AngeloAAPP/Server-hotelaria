const routes = require('express').Router()
const ConsumoDeServicos = require('../database/models/ConsumoDeServicos')
const connection = require('../database')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {id} = req.body

    if(!parseInt(id)){
        return res.json({status: "Erro", dados: "Falha ao concluir serviço."})
    }
    
    try {
        const servico = await ConsumoDeServicos.findOne({
            where: {
                id
            }
        })

        if(!servico){
            return res.json({status: "Erro", dados: "Falha ao concluir serviço."})
        }

        if(servico.concluido){
            return res.json({status: "Erro", dados: "Serviço já foi concluído."})
        }

        await servico.update({
            concluido: true,
        })

        await servico.save()
        
        return res.json({status: "Sucesso", dados: "Serviço concluído com sucesso."})

    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Erro ao concluir serviço."})
    }
})

module.exports = routes