const express = require("express");
const userRouter = require("./src/routes/user");
const personRouter = require("./src/routes/person");
const Database = require("./src/database");
const ApiUser = require("./src/api/user");
const authMiddleware = require("./src/middleware/auth");

const app = express();
const porta = 3000;
app.use(express.json());

// login
app.post('/api/v1/login/', ApiUser.Login) // não precisa autenticar 

// create
app.post('/api/v1/user/', ApiUser.Create) // será usada sem token, não precisa autenticar 

// middleware authenticator here
app.use(authMiddleware)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/person', personRouter)

Database.db
    .sync({ force: false }) // caso for inserido um novo tipo de CRUD por exemplo, trocar para true, irá zerar as tables e recria-las
    .then((_) => {
      app.listen(porta, () => {
        console.log(`Server running on port ${porta}`)
      })
  })
  .catch((e) => {
    console.error(`Database connection failed:'${e}`)
  })
