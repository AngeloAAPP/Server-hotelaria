const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

routes.get('/', async (req,res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const {cpf, numPassaporte} = req.query

    try {

        if(!cpf && !numPassaporte)
        return res.json({
            status: "Erro",
            dados: "CPF ou passaporte não foi preenchido"
        })


    if(cpf && cpf !== "" && cpf !== "null"){

        const reservas = await Reserva.findAll({
            where: {
                check_in_realizado: true,
            },
            attributes: ['id', 'data_inicio', 'data_fim', 'quant_adultos', 'quant_criancas', 'check_in_realizado'],
            include: [
                {
                    association : 'hospede',
                    where: {
                        cpf
                    },
                    attributes: ['cpf', 'nome']
                }, 
                {
                    association: 'quarto',
                    where: {
                        livre: false
                    },
                    attributes: ['num_quarto'],
                    include: {
                        association: 'tipo_de_quarto',
                        attributes: ['nome']
                    }
                }
            ]
        })


        if(reservas.length === 0)
            return res.json({
                status: "Erro",
                dados: "Nenhuma reserva encontrada com o cpf informado"
            })


        return res.json({status: "Sucesso", dados: reservas})

    }
    else{

        const reservas = await Reserva.findAll({
            where: {
                check_in_realizado: true,
            },
            attributes: ['id', 'data_inicio', 'data_fim', 'quant_adultos', 'quant_criancas', 'check_in_realizado'],
            include: [
                {
                    association : 'hospede',
                    where: {
                        num_passaporte: numPassaporte
                    },
                    attributes: ['num_passaporte', 'nome']
                }, 
                {
                    association: 'quarto',
                    where: {
                        livre: false
                    },
                    attributes: ['num_quarto'],
                    include: {
                        association: 'tipo_de_quarto',
                        attributes: ['nome']
                    }
                }
            ]
            
        })

        if(reservas.length === 0)
            return res.json({
                status: "Erro",
                dados: "Nenhuma reserva encontrada com o passaporte informado"
            })

        return res.json({status: "Sucesso", dados: reservas})

    }
        
    } catch (error) {
        console.log(error)
        return res.json({status: "erro", dados: "erro no servidor"})
    }  
})

module.exports = routes