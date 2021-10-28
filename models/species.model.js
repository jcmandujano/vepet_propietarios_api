const { Schema, model } = require('mongoose');

const EspeciesSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String
    },
    img: {
        type: String
    },
    selected_img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Especie', EspeciesSchema);