
// middleware/authMiddleware.js
const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.user) {
      return next();
    }
    // If not authenticated, redirect to login page
    res.redirect('/login');
  };

module.exports = { isAuthenticated };