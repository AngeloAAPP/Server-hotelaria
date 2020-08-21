
//Arquivo contendo todas as configurações de acesso ao banco de dados

require("dotenv").config()

module.exports = {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },    
    define: {
        timestamps:true,
    }
}

