const mongoose = require('mongoose');
const urlMongoDB = process.env.MONGODB_URL ;

mongoose.connect(urlMongoDB, { useNewUrlparser: true})
.then( () => console.log('connected to mongoDB'))
.catch( err => console.log(err));


mongoose.connection.on('error', err => {
    console.log(err);
});