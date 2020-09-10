const routes = require('express').Router()

const Funcionario = require('../database/models/Funcionario')
const Endereco = require('../database/models/Endereco')


const connection = require('../database')

routes.post('/', async (req,res) => {
    const {nome, celular, senha, cargo, cep, logradouro, numero, cidade, estado, complemento} = req.body 

    if(!parseInt(cargo))
         return res.status(400).json({status: "Erro", dados: "Cargo inválido"})

    try {

        const resultadoTransaction = await connection.transaction(async t => {

            const funcionario = await Funcionario.create({nome, celular, senha, cargo_id: parseInt(cargo)}, {transaction: t})

            const endereco = await Endereco.create({cep, logradouro, numero,cidade, estado, complemento, funcionario_id: funcionario.id}, {transaction: t} )

            //omite a senha do funcionario no retorno dos dados
            funcionario.senha = undefined

            return {funcionario, endereco}
        })


        return res.json({Status: "Sucesso", dados: {...resultadoTransaction}})
        
    } catch (err) {

        try{
            console.log(err);
            let error = "";

            err.errors.forEach(erro => {
                error += `\n${erro.message}`
            });

            if(error === "")
                return res.status(400).json({status: "Erro", dados: "Verifique as informações e tente novamente"})

            return res.status(400).json({status: "Erro", dados: error})
        }
        
        catch(e){
            return res.status(400).json({status: "Erro", dados: "Falha ao cadastrar funcionário"})
        }
        
    }
})

module.exports = routes