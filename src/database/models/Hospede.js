const { Model, DataTypes } = require('sequelize')

class Hospede extends Model {

    /**
     * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
     * @param sequelize a conexão com o banco de dados
     */
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull:{
                        msg: "O nome é obrigatório"
                    }
                }
            },
            cpf: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: {
                        args: /^\d{11}$/,
                        msg: "Formato de cpf inválido"
                    },
                }
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull:{
                        msg: "O telefone é obrigatório"
                    },
                    is: {
                        args: /^(\d{10})|(\d{11})$/,
                        msg: "Formato de telefone inválido"
                    },
                }
            },
            num_passaporte: {
                type: DataTypes.STRING,
                allowNull: true
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
            tableName: 'hospedes'
        })
    }

    /**
     * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
     * @param models a lista de models inicializados
     */
    static associate(models) {

        //Associa com endereço
        this.hasOne(models.Endereco, {

            //nome que daremos pro relacionamento, será usado futuramente nas rotas
            as: 'endereco',

            //campo da tabela endereços que referencia um hospede
            foreignKey: 'hospede_id'
        })

        //Associa com a reserva
        this.hasMany(models.Reserva, {

            //nome que daremos pro relacionamento, será usado futuramente nas rotas
            as: 'reservas',

            //campo da tabela reservas que referencia um hospede
            foreignKey: 'hospede_id'
        })
    }
}

module.exports = Hospede