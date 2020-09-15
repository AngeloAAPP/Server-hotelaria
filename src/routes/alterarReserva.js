const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const TipoDeQuarto = require('../database/models/TipoDeQuarto')
const validacao = require('../functions/validacao')



routes.post('/',async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {id, senha, dataInicio, dataFim, quantAdultos, quantCriancas, tipoDeQuarto = ""} = req.body

    if(!parseInt(id)){
        return res.json({status: "Erro", dados: "id inválido"})
    }

    try {
        const reserva = await Reserva.findOne({
            where: {
                id,
                senha
            },
            include: {association: 'quarto'}
        })

        if(!reserva)
            return res.json({status: "Erro", dados: "Falha ao alterar reserva"})

        await reserva.update({
            data_inicio: dataInicio, 
            data_fim: dataFim, 
            quant_adultos: quantAdultos, 
            quant_criancas: quantCriancas,
        })

        if(tipoDeQuarto !==  ""){
            const novoTipoDeQuarto = await TipoDeQuarto.findOne({
                where: {
                    nome: tipoDeQuarto
                }
            })

            if(!novoTipoDeQuarto)
                return res.json({status: "Erro", dados: "Falha ao alterar reserva"})

            const quarto = await validacao.verificarQuartoVazio(novoTipoDeQuarto.id, new Date(dataInicio), new Date(dataFim))

            if(!quarto)
                return res.json({
                    status: "Erro",
                    dados: "Não há nenhum quarto disponível nesse período"
                })

            await reserva.update({
                quarto_id: quarto.id
            })
        }

        await reserva.save()


        return res.json({status: "Sucesso"})
    } catch (error) {
        console.log(error);
        return res.json({status: "Erro", dados: "Falha ao alterar reserva"})
    }

})






module.exports = routes