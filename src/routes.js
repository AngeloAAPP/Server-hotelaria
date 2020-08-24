//Arquivo que conterá todas as rotas definidas na pasta routes

const routes = require('express').Router()

//Exemplo:
//const roteadorUsuario = require('./routes/usuario')
//routes.use('/user', roteadorUsuario)

//Fazer isto para todas as rotas

const roteadorTiposdeQuartos = require('./routes/tiposdequartos')


routes.get('/', (req,res) => {
    return res.json({version: 1.0})
})

routes.use('/tiposdequartos', roteadorTiposdeQuartos)


module.exports = routes
