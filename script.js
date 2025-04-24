function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}