const router = require('express').Router();
const User = require('../models/User');


router.post('/signup', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.create({ firstName, lastName, email, password });
        res.json( user )
    } catch (e) {
        if(e.code === 11000) return res.status(400).send('Email already exists');
        res.status(400).send(e.message) 
    }
});

//login
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.json( user )
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//get user
router.get('/', async(req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders');
        res.json( users )
    } catch (e) {
        res.status(400).send(e.message);
    }
});

//get user order
router.get('/:id/orders', async(req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id).populate('orders');
        res.json(user.orders);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

router.post('/:id/updateNotifications', async(req, res) => {
    const {id} =req.params;
    try {
        const user = await User.findById(id);
        user.notifications.forEach((notif) => {
            notif.status = "read";            
        });
        user.markModified('notifications');
        await User.save();
        res.status(200).send();
    } catch (e) {
        res.status(400).json(e.message);
        
    }
});

module.exports = router;