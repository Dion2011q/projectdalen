// ---------------------- THEMA EN HEADERKLEUR ----------------------
function updateThemeColor() {
    // Haal de actuele headerkleur uit de CSS-variabele
    const headerBg = getComputedStyle(document.body).getPropertyValue('--header-bg').trim();

    // Theme color voor Android/Chrome
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', headerBg);

    // Status bar voor iOS
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBar) {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        appleStatusBar.setAttribute('content', isDark ? 'black-translucent' : 'default');
    }
}

// Toggle theme and save preference in localStorage
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeColor();
}

// Load theme from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeColor();
});

// ---------------------- MENU TOGGLE ----------------------
const menuToggle = document.querySelector('.menu-toggle');
const headerUl = document.querySelector('.headerul');

if (menuToggle && headerUl) {
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        headerUl.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!menuToggle.contains(event.target) && !headerUl.contains(event.target)) {
            headerUl.classList.remove('show');
        }
    });
}

// ---------------------- LOGIN/ADMIN ----------------------
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

// ---------------------- COPYRIGHT YEAR ----------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();