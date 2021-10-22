const  Role  = require('../models/role')
const Usuario = require('../models/user.model');
const Mascota = require('../models/pets.model')

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
    //verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id de usuario no existe`)
    }
}

const existeIdMascota = async(id)=>{
    //verificar si existe la mascota y que no este eliminada
    const query = {
        estado : true
    }

    const existeMascota = await Mascota.findById(id).where(query)
    if(!existeMascota){
        throw new Error(`El id de esta mascota no existe`)
    }
}


module.exports = {
    esRolValido,
    emailDisponible,
    existeIdUsuario,
    existeIdMascota
}