const ServicePerson = require("../services/person")

class ApiPerson {

async FindAll(_, res) {
    try {
        const result = await ServicePerson.FindAll()

        res.status(200).send({ result })
      } catch (e) {
        res.status(500).send({ error: e.message })
      }
  }

async FindById(req, res) {
      try {
          const { id } = req.params
          const result = await ServicePerson.FindById(id)

          res.status(200).send({ result })
      } catch (e) {
          res.status(500).send({ message:e.error })
      } 
  }

async Create(req, res) { // a função é async e o metodo é await devido ao tempo de resposta que o bd precisa ter para executar o comando
      try{
          const { name, address, userId } = req.body
          await ServicePerson.Create( name, address, userId ) // metodo que for consultar no banco informar que é async, e o await para aguardar a execução do comando

          res.status(201).send({ result: "Person created"})
        } catch (e) {
        res.status(500).send({ error: e.message })
        }
  }

async Update(req, res) {
      try {
          const { id } = req.params
          const { name, address } = req.body
          ServicePerson.Update(id, name, address)

          const result = ServicePerson.FindById(id)

          res.status(200).send({ result })  
      } catch (e) {
          res.status(500).send({ error: e.message })
      }
  }

async Delete(req, res) {
      try {
          const { id } = req.params
          await ServicePerson.Delete(id)

          res.status(200).send({ result: `Person ${id} deleted`})
      } catch (e) {
          res.status(500).send({ error: e.message })
      }
  } 

}

module.exports = new ApiPerson();