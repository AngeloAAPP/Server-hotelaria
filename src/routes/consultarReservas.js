const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

routes.get('/', async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const {cpf, numPassaporte} = req.query

    try {

        if(!cpf && !numPassaporte)
        return res.json({
            status: "Erro",
            dados: "CPF ou passaporte não foi preenchido"
        })

    if(cpf && cpf !== "" && cpf !== "null"){

        const reserva = await Reserva.findAll({
            attributes: ['id', 'data_inicio', 'data_fim', 'senha', 'quant_adultos', 'quant_criancas'],
            include: [
                {
                    association : 'hospede',
                    where: {
                        cpf
                    },
                    attributes: ['cpf']
                }, 
                {
                    association: 'quarto',
                    attributes: ['num_quarto'],
                    include: {
                        association: 'tipo_de_quarto',
                        attributes: ['nome']
                    }
                }
            ]
        })

        if(!reserva)
            return res.json({
                status: "Erro",
                dados: "CPF inválido"
            })

            if(reserva.length === 0)
            return res.json({status: "Erro", dados: "Não foi encontrada nenhuma reserva. Talvez o hospede não possua nenhuma reserva ou o cpf não exista/esteja cadastrado"})

        return res.json({status: "Sucesso", dados: reserva})

    }
    else{

        const reserva = await Reserva.findAll({
            attributes: ['id', 'data_inicio', 'data_fim', 'senha', 'quant_adultos', 'quant_criancas'],
            include: [
                {
                    association : 'hospede',
                    where: {
                        num_passaporte: numPassaporte
                    },
                    attributes: ['num_passaporte']
                }, 
                {
                    association: 'quarto',
                    attributes: ['num_quarto'],
                    include: {
                        association: 'tipo_de_quarto',
                        attributes: ['nome']
                    }
                }
            ]
            
        })

        if(!reserva)
            return res.json({
                status: "Erro",
                dados: "Passaporte inválido"
            })

        if(reserva.length === 0)
            return res.json({status: "Erro", dados: "Não foi encontrada nenhuma reserva. Talvez o hospede não possua nenhuma reserva ou o passaporte não exista/esteja cadastrado"})

        return res.json({status: "Sucesso", dados: reserva})

    }
        
    } catch (error) {
        console.log(error)
        return res.json({status: "erro", dados: "erro no servidor"})
    }

    

})

module.exports = routes