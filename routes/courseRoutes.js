const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust path if necessary
const isAuthenticated = require('../middleware/authMiddleware');

// Example route
router.post('/course', (req, res) => {
    const { course } = req.body;
    const query = `INSERT INTO selected_courses (course_name) VALUES (?)`;
    db.query(query, [course], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving course to database');
        }
        res.status(200).send('Course saved successfully');
    });
});

// Export the router correctly
module.exports = router;
