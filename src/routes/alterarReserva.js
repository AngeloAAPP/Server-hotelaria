const routes = require('express').Router()
const Reserva = require('../database/models/Reserva')
const TipoDeQuarto = require('../database/models/TipoDeQuarto')
const validacao = require('../functions/validacao')
//FALTA VERIFICAR SE O QUARTO ESTÁ VÁLIDO AO TROCAR A DATA
routes.post('/',async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    let {id, senha, dataInicio, dataFim, quantAdultos, quantCriancas, tipoDeQuarto = ""} = req.body
    dataInicio = new Date(dataInicio)
    dataFim = new Date(dataFim)
    let verificarVazio = false;

    if (!parseInt(id)) {
        return res.json({status: "Erro", dados: "ID inválido"})
    }

    try {
        const reserva = await Reserva.findOne({
            attributes: [
                'id',
                'data_inicio',
                'data_fim',
                'quant_adultos',
                'quant_criancas',
                'quarto_id'
            ],
            where: {
                id,
                senha
            },
            include: {
                association: 'quarto',
                attributes: [
                    'id'
                ],
                include: {
                    association: 'tipo_de_quarto',
                    attributes: [
                        'id',
                        'nome'
                    ]
                }
            }
        })

        if (!reserva)
            return res.json({status: "Erro", dados: "Falha ao alterar reserva"})

        let {id: idReserva, data_inicio, data_fim, quant_adultos, quant_criancas, quarto_id} = reserva.dataValues
        let tipo_de_quarto = reserva.quarto.tipo_de_quarto.dataValues

        let dadosNovos = {}

        if (data_inicio.toString() != dataInicio.toString()) {
            dadosNovos.data_inicio = dataInicio
            verificarVazio = true
        }
        if (data_fim.toString() != dataFim.toString()) {
            dadosNovos.data_fim = dataFim
            verificarVazio = true
        }
        if (quant_adultos !== quantAdultos)
            dadosNovos.quant_adultos = quantAdultos
        if (quant_criancas !== quantCriancas)
            dadosNovos.quant_criancas = quantCriancas

        if (tipoDeQuarto !==  "" && tipo_de_quarto.nome !== tipoDeQuarto) {
            const novoTipoDeQuarto = await TipoDeQuarto.findOne({
                where: {
                    nome: tipoDeQuarto
                }
            })

            if (!novoTipoDeQuarto)
                return res.json({status: "Erro", dados: "Falha ao alterar reserva"})
            
            const quarto = await validacao.verificarQuartoVazio(novoTipoDeQuarto.id, dataInicio, dataFim)

            if (!quarto)
                return res.json({
                    status: "Erro",
                    dados: "Não há nenhum quarto disponível nesse período"
                })
            
            dadosNovos.quarto_id = quarto.id
        }
        else {
            if (verificarVazio) {
                const quarto = await validacao.verificarQuartoVazio(tipo_de_quarto.id, dataInicio, dataFim, idReserva)

                if (!quarto)
                    return res.json({
                        status: "Erro",
                        dados: "Não há nenhum quarto disponível nesse período"
                    })

                if (quarto_id !== quarto.id)
                    dadosNovos.quarto_id = quarto.id
            }
        }

        if (dadosNovos !== {}) {
            await reserva.update(dadosNovos)

            await reserva.save()
        }

        return res.json({status: "Sucesso"})
    } catch (error) {
        console.log(error)
        return res.json({status: "Erro", dados: "Falha ao alterar reserva"})
    }
})






module.exports = routes