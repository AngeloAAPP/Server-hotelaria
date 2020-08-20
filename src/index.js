const express = require("express")
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(morgan('dev'))
app.use(routes)

app.listen(process.env.PORT || 3001, () => {
    console.log("servidor iniciado")
}) 