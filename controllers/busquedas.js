const { response } = require('express');

const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    // const [ users] = await Promise.all([
    //     User.find({ nombre: regex })

    // ]);

    // res.json({
    //     ok: true,
    //     users
    //  }) 

    // Promise will execute at the same time: user.find, Medico.find, Hospital.find
    const [ users, medicos, hospitals ] = await Promise.all([
        User.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        users,
        medicos,
        hospitals
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    //http://localhost:3000/api/todo/coleccion/medicos/e
    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );
 
    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('user', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;

        case 'hospitals':
            data = await Hospital.find({ nombre: regex })
                                    .populate('user', 'nombre img');
        break;

        case 'users':
            data = await User.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser users/medicos/hospitals'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}

