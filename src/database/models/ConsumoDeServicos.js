const {Model, DataTypes} = require('sequelize')

class ConsumoDeServicos extends Model{

    /**
     * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
     * @param sequelize a conexão com o banco de dados
     */
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            servico_id: {
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
            },
            concluido: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },{
            sequelize,
            tableName: 'consumo_de_servicos'
        })
    }
}

module.exports = ConsumoDeServicos