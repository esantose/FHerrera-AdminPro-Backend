/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsers, crearUser, actualizarUser, borrarUser } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//router.get( '/', validarJWT , getUsers );

router.get( '/', getUsers);
// router.get( '/', (req, res) => {
//     res.json({
//       ok: true,
//       users: []
//     });
// });

//router.post( '/', crearUser);

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUser 
);

router.put( '/:id',
    [
         check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUser
);

router.delete( '/:id',
    validarJWT,
    borrarUser
);



module.exports = router;