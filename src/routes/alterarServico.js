const routes = require('express').Router()
const Servico = require('../database/models/Servico')
const validacao = require('../functions/validacao')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    let { id, nome, custo } = req.body

    if (!parseInt(id)) {
        return res.json({ status: "Erro", dados: "ID inválido" })
    }

    if (nome === "")
        return res.json({ status: "Erro", dados: "Nome do serviço inválido" })

    if (!parseFloat(custo))
        return res.json({ status: "Erro", dados: "Custo do serviço inválido" })

    try {
        const servico = await Servico.findOne({
            attributes: [
                'id',
                'nome',
                'custo'
            ],
            where: {
                id
            }
        })

        if (!servico)
            return res.json({ status: "Erro", dados: "Falha ao alterar serviço" })

        const servicoExiste = await validacao.existeSemAcentoMinuscula(Servico, 'nome', nome, id)

        if (servicoExiste)
            return res.json({ status: "Erro", dados: "O nome do serviço já existe" })

        let { nome: nomeAntigo, custo: custoAntigo } = servico.dataValues
        let dadosNovos = {}

        if (nomeAntigo !== nome)
            dadosNovos.nome = nome

        if (custoAntigo !== custo)
            dadosNovos.custo = custo

        if (dadosNovos !== {}) {
            await servico.update(dadosNovos)

            await servico.save()
        }

        const listaDeServicos = await Servico.findAll({
            order: [['nome', 'ASC']]
        })

        return res.json({ status: "Sucesso", dados: listaDeServicos })

    } catch (error) {
        console.log(error)
        return res.json({ status: "Erro", dados: "Falha ao alterar os dados do serviço" })
    }
})

module.exports = routes
