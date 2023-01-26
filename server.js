require('dotenv').config();
require('./connection')
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const PORT = process.env.PORT;
const io = new Server(server, {
    cors: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
});

const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const imageRoutes = require('./routes/imageRoutes');
const stripe = require('stripe')(process.env.STRIPE_SECRET);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes)
app.use('/orders', orderRoutes);
app.use('/images/', imageRoutes);
app.use('/products', productRoutes);

app.post('/create-payment', async(req, res) => {
    const {amount} = req.body;
    try {
       const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
       });
       res.status(200).json(paymentIntent)
    } catch (e) {
        res.status(400).json(e.message)
    }
});

server.listen( PORT, () => {
    console.log(`server running at port ${PORT}`);
});

app.set('socketio', io);