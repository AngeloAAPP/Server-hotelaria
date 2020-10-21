const routes = require('express').Router()
const Servico = require('../database/models/Servico')
const validacao = require('../functions/validacao')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const {nome, custo} = req.body

    if(!parseFloat(custo))
        return res.json({status: "Erro", dados: "Custo do serviço inválido"})

    try {
        const existeServico = await validacao.existeSemAcentoMinuscula(Servico, 'nome', nome)

        if(existeServico)
            return res.json({status: "Erro", dados: "Serviço já cadastrado"})
        
        const servico = await Servico.create(
            {
                nome,
                custo
            }
        )

        if(!servico)
            return res.json({status: "Erro", dados: "Erro ao cadastrar serviço"})

        const servicos = await Servico.findAll({
            order: [['nome', 'ASC']]
        })

        return res.json({status: "Sucesso", dados: servicos})

    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Erro ao cadastrar serviço"})
    }
})

module.exports = routes