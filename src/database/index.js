const {Sequelize} = require("sequelize")
const dbConfig = require("./config")

//Aqui, teremos que importar os models quando forem criados

const connection = new Sequelize(dbConfig)

//Aqui, utilizaremos os metodos init e associate dos models para inicializar e definir os relacionamentos

module.exports = connection