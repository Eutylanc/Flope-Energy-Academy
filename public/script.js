document.getElementById('enrollBtn').addEventListener('click', function() {
   window.location.href = '/courses';  
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
       const response = await fetch('/get-username');
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


 function redirectToCourse(courseSlug) {
   window.location.href = `/course-details/${courseSlug}`;
 }
  // JavaScript functions to handle button actions
  function learnMore(courseName) {
   alert(`Learn more about ${courseName}`);
   // Redirect to a course details page (replace with the actual URL)
   window.location.href = `/courses/details?name=${encodeURIComponent(courseName)}`;
 }

 function continueCourse(courseName) {
   alert(`Continue your course: ${courseName}`);
   // Redirect to the course continuation page
   window.location.href = `/courses/continue?name=${encodeURIComponent(courseName)}`;
 }

 function revisitCourse(courseName) {
   alert(`Revisit your previous course: ${courseName}`);
   // Redirect to the course review page
   window.location.href = `/courses/revisit?name=${encodeURIComponent(courseName)}`;
 }

// Basic script for client-side functionality
document.addEventListener('DOMContentLoaded', () => {
   // Add any event listeners or functionality you want to implement here
   console.log('Course details page script loaded');

   // Example: Form validation before submission
   const form = document.querySelector('form');
   form.addEventListener('submit', (e) => {
       const courseName = document.getElementById('courseName').value;
       if (courseName.trim() === '') {
           alert('Course Name is required');
           e.preventDefault(); // Prevent form submission if validation fails
       }
   });
});


 function showModal(courseName) {
   // Set the modal title and content based on the selected course
   document.getElementById('modalTitle').textContent = 'Continue to' + courseName;
   document.getElementById('modalContent').textContent = 'Are you sure you want to Continue to the ' + courseName + ' course?';
   
   // Show the modal
   document.getElementById('courseModal').style.display = 'flex';
}

function closeModal() {
   // Hide the modal
   document.getElementById('courseModal').style.display = 'none';
}

function continueCourse() {
   // Get the course name from the modal title
   var courseName = document.getElementById('modalTitle').textContent.replace('Continue to ', '');
   
   // Define a mapping of course names to URLs
   var courseUrls = {
       'Financial Management': 'financial-management',
       'Cyber Security': 'cyber-security',
       'Video Editing': 'video-editing'
   };

   // Get the URL based on the selected course
   var url = courseUrls[courseName];
   if (url) {
       window.location.href = url; // Redirect to the course page
   }

   // Close the modal after redirection
   closeModal();
}

function showModal(courseId, courseName) {
   // Set the modal title and content based on the selected course
   document.getElementById('modalTitle').textContent = 'Revisit ' + courseName;
   document.getElementById('modalContent').textContent = 'Are you sure you want to revisit the ' + courseName + ' course?';
   
   // Show the modal
   document.getElementById('courseModal').style.display = 'flex';
}

function closeModal() {
   // Hide the modal
   document.getElementById('courseModal').style.display = 'none';
}

function revisitCourse() {
   // Get the course name from the modal title
   var courseName = document.getElementById('modalTitle').textContent.replace('Revisit ', '');
   
   // Define a mapping of course names to URLs
   var courseUrls = {
       'C Programming': 'c-programming',
       'Data Analysis': 'data-analysis',
       'Data Science': 'data-science'
   };

   // Get the URL based on the selected course
   var url = courseUrls[courseName];
   if (url) {
       window.location.href = url; // Redirect to the course page
   }

   // Close the modal after redirection
   closeModal();
}
 
// Open modals
function openWebDevModal() {
   document.getElementById("webDevModal").style.display = "block";
 }

 function openPythonModal() {
   document.getElementById("pythonModal").style.display = "block";
 }

 function openDigitalMarketingModal() {
   document.getElementById("digitalMarketingModal").style.display = "block";
 }

 // Close modals
 function closeWebDevModal() {
   document.getElementById("webDevModal").style.display = "none";
 }

 function closePythonModal() {
   document.getElementById("pythonModal").style.display = "none";
 }

 function closeDigitalMarketingModal() {
   document.getElementById("digitalMarketingModal").style.display = "none";
 }

 // Redirect to course page
 function redirectToCourse(courseName) {
   // Redirect user to the respective course URL
   window.location.href = "courses/" + courseName; // Replace with actual course URLs
 }

 