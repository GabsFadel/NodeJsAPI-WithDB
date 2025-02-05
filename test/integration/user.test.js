const database = require("../../src/database");
const serviceUser = require("../../src/services/user");

describe("teste de usuario", () => {

  //abre o begin tran dentro do banco para realizar o teste 
  beforeAll(async () => {
      this.transaction = await database.db.transaction()
  })
  //no final do teste faz um rollback para não comitar os dados feitos no teste
  afterAll(() => {
      this.transaction.rollback()
  })

  it("should create new user", async () => {
      const user = {
          id: this.id, 
          email: "emailteste@gmail.com",
          password: 582465135
      } 

      //esta enviando a transação para o serviço de criação 
      const addUser = await serviceUser.Create(user.email, user.password, this.transaction)
      this.id = addUser.id

      expect(addUser.email).toBe(user.email)
      expect(addUser.password).toBe(user.password)
    })

    it("Should update an user", async () => {
      const user = {
          id: this.id, 
          email: "emailupdate@gmail.com",
          password: 582465135
      }

      const updateUser = await serviceUser.Update(user.id, user.email, user.password, this.transaction)

      expect(updateUser.email).toBe(user.email)
      expect(updateUser.password).toBe(user.password)
    })

    it("Should delete an user", async () => {
      const user = {
        id: this.id,
      }

      const response = await serviceUser.Delete(user.id, this.transaction)

      expect(response).toBe(true)
    })
  })
