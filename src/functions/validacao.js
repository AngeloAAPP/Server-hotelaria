const Reserva = require('../database/models/Reserva')
const Quarto = require('../database/models/Quarto')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const validacao = {
    verificarQuartoVazio: async (tipoDeQuarto, dataInicio, dataFim)=> {
        return await Quarto.findOne({
            where: {
                tipo_de_quarto_id: tipoDeQuarto,
            },
            include: [
                {
                    model: Reserva,
                    as: 'reservas',
                    where: {
                        [Op.or]: [
                            {
                                id: {
                                    [Op.is]: null,
                                }
                            },
                            {
                                [Op.and]: [
                                    {
                                        data_inicio: {
                                            [Op.notBetween]: [
                                                dataInicio,
                                                dataFim,
                                            ]
                                        }
                                    },
                                    {
                                        data_fim: {
                                            [Op.notBetween]: [
                                                dataInicio,
                                                dataFim,
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    required: false
                }
            ]
        })

    }
}

module.exports = validacao