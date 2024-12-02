const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const mysql = require('mysql2/promise');

// Configure the MySQL connection pool

const dbConfig = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.post('/signup', async (req, res) => {
    const { name, email, username, course, password, "Confirm Password": confirmPassword } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert user data
        const sql = 'INSERT INTO users (name, email, username, course, password) VALUES (?, ?, ?, ?, ?)';

        // Use a connection pool to execute the query
        const pool = mysql.createPool(dbConfig);

        try {
            const [result] = await pool.query(sql, [name, email, username, course, hashedPassword]);

            console.log('User registered successfully with ID:', result.insertId);

            // Redirect to the login page
            res.redirect('/login');
        } catch (err) {
            console.error('Error inserting user into database:', err);

            // Handle duplicate email or username error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Email or username already exists');
            }

            return res.status(500).send('Internal Server Error');
        }
    } catch (err) {
        console.error('Error during signup process:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
