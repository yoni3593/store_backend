const mongoose = require('mongoose');
const urlMongoDB = "mongodb+srv://yoniworkstore:PTH7Ek25UTv3fsPA@store.awucyjb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(urlMongoDB, { useNewUrlparser: true})
.then( () => console.log('connected to mongoDB'))
.catch( err => console.log(err));


mongoose.connection.on('error', err => {
    console.log(err);
});
