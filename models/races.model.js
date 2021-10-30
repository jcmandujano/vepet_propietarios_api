const { Schema, model } = require('mongoose');

const RacesSchema = Schema({
    raza: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    especie: {
        type: String,
        required: [true, 'La raza es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Razas', RacesSchema);