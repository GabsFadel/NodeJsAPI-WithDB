const {  Sequelize } = require('sequelize')
require ('dotenv').config()

class Database {
    constructor() {
        this.init();
    }

//para puxar as informações do DB é usado letra maíuscula por padronização de empresas
    init() {
        this.db = new Sequelize({
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            dialect: "mysql",
            password: process.env.DB_PASSWORD
        })
    }
}

module.exports = new Database();