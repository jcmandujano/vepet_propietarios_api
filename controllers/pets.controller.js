const {response } = require ('express');
const Mascota = require('../models/pets.model');

//se crean las funciones que realizan la peticion al server
//se deben exportar las funciones creadas en module.exports como array

const readPets = async(req, res = response) => {
    //queremos los registros activos
    const query = {
        estado : true
    }
    //Buscamos en funcion del query
    const mascotas = await Mascota.find(query)
    //regresamos resultado
    res.json(mascotas)
}

const findPet = async(req,res=response) =>{
    const id = req.params.id;
     const query = {
        estado : true
    }

    const mascota = await Mascota.findById(id).where(query);

    res.json(mascota)
}

const updatePet = async(req, res = response) => {
    
    const id = req.params.id;
    const {propietario, ...petData} = req.body;

    const mascota = await Mascota.findByIdAndUpdate(id,petData)

    res.json(mascota)
}

const createPets = async(req, res = response) => {
    
    const body = req.body;
    const mascota = new Mascota(body);

    await mascota.save();

    res.json(mascota)
}

const deletePet = async(req, res = response) => {
    const { id } = req.params

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //logicamente lo borramos
    const mascota = await Mascota.findByIdAndUpdate(id, {estado: false})
    res.json({
        respuesta:'El registro se borro correctamente'
    })
}

module.exports = {
    readPets,
    updatePet,
    createPets,
    deletePet,
    findPet
}