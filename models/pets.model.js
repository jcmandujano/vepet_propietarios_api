const {Schema, model} = require('mongoose');

const MascotasSchema = Schema({
    propietario:{
        type:String
    },
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    especie:{
        type:String,
        required:[true,'La Epecie es obligatoria']
    },
    nombre_comun:{
        type:String
    },
    nombre_cientifico:{
        type:String
    },
    raza_objetiva:{
        type:String
    },
    raza_subjetiva:{
        type:String,
        required:[true,'La Raza es obligatoria']
    },
    edad:{
        type:String,
        required:[true,'La Edad es obligatoria']
    },
    sexo:{
        type:String,
        required:[true,'El Sexo es obligatoria'],
        enum:['MACHO','HEMBRA', 'INDEFINIDO']
    },
    castrado:{
        type:Boolean,
        required:[true,'La información de esterilizacion es obligatoria'],
    },
    personalidad:{
        type:String,
        required:[true,'La personalidad es obligatoria'],
    },
    avatar:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true
    }
})

module.exports = model('Mascota',MascotasSchema);