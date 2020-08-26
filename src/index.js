require('dotenv').config()

const express = require("express")
const morgan = require('morgan')
const routes = require('./routes')
const bodyParser = require('body-parser')

//importa a conexão com o banco de dados
require('./database')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(process.env.PORT || 3001, () => {
    console.log("Servidor iniciado")
}) 