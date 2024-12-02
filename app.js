const express = require('express');
const morgan = require('morgan');
const db = require('./config/db');
const path = require('path');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const courseRoutes = require('./routes/courseRoutes');
const isAuthenticated = require('./middleware/authMiddleware');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const session = require('express-session');
const courseDetailsRoute = require('./routes/courseDetailsRoute');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const router = express.Router();
// Express app
const app = express();

// Register view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Listen for requests
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Session middleware
app.use(session({
    secret: 'yu77353g5dggga7gh73hd3gfd',
    resave: false,
    saveUninitialized: true
}));

// Middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

// Initialize passport for handling authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to simulate a logged-in user (for testing purposes)
app.use((req, res, next) => {
    if (!req.session.user) {
       // Simulate a user logged in with ID '123'
       req.session.user = { id: '123' };
    }
    next();
 });

// Routes
router.use('/courses', courseRoutes);
router.use('/login', loginRoute);
router.use('/signup', signupRoute);
router.use('/course-details', courseDetailsRoute);
router.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('nonlogin', { title: 'Home' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up' });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/courses', (req, res) => {
    res.render('courses', { title: 'courses' });
});

app.get('/course-details/:slug', (req, res) => {
    const courseSlug = req.params.slug;
    // Fetch course details from the database or a data file
    const courseDetails = courses.find(course => course.slug === courseSlug);
    if (courseDetails) {
      res.render('course-details', { course: courseDetails });
    } else {
      res.status(404).send('Course not found');
    }
  });
  
app.get('/home', (req, res) => {
    res.render('home', { title: 'HOME' });
});

app.get('/courses/python-course', (req, res) => {
    res.render('python-course')
});
app.get('/courses/web-development', (req, res) => {
    res.render('web-development')
});

// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             console.error('Error logging out:', err);
//             return res.status(500).send('Unable to log out');
//         }
//         res.redirect('/login');
//     });
// });

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
