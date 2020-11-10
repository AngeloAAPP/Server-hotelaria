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
const roteadorConsultarProduto = require('./routes/consultarProduto')
const roteadorExcluirProduto = require('./routes/excluirProduto')
const roteadorAlterarProduto = require('./routes/alterarProduto')
const roteadorCadastroDeServico = require('./routes/cadastroDeServico')
const roteadorConsultarServico = require('./routes/consultarServico')
const roteadorExcluirServico = require('./routes/excluirServico')
const roteadorAlterarServico = require('./routes/alterarServico')
const roteadorConsultarQuartos = require('./routes/consultarQuartos')
const roteadorContabilizarProduto = require('./routes/contabilizarProduto')
const roteadorloginHospede = require('./routes/loginHospede')
const roteadorSolicitarServico = require('./routes/solicitarServico')
const roteadorConcluirServico = require('./routes/concluirServico')

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
routes.use('/consultarProduto', roteadorConsultarProduto)
routes.use('/excluirProduto', roteadorExcluirProduto)
routes.use('/alterarProduto', roteadorAlterarProduto)
routes.use('/cadastroDeServico', roteadorCadastroDeServico)
routes.use('/consultarServico', roteadorConsultarServico)
routes.use('/excluirServico', roteadorExcluirServico)
routes.use('/alterarServico', roteadorAlterarServico)
routes.use('/consultarQuartos', roteadorConsultarQuartos)
routes.use('/contabilizarProduto', roteadorContabilizarProduto)
routes.use('/loginHospede', roteadorloginHospede)
routes.use('/solicitarServico', roteadorSolicitarServico)
routes.use('/concluirServico', roteadorConcluirServico)


module.exports = routes