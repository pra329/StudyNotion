const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log('Database Connection Successfull'))
    .catch((error)=>{
        console.log(error);
        console.error('Error Occured In Connection With The Database');
        process.exit(1);
    })
}

module.exports = dbConnect;