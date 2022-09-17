const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { genolderarJWT } = require('../helpers/jwt');

//XXX to remove after 
//const { validationResult } = require('express-validator')


const getUsers = async(req, res) => {

    const users = await User.find({}, 'nombre email role google');

    res.json({
        ok: true,
        users
    });

}


const crearUser = async(req, res = response) => {
    console.log('crearUser-req.body..', req.body);
    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await user.save();

        // Generar el TOKEN - JWT
        //const token = await generarJWT( user.id );

        res.json({
            ok: true,
            user
            //token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const actualizarUser = async (req, res = response) => {

    const uid = req.params.id;
    console.log('actualizarUser-uid..' + uid);

    try {

        const userDB = await User.findById( uid );
        console.log('userDB..' + userDB);

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const campos = req.body;
        console.log('campos..' + req.nombre);
        if ( userDB.email === req.body.email ) {
            delete campos.email;
        }

        delete campos.password;
        delete campos.google;


        const userActualizado = await User.findByIdAndUpdate( uid, campos, {  new: true});
        //const userActualizado = await User.findByIdAndUpdate( { _id: uid }, { $set: campos}, {  new: true});
        console.log('userActualizado..' + userActualizado);

        res.json({
            ok: true,
            user: userActualizado
            //token
        });        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}



const borrarUser = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getUsers,
    crearUser,
    actualizarUser,
    borrarUser
}