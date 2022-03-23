const { Router } = require('express')
const { check } = require('express-validator')
const { readRaces, findRace, updateRace, createRaces, deleteRace } = require('../controllers/races.controller')
const { existeIdRaza } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/jwt-validator')

const router = Router()

router.get('/', readRaces);

router.get('/:id', findRace);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeIdRaza),
    validarCampos
], updateRace);

router.post('/', [
    validateJWT,
    check('raza', 'El nombre es obligatorio').not().isEmpty(),
    check('especie', 'El identificador de la raza es obligatorio').not().isEmpty(),
    validarCampos
], createRaces);

router.delete('/:id', deleteRace)

module.exports = router