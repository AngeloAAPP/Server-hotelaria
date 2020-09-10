//Arquivo que conterá todas as rotas definidas na pasta routes

const routes = require('express').Router()

//Exemplo:
//const roteadorUsuario = require('./routes/usuario')
//routes.use('/user', roteadorUsuario)

//Fazer isto para todas as rotas

const roteadorTiposdeQuartos = require('./routes/tiposdequartos')
const roteadorCadastroDeReserva = require('./routes/cadastroDeReserva')
const roteadorConsultarReserva = require('./routes/consultarReserva')
const roteadorAlterarReserva = require('./routes/alterarReserva')
const roteadorExcluirReserva = require('./routes/excluirReserva')


routes.get('/', (req,res) => {
    return res.json({version: 1.0})
})

routes.use('/tiposdequartos', roteadorTiposdeQuartos)
routes.use('/cadastroDeReserva', roteadorCadastroDeReserva)
routes.use('/consultarReserva', roteadorConsultarReserva)
routes.use('/alterarReserva', roteadorAlterarReserva)
routes.use('/excluirReserva', roteadorExcluirReserva)

module.exports = routes
