const user = require("../model/user");
const jwt = require("jsonwebtoken")

const secretKey = "MyS&ecretKe!"

class ServiceUser {
  async FindAll(transaction) {
      return user.findAll({transaction});
  }

  async FindById(id, transaction) {
      return user.findByPk(id, {transaction});
  } 

  async Create(email, password, transaction) { // promise -> promeça que será executada a ação de insert dentro do banco a partir do metodo, é async 
      if (!email) {
      throw new Error("Email is required")
    } else if (!password) { 
      throw new Error("Password is required")
    }

    return user.create({
      email, password 
    }, { transaction })
  }

  async Update(id, email, password, transaction) {
    const oldUser = await this.FindById(id, transaction)

    oldUser.email = email || oldUser.email
    oldUser.password = password || oldUser.password

    oldUser.save({ transaction })

    return oldUser
  }

  async Delete(id, transaction) {
      const oldUser = await this.FindById(id, transaction)

      oldUser.destroy({ transaction })

      return true 
  }

  async Login(email, password) {
      if(!email) {
        throw new Error("Email is required")
      } else if (!password) {
        throw new Error("Password is required")
      }

      const currentUser = await user.findOne({ where: { email } })

      if(!currentUser) {
        throw new Error("Email or password is invalid#01")
      }

      if(password === currentUser.password) {
        return jwt.sign({ id: currentUser.id }, secretKey, { expiresIn: 60 * 60})
      }

      throw new Error("Email or password is invalid#02")
    }
}

module.exports = new ServiceUser();