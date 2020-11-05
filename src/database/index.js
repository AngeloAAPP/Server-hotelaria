const {Sequelize} = require("sequelize")
const dbConfig = require("./config")

//Aqui, teremos que importar os models

const Endereco = require('./models/Endereco')
const Funcionario = require('./models/Funcionario')
const Hospede = require('./models/Hospede')
const Quarto = require('./models/Quarto')
const Reserva = require('./models/Reserva')
const TipoDeQuarto = require('./models/TipoDeQuarto')
const Cargo = require('./models/Cargo')
const Produto = require('./models/Produto')
const Servico = require('./models/Servico')
const ConsumoDeProdutos = require("./models/ConsumoDeProdutos")
const ConsumoDeServicos = require("./models/ConsumoDeServicos")


const connection = new Sequelize(dbConfig)

//Iniciamos todos os models

Endereco.init(connection)
Funcionario.init(connection)
Hospede.init(connection) 
Quarto.init(connection)
Reserva.init(connection) 
TipoDeQuarto.init(connection)
Cargo.init(connection)
Produto.init(connection)
Servico.init(connection)
ConsumoDeProdutos.init(connection)
ConsumoDeServicos.init(connection)

//Associamos (definimos os relacionamentos) entre os modulos

Endereco.associate(connection.models)
Funcionario.associate(connection.models)
Hospede.associate(connection.models) 
Quarto.associate(connection.models)
Reserva.associate(connection.models) 
TipoDeQuarto.associate(connection.models)
Cargo.associate(connection.models)
Produto.associate(connection.models)
Servico.associate(connection.models)

module.exports = connection