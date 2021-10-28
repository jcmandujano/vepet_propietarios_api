const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/user.model');

const validateJWT = async (req=request, res=response, next) =>{

    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            msg:'No se pudo leer el token'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.status(401).json({
                msg:"Usuario no existe"
            })
        }

        //verificar si el usuario es activo
        if(!usuario.estado){
            return res.status(401).json({
                msg:"Usuario no existe "
            })
        }

        req.usuario = usuario
        next();
        
    } catch (error) {
        console.log('ERROR',error)
        res.status(401).json({
            msg:'token no valido'
        })
    }
    

}

module.exports={
    validateJWT
}