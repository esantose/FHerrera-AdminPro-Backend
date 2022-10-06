/*

    ruta: api/todo/
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');


const router = Router();


router.get('/:busqueda', validarJWT , getTodo );


//http://localhost:3000/api/todo/coleccion/medicos/e
router.get('/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColeccion );



module.exports = router;