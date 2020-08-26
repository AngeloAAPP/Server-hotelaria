const routes = require('express').Router()
const TipoDeQuarto = require('../database/models/TipoDeQuarto')

routes.get('/', async (req, res) => {
    const tiposDequartos = await TipoDeQuarto.findAll({

        attributes: ['id', 'nome', 'capacidade'],
        include: {
            //incluimos os dados dos quartos. é o campo "as" definido no metodo de relacionamento
            association: 'quartos',
            attributes: ['id', 'livre', 'limpo']
        }
    })

    return res.json(tiposDequartos)
})

module.exports = routes