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

// ---------------------- COPYRIGHT YEAR ----------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();