const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

class Funcionario extends Model {

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
                    notNull: {
                        msg: "O Nome é obrigatório"
                    },
                    len: {
                        args: [3, 50],
                        msg: "O nome deve conter entre 3 e 50 caracteres"
                    }
                }
            },
            cargo: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "O cargo é obrigatório"
                    }
                }
            },
            ramal: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "O ramal é obrigatório"
                    }
                }
            },
            celular: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: {
                        args: /^(\d{10})|(\d{11})$/,
                        msg: "Formato de celular inválido"
                    },
                }
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "A senha é obrigatória"
                    }
                }
            }
        }, {
            sequelize,
            tableName: 'funcionarios',
            hooks: {
                beforeCreate: async function (funcionario) {
                    //verifica o tamanho da senha do funcionario
                    if (funcionario.senha.length < 4 || funcionario.senha.length > 20)
                        throw new Error("A senha deve conter entre 4 e 20 caracteres")

                    //criptografa a senha do funcionario
                    funcionario.senha = await bcrypt.hash(funcionario.senha, 10)

                }
            }
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

            //campo da tabela endereços que referencia um funcionario
            foreignKey: 'funcionario_id'
        })
    }
}

module.exports = Funcionario