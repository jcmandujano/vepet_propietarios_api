const Server = require('./models/server');

require('dotenv').config();
const server = new Server();
//llama al metodo listen de nuestro server para iniciar el servidor nodejs
server.listen();