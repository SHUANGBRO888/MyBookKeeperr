const express = require('express');
const User = require('../models/User');

const router = express.Router();

// USer login API;
router.post('/login', async (req, res) => {
    try {
        const result = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if (result) {
            res.send(result)
        } else res.status(500).json('error');

    } catch (error) {
        res.status(500).json(error);
    }
});



// Sign up USer API;
router.post('/register', async (req, res) => {
    try {
        const newuser = new User(req.body);
        await newuser.save();
        res.send('New User Created successfully')
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
