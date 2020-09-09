const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const TipoDeQuarto = require('../database/models/TipoDeQuarto')

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

        const tipodequarto = await TipoDeQuarto.findOne({
            where: {
                nome: tipoDeQuarto
            }
        })

        let tipodequartoID = null

        if(tipodequarto)
            tipodequartoID = tipodequarto.id


        


        await reserva.update({
            data_inicio: dataInicio, 
            data_fim: dataFim, 
            quant_adultos: quantAdultos, 
            quant_criancas: quantCriancas,
        })

        if(tipodequarto){
            await reserva.quarto.update({
                tipo_de_quarto_id: tipodequartoID
            })
        }
        await reserva.save()


        return res.json({status: "Sucesso"})
    } catch (error) {
        return res.json({status: "Erro", dados: "Falha ao alterar reserva"})
    }

})






module.exports = routes