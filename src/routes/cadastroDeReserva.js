const routes = require('express').Router()
const TipoDeQuarto = require('../database/models/TipoDeQuarto')
const Hospede = require('../database/models/Hospede')
const Endereco = require('../database/models/Endereco')
const Quarto = require('../database/models/Quarto')
const Reserva = require('../database/models/Reserva')

routes.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
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
            tipoDeQuarto: req.body.tipoDeQuarto,
            idTipoDeQuarto: null,
        }

        let regexCpf = /^\d{11}$/

        //por algum motivo, o front está mandando null como string
        if(dados.cpf !== "null" && dados.cpf !== ""){
            if(!regexCpf.test(dados.cpf))
                return res.status(400).json({status: "Erro", dados: "Formato de cpf inválido"})
        }
    
        const tipoDeQuarto = await TipoDeQuarto.findOne({
            where: {
                nome: dados.tipoDeQuarto
            }
        })
    
        dados.idTipoDeQuarto = tipoDeQuarto.dataValues.id
    
        var retornoHospede = [];
        if (dados.cpf !== null && dados.cpf !== "null") {
            retornoHospede = await Hospede.findOrCreate({
                where: {
                    cpf: dados.cpf
                },
                defaults: {
                    nome: dados.nome,
                    cpf: dados.cpf,
                    telefone: dados.telefone,
                    num_passaporte: dados.num_passaporte
                }
            })
        }
        else {
            retornoHospede = await Hospede.findOrCreate({
                where: {
                    num_passaporte: dados.num_passaporte
                },
                defaults: {
                    nome: dados.nome,
                    cpf: dados.cpf,
                    telefone: dados.telefone,
                    num_passaporte: dados.num_passaporte
                }
            })
        }

        const hospede = retornoHospede[0];
    
        const [endereco, booleanoEndereco] = await Endereco.findOrCreate({
            where: {
                cep: dados.cep,
                logradouro: dados.logradouro,
                numero: dados.numero,
                cidade: dados.cidade,
                estado: dados.estado,
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
        })
    
        const quarto = await Quarto.findOne({
            where: {
                tipo_de_quarto_id: dados.idTipoDeQuarto,
            }
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
                quant_adultos: dados.quant_adultos,
                quant_criancas: dados.quant_criancas,
                hospede_id: hospede.id,
                quarto_id: quarto.id
            }
        })
    
        res.json({
            status: "Sucesso",
            dados: reserva,
        })
        
    } catch (err) {
        try{
            console.log(err);
            let error = "";

            err.errors.forEach(erro => {
                error += `\n${erro.message}`
            });

            if(error === "")
                return res.status(400).json({status: "Erro", dados: "Verifique as informações e tente novamente"})

            return res.status(400).json({status: "Erro", dados: error})
        }
        
        catch(e){

            return res.status(400).json({status: "Erro", dados: "Verifique as informações e tente novamente"})
        }
    }

})

module.exports = routes