const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Set up a MySQL connection pool
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// User model for basic operations
const User = {
    async createUser(email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [rows] = await db.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword]);
            return rows;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    async findUserByEmail(email) {
        try {
            const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    },

    async verifyPassword(inputPassword, storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
};

module.exports = User;
