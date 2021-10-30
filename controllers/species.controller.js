const { response } = require('express');
const Especie = require('../models/species.model');

const readSpecies = async(req, res = response) => {
    const query = {
        estado: true
    }
    const especies = await Especie.find(query)

    res.json(especies)
}

const findSpecie = async(req, res = response) => {
    const id = req.params.id;
    const query = {
        estado: true
    }

    const especie = await Especie.findById(id).where(query);

    res.json(especie)
}

const updateSpecie = async(req, res = response) => {

    const id = req.params.id;
    const { propietario, ...specieData } = req.body;

    const espcie = await Especie.findByIdAndUpdate(id, specieData)

    res.json(espcie)
}

const createSpecies = async(req, res = response) => {

    const body = req.body;
    const especie = new Especie(body);

    await especie.save();

    res.json(especie)
}

const deleteSpecie = async(req, res = response) => {
    const { id } = req.params;

    await Especie.findByIdAndUpdate(id, { estado: false })
    res.json({
        respuesta: 'El registro se borro correctamente'
    })
}

module.exports = {
    readSpecies,
    updateSpecie,
    createSpecies,
    deleteSpecie,
    findSpecie
}