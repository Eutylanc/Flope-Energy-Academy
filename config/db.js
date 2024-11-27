const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Run a query to check if the connection is successful
db.query('SELECT ()', (err, result) => {
    if (err) {
        console.error('Error in query:', err);
        return;
    }
    console.log('Currently connected to database:', result[0]['DATABASE()']);
});


module.exports = db;