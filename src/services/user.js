const user = require("../model/user");

class ServiceUser {
  async FindAll() {
      return user.findAll();
  }

  FindById(id) {
      return user.findByPk(id);
  } 

  async Create(email, password) { // promise -> promeça que será executada a ação de insert dentro do banco a partir do metodo, é async 
      if (!email) {
      throw new Error("Email is required")
    } else if (!password) { 
      throw new Error("Password is required")
    }

    return user.create({
      email, password 
    })
  }

  async Update(id, email, password) {
    const oldUser = await user.findByPk(id)

    oldUser.email = email || oldUser.email
    oldUser.password = password || oldUser.password

    oldUser.save()

    return oldUser
  }

  async Delete(id) {
      const oldUser = await user.findByPk(id)
      oldUser.destroy()
  }
}

module.exports = new ServiceUser();