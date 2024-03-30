const mongoose = require('mongoose');



const connection = mongoose.connection;

connection.on('error', (err) => console.log(err));
connection.on('connected', () => console.log('MongoDB connected!'));

//FbI3sgIlFVC14KDQ