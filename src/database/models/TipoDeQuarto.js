const {Model, DataTypes} = require('sequelize')

class TipoDeQuarto extends Model{

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
            capacidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },{
            sequelize,
            tableName: 'tiposDeQuartos'
        })
    }

    /**
     * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
     * @param models a lista de models inicializados
     */
    static associate(models){

        //Associa com o tipo de quarto
        this.hasMany(models.Quarto, {

          //nome que daremos pro relacionamento, será usado futuramente nas rotas
          as : 'quartos',

          //campo da tabela quartos que referencia um tipo de quarto
          foreignKey: 'tipo_de_quarto_id',
        })
    }
}

module.exports = TipoDeQuarto