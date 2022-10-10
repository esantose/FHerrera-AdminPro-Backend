/*
    Hospitals
    ruta: '/api/hospitals'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitals,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitals')


const router = Router();

router.get( '/', getHospitals );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearHospital 
);

// router.put( '/:id',
//     [],
//     actualizarHospital
// );

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

router.delete( '/:id',
    borrarHospital
);



module.exports = router;
