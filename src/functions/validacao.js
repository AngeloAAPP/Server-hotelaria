const Quarto = require('../database/models/Quarto')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const conexao = require('../database/index')

const validacao = {
    verificarQuartoVazio: async (tipoDeQuarto, dataInicio, dataFim, idReserva = null) => {
        return await Quarto.findOne({
            where: {
                id: {
                    [Op.notIn]: Sequelize.literal('(' + conexao.dialect.queryGenerator.selectQuery('reservas',{
                        attributes: ['quarto_id'],
                        where: {
                            id: {[Op.ne]: idReserva},
                            data_inicio: {[Op.lt]: dataFim},
                            data_fim: {[Op.gt]: dataInicio},
                        }})
                        .slice(0,-1) + ')')
                },
                tipo_de_quarto_id: tipoDeQuarto
            }
        })
    },

    /** Verifica se existe algum 'atributo' na coluna 'coluna' da tabela 'model', desconsiderando
     *  acentos e cedilhas e se o atributo está em letra maiúscula ou minúscula.
        @param model O model da tabela a ser consultada
        @param coluna O nome da coluna da tabela a ser consultada
        @param atributo O valor do atributo a ser consultado
        @param id Opcional. ID para excluir da consulta
    */
    existeSemAcentoMinuscula: async (model, coluna, atributo, id = null) => {
        return await model.findOne(
            {
                where: {
                    [Op.and]: 
                        Sequelize.where(
                            Sequelize.fn('unaccent', Sequelize.col(coluna)), {
                                [Op.iLike]: Sequelize.fn('unaccent', atributo)
                            }
                        ),
                        id: {[Op.ne]: id},
                }
            }
        )
    }
}

module.exports = validacao