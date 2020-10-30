const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')

const jwt = require('jsonwebtoken')

routes.post('/', async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const {cpf, numPassaporte, senha} = req.query

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

    if(cpf && cpf !== "" && cpf !== "null"){

        const reserva = await Reserva.findOne({
            where: {
                senha
            },
            attributes: ['id', 'data_inicio', 'data_fim', 'senha', 'quant_adultos', 'quant_criancas', 'check_in_realizado'],
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

        if(!reserva.check_in_realizado)
            return res.json({
                status: "Erro",
                dados: "O check-in no hotel ainda não foi realizado"
            })

        //Não coloca a senha no token
        reserva.senha = undefined

        //Foi colocado uma senha qualquer por enquanto. Decidir se colocará a senha em variavel de ambiente, configurando o heroku
        //Token expirando em 1 dia
        const token = jwt.sign({...reserva.dataValues}, "senhaqualquer", {
            expiresIn: 86400
        })
        return res.json({status: "Sucesso", dados: token})

    }
    else{

        const reserva = await Reserva.findOne({
            where: {
                senha
            },
            attributes: ['id', 'data_inicio', 'data_fim', 'senha', 'quant_adultos', 'quant_criancas', 'check_in_realizado'],
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

        if(!reserva.check_in_realizado)
            return res.json({
                status: "Erro",
                dados: "O check-in no hotel ainda não foi realizado"
            })

        //Não coloca a senha no token
        reserva.senha = undefined

        //Foi colocado uma senha qualquer por enquanto. Decidir se colocará a senha em variavel de ambiente, configurando o heroku
        //Token expirando em 1 dia
        const token = jwt.sign({...reserva.dataValues}, "senhaqualquer", {
            expiresIn: 86400
        })
        return res.json({status: "Sucesso", dados: token})

    }
        
    } catch (error) {
        console.log(error)
        return res.json({status: "erro", dados: "erro no servidor"})
    }

})



module.exports = routes