const routes = require('express').Router()
const TipoDeQuarto = require('../database/models/TipoDeQuarto')
const Hospede = require('../database/models/Hospede')
const Endereco = require('../database/models/Endereco')
const Quarto = require('../database/models/Quarto')
const Reserva = require('../database/models/Reserva')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const dados = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        num_passaporte: req.body.numPassaporte,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        cidade: req.body.cidade,
        estado: req.body.estado,
        complemento: req.body.complemento,
        telefone: req.body.telefone,
        quant_adultos: req.body.quantAdultos,
        quant_criancas: req.body.quantCriancas,
        data_inicio: req.body.dataInicio,
        data_fim: req.body.dataFim,
        senha: null,
        tipoDeQuarto: req.body.tipoDeQuarto,
        idTipoDeQuarto: null,
    }

    const tipoDeQuarto = await TipoDeQuarto.findOne({
        where: {
            nome: dados.tipoDeQuarto,
        }
    }).catch(erro => {
        res.json({
            status: "Erro",
            dados: {
                tabela: "TipoDeQuarto",
                erro,
            }
        })
    })

    dados.idTipoDeQuarto = tipoDeQuarto.dataValues.id

    const [hospede, booleanoHospede] = await Hospede.findOrCreate({
        where: {
            cpf: dados.cpf
        },
        defaults: {
            nome: dados.nome,
            cpf: dados.cpf,
            telefone: dados.telefone,
            num_passaporte: dados.num_passaporte,
            quant_adultos: dados.quant_adultos,
            quant_criancas: dados.quant_criancas
        }
    }).catch(erro => {
        res.json({
            status: "Erro",
            dados: {
                tabela: "Hospede",
                erro,
            }
        })
    })

    const [endereco, booleanoEndereco] = await Endereco.findOrCreate({
        where: {
            cep: dados.cep,
            logradouro: dados.logradouro,
            numero: dados.numero,
            cidade: dados.cidade,
            estado: dados.estado,
            complemento: dados.complemento,
            hospede_id: hospede.dataValues.id
        },
        defaults: {
            cep: dados.cep,
            logradouro: dados.logradouro,
            numero: dados.numero,
            cidade: dados.cidade,
            estado: dados.estado,
            complemento: dados.complemento,
            hospede_id: hospede.dataValues.id
        }
    }).catch(erro => {
        res.json({
            status: "Erro",
            dados: {
                tabela: "Endereco",
                erro,
            }
        })
    })

    const quarto = await Quarto.findOne({
        where: {
            tipo_de_quarto_id: dados.idTipoDeQuarto,
        }
    }).catch(erro => {
        res.json({
            status: "Erro",
            dados: {
                tabela: "Quarto",
                erro,
            }
        })
    })

    const [reserva, booleanoReserva] = await Reserva.findOrCreate({
        where: {
            data_inicio: dados.data_inicio,
            data_fim: dados.data_fim
        },
        defaults: {
            data_inicio: dados.data_inicio,
            data_fim: dados.data_fim,
            senha: dados.senha,
            hospede_id: hospede.id,
            quarto_id: quarto.id
        }
    }).catch(erro => {
        res.json({
            status: "Erro",
            dados: {
                tabela: "Reserva",
                erro,
            }
        })
    })

    res.json({
        status: "Sucesso",
        dados: reserva,
    })
})

module.exports = routes