const { Model, DataTypes } = require('sequelize')

class Endereco extends Model {

  /**
   * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
   * @param sequelize a conexão com o banco de dados
   */
  static init(sequelize) {
    super.init({
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O cep é obrigatório'
          },
          is: {
            args: /^\d{8}$/,
            msg: "Formato de cep inválido"
          },
        }
      },
      logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A rua é obrigatória'
          },
          len: {
            args: [4, 100],
            msg: "A rua deve conter entre 4 e 100 caracteres"
          }
        }
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O número do endereço é obrigatório'
          },
          isNumeric: {
            msg: 'O número do endereço deve ser numérico'
          }
        }
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A cidade é obrigatória'
          },
          len: {
            args: [3, 100],
            msg: "A cidade deve conter entre 3 e 100 caracteres"
          },
        }
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O estado é obrigatório'
          },
          len: {
            args: [2, 2],
            msg: "O estado(UF) deve conter apenas 2 caracteres"
          }
        }
      },
      complemento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'enderecos'
    })
  }

  /**
   * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
   * @param models a lista de models inicializados
   */
  static associate(models) {

    //Associa com hospede
    this.belongsTo(models.Hospede, {

      //nome que daremos pro relacionamento, será usado futuramente nas rotas
      as: 'hospede',

      //campo da tabela endereços que referencia um hospede
      foreignKey: 'hospede_id'
    })

    //Associa com funcionario
    this.belongsTo(models.Funcionario, {
      //nome que daremos pro relacionamento, será usado futuramente nas rotas
      as: 'funcionario',

      //campo da tabela endereços que referencia um funcionario
      foreignKey: 'funcionario_id'
    })
  }
}

module.exports = Endereco