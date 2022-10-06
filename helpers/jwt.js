const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        };
    
        //JWT_SECRET is a constant in .env file
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '120h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
    
        });

    });

}


module.exports = {
    generarJWT,
}