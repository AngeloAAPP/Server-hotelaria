const Quarto = require('../database/models/Quarto')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const conexao = require('../database/index')

const validacao = {
    verificarQuartoVazio: async (tipoDeQuarto, dataInicio, dataFim)=> {
        return await Quarto.findOne({
            where: {
                id: {
                    [Op.notIn]: Sequelize.literal('(' + conexao.dialect.queryGenerator.selectQuery('reservas',{
                        attributes: ['quarto_id'],
                        where: {
                              data_inicio: {[Op.lt]: dataFim},
                              data_fim: {[Op.gt]: dataInicio},
                        }})
                        .slice(0,-1) + ')')
                },
                tipo_de_quarto_id: tipoDeQuarto
            }
        })
    }
}

module.exports = validacao