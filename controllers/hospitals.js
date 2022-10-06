const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitals = async(req, res = response) => {

    const hospitals = await Hospital.find()
                                    .populate('user','nombre email img');

    res.json({
        ok: true,
        hospitals
    })
}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ 
        user: uid,
        ...req.body 
    });

    try {
        
        const hospitalDB = await hospital.save();
        

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}



module.exports = {
    getHospitals,
    crearHospital,
    actualizarHospital,
    borrarHospital
}