const person = require("../model/person");
const user = require("../model/user");

class ServicePerson {
  async FindAll() {
      return person.findAll();
  }

  FindById(id) {
      return person.findByPk(id, { include: { model: user } });
  } 

  async Create(name, address, userId) { // promise -> promeça que será executada a ação de insert dentro do banco a partir do metodo, é async 
    if(!name) {
      throw new Error("Name is required")
    } else if (!address) {
      throw new Error("Address is required")
    } else if (!userId) {
      throw new Error("UserId is required")
    }

    await person.create({
      name, address, userId
    })
  }

  async Update(id, name, address) {
    const oldperson = await person.findByPk(id)

    oldperson.name = name || oldperson.name
    oldperson.address = address || oldperson.address

    oldperson.save()

    return oldperson
  }

  async Delete(id) {
      const oldperson = await person.findByPk(id)
      oldperson.destroy()
  }
}

module.exports = new ServicePerson();