const {Model, DataTypes} = require('sequelize')

class Servico extends Model{

    /**
     * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
     * @param sequelize a conexão com o banco de dados
     */
    static init(sequelize){
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            custo: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },{
            sequelize,
            tableName: 'servicos'
        })
    }

    /**
     * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
     * @param models a lista de models inicializados
     */
    static associate(models){
        this.belongsToMany(
          models.Reserva, 
          {
              // nome da tabela do relacionamento
              through: 'consumo_de_servicos',

            //nome que daremos pro relacionamento, será usado futuramente nas rotas
              as : 'reservas',

              // referência na tabela reserva 
              foreignKey: 'reserva_id'
          })
    }
}

module.exports = Servico