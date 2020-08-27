const {Model, DataTypes} = require('sequelize')

class Quarto extends Model{

    /**
     * Método que quando for chamado inicializará o Model, sendo chamado no arquivo em que a conexão com bd é criada
     * @param sequelize a conexão com o banco de dados
     */
    static init(sequelize){
        super.init({
            num_quarto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            livre: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            limpo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }
        },{
            sequelize,
            tableName: 'quartos'
        })
    }

    /**
     * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
     * @param models a lista de models inicializados
     */
    static associate(models){

        //Associa com o tipo de quarto
        this.belongsTo(models.TipoDeQuarto, {

          //nome que daremos pro relacionamento, será usado futuramente nas rotas
          as : 'tipo_de_quarto',

          //campo da tabela quartos que referencia um tipo de quarto
          foreignKey: 'tipo_de_quarto_id'
        })

        //Associa com a reserva
        this.hasMany(models.Reserva, {

            //nome que daremos pro relacionamento, será usado futuramente nas rotas
            as : 'reservas',
  
            //campo da tabela reservas que referencia um quarto
            foreignKey: 'quarto_id'
        })
    }
}

module.exports = Quarto