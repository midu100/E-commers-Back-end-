const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const dbConfig = ()=>{
    return mongoose.connect(process.env.DB_STRING)
         .then(() => console.log('DB Connected!'));
}

module.exports = dbConfig