function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}


// Mock user data (for demonstration purposes)
const users = [
    { username: "admin", password: "admin123", role: "admin" },
];

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Store user info in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect to admin panel if admin
        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            alert("Access denied. Only admins can access the admin panel.");
        }
    } else {
        document.getElementById("loginError").textContent = "Invalid username or password.";
    }
});

// Display admin username in admin panel
if (window.location.pathname.includes("admin.html")) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.role !== "admin") {
        alert("Unauthorized access. Redirecting to login page.");
        window.location.href = "login.html";
    } else {
        document.getElementById("adminUsername").textContent = loggedInUser.username;
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

const menuToggle = document.querySelector('.menu-toggle');
const headerUl = document.querySelector('.headerul');

menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); 
    headerUl.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !headerUl.contains(event.target)) {
        headerUl.classList.remove('show');
    }
});


// Toggle theme and save preference in localStorage
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme in localStorage
}

// Load theme from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
    document.body.setAttribute('data-theme', savedTheme);
});



// Display the current year in the footer for the copyright notice
document.getElementById('year').textContent = new Date().getFullYear();
