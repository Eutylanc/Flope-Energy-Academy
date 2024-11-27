const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For securely comparing hashed passwords
const db = require('../config/db'); // Import your database configuration
const mysql = require('mysql2/promise');


// Render the login page
router.get('/login', (req, res) => {
    const redirect = req.query.redirect || '/'; // Default redirect to '/courses'
    res.render('login', { redirect });
});

// Handle login submission
router.post('/login', async (req, res) => {
    const { username, password, redirect } = req.body;
 
    try {
       // Ensure getUserByUsername is defined
       const user = await getUserByUsername(username);
 
       if (user && (await bcrypt.compare(password, user.password))) {
          // Successful login
          req.session.user = { username: user.username }; // Store user session
 
          // Redirect to the intended page (default to "/courses")
          res.redirect(redirect || '/courses');
       } else {
          // Invalid credentials
          res.status(401).send('<h1>Invalid Username or Password. <a href="/login">Try again</a></h1>');
       }
    } catch (error) {
       console.error('Login error:', error);
       res.status(500).send('<h1>Server error. Please try again later.</h1>');
    }
 });
 
// Export the router
module.exports = router;
