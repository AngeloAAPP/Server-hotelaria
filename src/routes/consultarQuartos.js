const routes = require('express').Router()
const Quarto = require('../database/models/Quarto')

routes.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    try {
        const quarto = await Quarto.findAll({
            attributes: ['id', 'num_quarto', 'livre'],
            order: [['num_quarto', 'ASC']]
        })

        if(!quarto)
            return res.json({
                status: "Erro",
                dados: "Quartos não encontrados"
            })

        if(quarto.length === 0)
            return res.json({
                status: "Erro",
                dados: "Não foi encontrado nenhum quarto."
            })

        return res.json({status: "Sucesso", dados: quarto})
            
    } catch (error) {
        console.log(error)
        return res.json({
            status: "Erro",
            dados: "Erro no servidor"
        })
    }
})

module.exports = routes