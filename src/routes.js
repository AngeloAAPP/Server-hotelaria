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
const roteadorCadastroDeFuncionario = require('./routes/cadastroDeFuncionario')
const roteadorConsultarReservas = require('./routes/consultarReservas')
const roteadorRealizarCheckInReserva = require('./routes/realizarCheckInReserva')
const roteadorCadastroDeProduto = require('./routes/cadastroDeProduto')


routes.get('/', (req,res) => {
    return res.json({version: 1.0})
})

routes.use('/tiposdequartos', roteadorTiposdeQuartos)
routes.use('/cadastroDeReserva', roteadorCadastroDeReserva)
routes.use('/consultarReserva', roteadorConsultarReserva)
routes.use('/alterarReserva', roteadorAlterarReserva)
routes.use('/excluirReserva', roteadorExcluirReserva)
routes.use('/cadastroDeFuncionario', roteadorCadastroDeFuncionario)
routes.use('/consultarReservas', roteadorConsultarReservas)
routes.use('/realizarCheckInReserva', roteadorRealizarCheckInReserva)
routes.use('/cadastroDeProduto', roteadorCadastroDeProduto)

module.exports = routes
