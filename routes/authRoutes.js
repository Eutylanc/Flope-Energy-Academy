const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

// Route for user registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        await User.createUser(email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for user login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/courses',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
