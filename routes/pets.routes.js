const { Router } = require('express')
const { check } = require('express-validator')
const {createPets, findPet, updatePet, deletePet, readPets} = require('../controllers/pets.controller')
const { existeIdMascota} = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/jwt-validator')

const router = Router()

router.get('/',[
    validateJWT
], readPets)

router.get('/:id',[
    validateJWT
], findPet)

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeIdMascota),
    validateJWT,
    validarCampos,
], updatePet)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('especie','La especie es obligatoria').not().isEmpty(),
    check('raza_subjetiva','La raza es obligatoria').not().isEmpty(),
    check('edad','La edad es obligatoria').not().isEmpty(),
    check('sexo','El sexo es obligatorio').not().isEmpty(),
    check('castrado','La información de esterilización es obligatoria').not().isEmpty(),
    check('personalidad','La personalidad es obligatoria').not().isEmpty(),
    check('sexo','El sexo ingresado no es valido').isIn(['MACHO','HEMBRA', 'INDEFINIDO']),
    validateJWT,
    validarCampos
], createPets)

router.delete('/:id',[
    validateJWT
],deletePet)

module.exports = router