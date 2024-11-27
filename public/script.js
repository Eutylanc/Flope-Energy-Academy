document.querySelector('.sidebar-trigger-zone').addEventListener('mouseenter', () => {
    document.querySelector('.sidebar').classList.add('open');
    document.querySelector('.main-content').classList.add('sidebar-open');
});

document.querySelector('.sidebar').addEventListener('mouseleave', () => {
    document.querySelector('.sidebar').classList.remove('open');
    document.querySelector('.main-content').classList.remove('sidebar-open');
});

document.getElementById('logout-button').addEventListener('click', () => {
    // Confirm with the user
    if (confirm('Are you sure you want to log out?')) {
       // Clear session or token (example)
       sessionStorage.clear();
       localStorage.clear();
 
       // Redirect to the login page or home
       window.location.href = '/login';
    }
 });

 // Fetch username from the server
async function fetchUsername() {
    try {
       // Replace with your actual API endpoint
       const response = await fetch('/api/get-username');
       if (!response.ok) {
          throw new Error('Failed to fetch username');
       }
       const data = await response.json();
       
       // Update the username in the DOM
       document.getElementById('username-display').textContent = data.username || 'Guest';
    } catch (error) {
       console.error('Error fetching username:', error);
       document.getElementById('username-display').textContent = 'Guest'; // Fallback username
    }
 }
 
 // Call the function to load the username when the page loads
 fetchUsername();
 
 // Logout button functionality
 document.getElementById('logout-button').addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
       sessionStorage.clear();
       localStorage.clear();
       window.location.href = '/login';
    }
 });
 
 async function getUserByUsername(username) {
    const connection = await mysql.createConnection(dbConfig);
    try {
       const [rows] = await connection.execute(
          'SELECT * FROM users WHERE username = ?',
          [username]
       );
       return rows[0]; // Return the first user, if found
    } finally {
       await connection.end();
    }
 }

 
