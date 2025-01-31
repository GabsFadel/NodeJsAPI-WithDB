const ServiceUser = require("../services/user")

class ApiUser {

async FindAll(_, res) {
    try {
        const result = await ServiceUser.FindAll()

        res.status(200).send({ result })
      } catch (error) {
        res.status(500).send({ error })
      }
  }

async FindById(req, res) {
      try {
          const { id } = req.params
          const result = await ServiceUser.FindById(id)

          res.status(200).send({ result })
      } catch (error) {
          res.status(500).send({ error })
      } 
  }

async Create(req, res) { // a função é async e o metodo é await devido ao tempo de resposta que o bd precisa ter para executar o comando
      try{
          const { email, password } = req.body
          await ServiceUser.Create( email, password ) // metodo que for consultar no banco informar que é async, e o await para aguardar a execução do comando

          res.status(201).send({ result: "User created"})
        } catch (e) {
        res.status(500).send({ error: e.message })
        }
  }

async Update(req, res) {
      try {
          const { id } = req.params
          const {  email, password } = req.body
          ServiceUser.Update(id, email, password)

          const result = ServiceUser.FindById(id)

          res.status(200).send({ result })  
      } catch (e) {
          res.status(500).send({ error: e.message })
      }
  }

async Delete(req, res) {
      try {
          const { id } = req.params
          await ServiceUser.Delete(id)

          res.status(200).send({ result: `User ${id} deleted`})
      } catch (e) {
          res.status(500).send({ error: e.message })
      }
  } 

}

module.exports = new ApiUser();