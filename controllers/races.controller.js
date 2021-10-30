const { response } = require('express');
const Raza = require('../models/races.model');

const readRaces = async(req, res = response) => {
    const query = {
        estado: true
    }
    const razas = await Raza.find(query)

    res.json(razas)
}

const findRace = async(req, res = response) => {
    const id = req.params.id;
    const query = {
        estado: true
    }

    const raza = await Raza.findById(id).where(query);

    res.json(raza)
}

const updateRace = async(req, res = response) => {
    const id = req.params.id;
    const { propietario, ...raceData } = req.body;

    const raza = await Raza.findByIdAndUpdate(id, raceData)

    res.json(raza)
}

const createRaces = async(req, res = response) => {
    const body = req.body;
    const raza = new Raza(body);

    await raza.save();

    res.json(raza)
}

const deleteRace = async(req, res = response) => {
    const { id } = req.params;

    await Raza.findByIdAndUpdate(id, { estado: false })
    res.json({
        respuesta: 'El registro se borro correctamente'
    })
}

module.exports = {
    readRaces,
    updateRace,
    createRaces,
    deleteRace,
    findRace
}