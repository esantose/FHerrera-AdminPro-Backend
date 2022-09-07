const mongoose = require('mongoose');
const dbConnection = async() => {

    try {
        const conn = 'mongodb+srv://easantose:Miperu1808@cluster0.7wzjb2o.mongodb.net/DBHospital';
        console.log('conn: ' + process.env.DB_CNN);

        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true
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