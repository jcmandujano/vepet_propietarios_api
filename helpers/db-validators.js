const  Role  = require('../models/role')
const Usuario = require('../models/user.model');

const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en BD`)
    }
} 

const emailDisponible = async(email='')=>{
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo:email})
    if(existeEmail){
        throw new Error(`El email ya esta registrado`)
    }
}

const existeIdUsuario = async(id)=>{
    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id de usuario no existe`)
    }
}



module.exports = {
    esRolValido,
    emailDisponible,
    existeIdUsuario
}