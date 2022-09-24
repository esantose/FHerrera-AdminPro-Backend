const mongoose = require('mongoose');
const dbConnection = async() => {

    try {
        console.log('conn: ' + process.env.DB_CNN);

        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true
            //useCreateIndex: true
        });

        console.log('DB Online connected');
        
    } catch (error) {
        console.log('HORROR..' + error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}

module.exports = {
    dbConnection
}