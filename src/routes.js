const routes = require('express').Router()


routes.use('/', (req,res) => {
    return res.json({version: 1.0})
})


module.exports = routes
