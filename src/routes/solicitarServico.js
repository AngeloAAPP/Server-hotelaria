const routes = require('express').Router()
const jwt = require('jsonwebtoken')
const ConsumoDeServicos = require('../database/models/ConsumoDeServicos')

routes.post('/', async (req,res) =>{
    const {token, servicos} = req.body

    if(!token)
        return res.json({status: "Erro", dados: "Token ausente"})

    if(!servicos)
        return res.json({status: "Erro", dados: "Servicos ausentes"})

    try {
        const reserva = jwt.verify(token, "senhaqualquer")

        try {
            for (const servico of servicos) {
                for(let i = 0; i < servico.quantidade; i++){
                    await ConsumoDeServicos.create({
                        servico_id: servico.id,
                        reserva_id: reserva.id,
                        dia: new Date(),
                        concluido: false
                    })
                }
            }

            return res.json({status: "Sucesso", dados: "Serviços solicitados com sucesso"})
        } catch (err) {
            return res.json({status: "Erro", dados: "Erro ao solicitar servicos"})
        }
        
        
    } catch (error) {
        return res.json({status: "Erro", dados: "Token inválido"})
    }
})

module.exports = routes