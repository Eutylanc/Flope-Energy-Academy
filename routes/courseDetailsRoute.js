const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authMiddleware');

// GET route to serve the course details form
router.get('/course-details', checkAuthenticated, (req, res) => {
    res.render('course-details'); // Render the course details form view
});

// POST route to handle form submission
router.post('/submit-course-details', checkAuthenticated, (req, res) => {
    const { courseName, courseInstructor, courseDescription, courseDuration, coursePrice } = req.body;

    // Validation (could be expanded as needed)
    if (!courseName || !courseInstructor || !courseDescription || !courseDuration || !coursePrice) {
        return res.status(400).send('All fields are required.');
    }

    // Process form data (e.g., save to database)
    // Dummy response for now
    res.status(200).send('Course details submitted successfully.');
});

module.exports = router;
