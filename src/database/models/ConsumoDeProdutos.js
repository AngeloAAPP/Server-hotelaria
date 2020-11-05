const {Model, DataTypes} = require('sequelize')

class ConsumoDeProdutos extends Model{

    /**
     * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
     * @param sequelize a conexão com o banco de dados
     */
    static init(sequelize){
        super.init({
            produto_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reserva_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dia: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        },{
            sequelize,
            tableName: 'consumo_de_produtos'
        })
    }
}

module.exports = ConsumoDeProdutos