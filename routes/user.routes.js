const { Router } = require('express')
const { check } = require('express-validator')
const { getUsers, postUsers, putUsers, deleteUsers, findUser } = require('../controllers/users.controller')
const { validarCampos } = require('../middlewares/validar-campos')
const  {esRolValido, emailDisponible, existeIdUsuario } = require('../helpers/db-validators')
const { validateJWT } = require('../middlewares/jwt-validator')

const router = Router()

router.get('/',[
    validateJWT
], getUsers) 

router.get('/:id',[
    validateJWT
], findUser)

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    validateJWT,
    validarCampos
], putUsers)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe contener al menos 6 caracteres').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailDisponible),
    check('rol').custom(esRolValido),
    // validateJWT,
    //check('rol','El rol ingresado no es valido').isIn(['ADMIN_ROL','PROPIETARIO_ROL', 'MEDICO_ROL']),
    validarCampos // custom middleware
] ,postUsers) 

router.delete('/:id',[
    validateJWT,
] ,deleteUsers) 

 module.exports = router