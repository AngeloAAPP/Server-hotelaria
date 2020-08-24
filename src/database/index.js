const {Sequelize} = require("sequelize")
const dbConfig = require("./config")

//Aqui, teremos que importar os models

const Endereco = require('./models/Endereco')
const Funcionario = require('./models/Funcionario')
const Hospede = require('./models/Hospede')
const Quarto = require('./models/Quarto')
const Reserva = require('./models/Reserva')
const TipoDeQuarto = require('./models/TipoDeQuarto')

const connection = new Sequelize(dbConfig)

//Iniciamos todos os models

Endereco.init(connection)
Funcionario.init(connection)
Hospede.init(connection) 
Quarto.init(connection)
Reserva.init(connection) 
TipoDeQuarto.init(connection)

//Associamos (definimos os relacionamentos) entre os modulos

Endereco.associate(connection.models)
Funcionario.associate(connection.models)
Hospede.associate(connection.models) 
Quarto.associate(connection.models)
Reserva.associate(connection.models) 
TipoDeQuarto.associate(connection.models)

module.exports = connection