const express = require('express')
const app = express();

const { config } = require('./config/index')

const usersApi = require('./routes/users')

app.use(express.json())

usersApi(app)

app.listen(3000, function(){
    console.log(`Escuchando en http://localhost:${config.port}`)
});