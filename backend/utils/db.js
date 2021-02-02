const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const connectbd = async () =>{
try {
    await mongoose.connect(process.env.DB_MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true})
        console.log('Conexión realizada correctamente');
} catch (error) {
    console.log(error);
    process.exit(1); // Detener la app
}
}

module.exports = connectbd;