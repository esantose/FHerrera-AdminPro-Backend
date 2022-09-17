const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {
    try {

        res.json({
            ok: true,
            msg: 'Hola Login'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const loginOld = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( userDB.id );


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {
    login
}
