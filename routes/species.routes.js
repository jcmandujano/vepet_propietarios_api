const { Router } = require('express')
const { check } = require('express-validator')
const { readSpecies, findSpecie, updateSpecie, createSpecies, deleteSpecie } = require('../controllers/species.controller')
const { existeIdEspecie } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/jwt-validator')

const router = Router()

router.get('/', readSpecies)

router.get('/:id', findSpecie)

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeIdEspecie),
    validarCampos
], updateSpecie)

router.post('/', [
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createSpecies)

router.delete('/:id', deleteSpecie)

module.exports = router