const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    apellido_paterno:{
        type:String,
        required:[true,'El apellido paterno es obligatorio']
    },
    apellido_materno:{
        type:String,
        required:[true,'El apellido materno es obligatorio']
    },
    sexo:{
        type:String,
        enum:['MASCULINO','FEMENINO', 'INDEFINIDO']
    },
    fecha_nacimiento:{
        type:Date
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio']
    },
    password:{
        type:String,
        required:[true,'El password es obligatorio']
    },
    ciudad:{
        type:String
    },
    colonia:{
        type:String
    },
    cp:{
        type:String
    },
    calle:{
        type:String
    },
    no_ext:{
        type:String
    },
    no_int:{
        type:String
    },
    avatar:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROL','PROPIETARIO_ROL', 'MEDICO_ROL']
    },
    estado:{
        type:Boolean,
        default:true
    }
})


UsuarioSchema.methods.toJSON= function(){
    const {__v, password,_id, ...usuario} = this.toObject();
    usuario.uid=_id
    return usuario
}

module.exports = model('Usuario',UsuarioSchema);