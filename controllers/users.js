const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const user = require('../models/user');


const getUsers = async(req, res) => {

    //Postman = http://localhost:3000/api/users?desde=8
    // const users = await User.find({}, 'nombre email role google');

    // res.json({
    //     ok: true,
    //     users
    // });

    //===========================

    // const desde = Number(req.query.desde) || 0;
    // const users = await User
    //     .find({}, 'nombre email role google')
    //     .skip( desde)
    //     .limit (2);
    // console.log (desde);
    // const total = await user.count();

    //=====================================
    //Promise ejecutara ambos requiriemntos a la misma vez
    const desde = Number(req.query.desde) || 0;
    const [ users, total ] = await Promise.all([
        User
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        total
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
    
    
        // Guardar user
        await user.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( user.id );

        res.json({
            ok: true,
            user,
            token
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

    const { nombre, email, role} = req.body;
    console.log('actualizarUser-nombre..' + nombre);
    console.log('actualizarUser-email..' + email);
    console.log('actualizarUser-role..' + role);

    try {

        const userDB = await User.findById( uid );
        console.log('userDB..' + userDB);

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }

        // Actualizaciones
        //Remove fields: password, google
        const { password, google, email, ...campos } = req.body;

        if ( userDB.email !== email ) {

            const existeEmail = await User.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un  con ese email'
                });
            }
        }
        
        campos.email = email;
        const userActualizado = await User.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            user: userActualizado
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

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }

        await User.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'User eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            err: error
        });

    }


}

module.exports = {
    getUsers,
    crearUser,
    actualizarUser,
    borrarUser
}