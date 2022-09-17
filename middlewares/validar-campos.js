const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next ) => {
    // console.log('validarCampos.req.body..');
    // console.log(req.body);

    const errores = validationResult( req );
    console.log('req.errores..', errores);

    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}
