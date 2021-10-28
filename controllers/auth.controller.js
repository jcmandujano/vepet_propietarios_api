const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user.model');
const { generateJWT } = require("../helpers/jwt-generator");

const login = async (req, res= response) =>{ 
    const { correo, password } = req.body;
    try {

        //verificar si el usuario existe
        const user = await Usuario.findOne({correo})
        if(!user){
            return tres.status(400).json({
                msg:'Usuario / Password no son correctos'
            })
        }

        //verificar si el usuario esta activo
        if(!user.estado){
            return res.status(400).json({
                msg:'El usuario no esta registrado'
            })
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos'
            })
        }
        //generar JWT
        const token = await generateJWT(user.id)
        res.json({
           user,
           token
        })
    } catch (error) {
        console.log('ERROR',error)
        return res.status(500).json({
            msg:'Ocurrio el siguiente error ',
            err:error
        })
    }
    
}

module.exports = {
    login
}