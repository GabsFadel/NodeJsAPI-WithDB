const database = require("../database");

class Person {
    constructor() { // método constructor é chamado sempre para poder inicializar o serviço do banco com a aplicação
        this.model = database.db.define("people", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            address: {
                type: database.db.Sequelize.STRING,
                unique: true
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            }
          })
        }
    }

module.exports = new Person().model;