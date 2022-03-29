const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user.model');
const { generateJWT } = require("../helpers/jwt-generator");
const { transporter } = require("../helpers/mailer");

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
        });

        //Manda correo electronico
        let infoMail = await transporter.sendMail({
            from: '"Ingreso con exito" <info@vepet.com>',
            to: correo, // email send
            subject: "Inicio de sesión exitoso",
            html: "<h1>Bienvenido</h1><hr><p>Acabas de iniciar sesión exitosamente</p>", // html body
        });

        console.log(infoMail.messageId);

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