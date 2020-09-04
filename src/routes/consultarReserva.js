const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

routes.get('/', async (req,res) => {
    const {cpf, numPassaporte, senha} = req.body

    try {

        if(!cpf && !numPassaporte)
        return res.json({
            status: "Erro",
            dados: "CPF ou passaporte não foi preenchido"
        })

    if(!senha)
        return res.json({
            status: "Erro",
            dados: "Senha não preenchida"
        })

    if(cpf){

        const reserva = await Reserva.findOne({
            where: {
                senha
            },
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
                dados: "CPF ou senha inválidas"
            })

        return res.json(reserva)

    }
    else{

        const reserva = await Reserva.findOne({
            where: {
                senha
            },
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
                dados: "Passaporte ou senha inválidas"
            })

        return res.json(reserva)

    }
        
    } catch (error) {
        return res.json({status: "erro", dados: "erro no servidor"})
    }

    

})

module.exports = routes