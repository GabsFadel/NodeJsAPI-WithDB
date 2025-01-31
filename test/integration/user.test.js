const serviceUser = require("../../src/services/user");

describe("teste de usuario", () => {

  it("should create new user", async () => {
      const user = {
          email: "teste@teste.com",
          password: "123456"
      } 

      const addUser = await serviceUser.Create(user.email, user.password)
      console.log(addUser)

      expect(addUser.email).toBe(user.email)
      expect(addUser.password).toBe(user.password)
    })
})
