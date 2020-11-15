const routes = require('express').Router()
const { sequelize } = require('../database/models/Servico')

routes.get("/", async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        const servicosPendentes = await sequelize.query(`
            select consumo_de_servicos.id, servicos.nome, quartos.num_quarto, consumo_de_servicos.dia
            from servicos
            inner join consumo_de_servicos on servicos.id = consumo_de_servicos.servico_id 
            inner join reservas on reservas.id = consumo_de_servicos.reserva_id
            inner join quartos on quartos.id = reservas.quarto_id
            where "reservas"."data_inicio" <= '2020-11-15 21:45:26.554 +00:00'
            and "reservas"."data_fim" >= '2020-11-15 21:45:26.554 +00:00'
            order by consumo_de_servicos.dia
        `)
    
        return res.json({status: "Sucesso", dados: servicosPendentes[0]})
    }
    catch (erro) {
        console.log(erro)
        return res.json({status: "Erro", dados: "Erro no servidor"})
    }
})

module.exports = routes