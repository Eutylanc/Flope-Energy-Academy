
// middleware/authMiddleware.js
const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.user) {
      return next();
    }
    // If not authenticated, redirect to login page
    res.redirect('/login');
  };
  // Middleware to check if a user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { // Assumes you have passport.js configured
      return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated
}

module.exports = { isAuthenticated, checkAuthenticated };