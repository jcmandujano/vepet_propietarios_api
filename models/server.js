const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port =  process.env.PORT
        this.authPath = '/api/auth'
        this.usersRoute = '/api/users'
        this.petsRoute = '/api/pets'
        this.speciesRoute = '/api/species'
            //db connetion
        this.connectDb();
        //Middlewares section
        this.middlewares()
            //Rutas de mi aplicacion
        this.routes()
    }

    async connectDb() {
        await dbConnection()
    }

    middlewares() {
        //Directorio Publico
        this.app.use(express.static('public'))
            //CORS
        this.app.use(cors())
            //Parsear el body usando body parser
        this.app.use(bodyParser.json()); // body en formato json
        this.app.use(bodyParser.urlencoded({ extended: false })); //body formulario
    }

    //creamos via express las rutas al endpoint y asignamos las operaciones deseadas
    routes(){
        this.app.use(this.authPath,require('../routes/auth.routes'))
        this.app.use(this.usersRoute,require('../routes/user.routes'))
        this.app.use(this.petsRoute,require('../routes/pets.routes'))
        this.app.use(this.speciesRoute, require('../routes/species.routes'))

    }

    //iniciamos el rest server por el puerto configurado en environment
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server