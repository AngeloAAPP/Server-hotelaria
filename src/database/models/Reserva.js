const { Model, DataTypes } = require('sequelize')
const crypto = require('crypto')

class Reserva extends Model {

    /**
     * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
     * @param sequelize a conexão com o banco de dados
     */
    static init(sequelize) {
        super.init({
            data_inicio: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "A data de inicio é obrigatória"
                    }
                }
            },
            data_fim: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "A data final é obrigatória"
                    }
                }
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: crypto.randomBytes(4).toString('hex')
            },
            quant_adultos: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull:{
                        msg: "A quantidade de adultos é obrigatória"
                    }
                }
            },
            quant_criancas: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull:{
                        msg: "A quantidade de crianças é obrigatória"
                    }
                }
            },
        }, {
            sequelize,
            tableName: 'reservas'
        })
    }

    /**
     * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
     * @param models a lista de models inicializados
     */
    static associate(models){

        //Associa com o hospede
        this.belongsTo(models.Hospede, {

          //nome que daremos pro relacionamento, será usado futuramente nas rotas
          as : 'hospede',

          //campo da tabela reservas que referencia um hospede
          foreignKey: 'hospede_id'
        })

        //Associa com o quarto
        this.belongsTo(models.Quarto, {

            //nome que daremos pro relacionamento, será usado futuramente nas rotas
            as : 'quarto',
  
            //campo da tabela reservas que referencia um quarto
            foreignKey: 'quarto_id'
          })
    }
}

module.exports = Reserva