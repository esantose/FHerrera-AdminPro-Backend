const fs = require('fs');

const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen1 = ()=> {
    console.log('Vamos bien...');
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitals/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;
        
        case 'users':

            const user = await User.findById(id);
            console.log(user);
            if ( !user ) {
                console.log('No es un user por id');
                return false;
            }

            pathViejo = `./uploads/hospitals/${ user.img }`;
            borrarImagen( pathViejo );

            user.img = nombreArchivo;
            console.log('nombreArchivo..', nombreArchivo);
            await user.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
