const {Model, DataTypes} = require('sequelize')

class Cargo extends Model{

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
            ramal: {
                type: DataTypes.STRING,
                allowNull: false,
                
            },
        },{
            sequelize,
            tableName: 'cargos'
        })
    }

    /**
     * Método que quando for chamado associará o model com outros models(Definirá relacionamentos), sendo chamado depois que todos os models forem inicializados
     * @param models a lista de models inicializados
     */
    static associate(models){

        //Associa com o funcionario
        this.belongsToMany(models.Funcionario, {

          //nome que daremos pro relacionamento, será usado futuramente nas rotas
          as : 'funcionario',

          //campo da tabela funcionario que referencia um cargo
          foreignKey: 'cargo_id'
        })
    }
}

module.exports = Cargo