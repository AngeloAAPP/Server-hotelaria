const routes = require('express').Router()
const jwt = require('jsonwebtoken')
const ConsumoDeServicos = require('../database/models/ConsumoDeServicos')
const { sequelize } = require('../database/models/Servico')
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
                    await sequelize.query(`
                        insert into consumo_de_servicos(servico_id, reserva_id, dia, concluido, created_at, updated_at)
                        values ('${servico.id}', '${reserva.id}', '${new Date().toLocaleString("pt-BR")}', '${false}', 
                        '${new Date().toLocaleString("pt-BR")}', '${new Date().toLocaleString("pt-BR")}')
                        `)
                
                }
            }

            return res.json({status: "Sucesso", dados: "Serviços solicitados com sucesso"})
        } catch (err) {
            console.log(err)
            return res.json({status: "Erro", dados: "Erro ao solicitar servicos"})
        }
        
        
    } catch (error) {
        return res.json({status: "Erro", dados: "Token inválido"})
    }
})

module.exports = routes