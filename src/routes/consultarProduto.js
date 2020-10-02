const routes = require('express').Router()
const Produto = require('../database/models/Produto')

routes.get("/", async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const produtos = await Produto.findAll()

    return res.json({status: "Sucesso", dados: produtos})
})

module.exports = routes