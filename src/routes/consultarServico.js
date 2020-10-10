const routes = require('express').Router()
const Servico = require('../database/models/Servico')

routes.get("/", async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const servicos = await Servico.findAll()

    return res.json({status: "Sucesso", dados: servicos})
})

module.exports = routes