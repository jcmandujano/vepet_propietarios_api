const {response } = require ('express');
const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

//se crean las funciones que realizan la peticion al server
//se deben exportar las funciones creadas en module.exports como array

const getUsers = async(req, res = response) => {
    const query = {
        estado : true
    }

    const usuarios = await Usuario.find(query)

    res.json(usuarios)
}

const findUser = async(req,res=response) =>{
    const id = req.params.id;
     const query = {
        estado : true
    }

    const usuario = await Usuario.findById(id).where(query);

    res.json(usuario)
}


const putUsers = async(req, res = response) => {
    const id = req.params.id;
    const {password, ...userInfo} = req.body;

    if(password){ //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        userInfo.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,userInfo)

    res.json(usuario)
}

const postUsers = async(req, res = response) => {
    
    const body = req.body;
    const usuario = new Usuario(body);

    //encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt)

    await usuario.save();

    res.json(usuario)
}

const deleteUsers = async(req, res = response) => {
    const { id } = req.params

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //logicamente lo borramos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json(usuario)
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    findUser
}