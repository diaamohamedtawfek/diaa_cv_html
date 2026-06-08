document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const printBtn = document.getElementById('print-btn');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        updateThemeIcon(true);
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        updateThemeIcon(false);
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon(false);
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon(true);
        }
    });



    // Function to update the button icon and text
    function updateThemeIcon(isDark) {
        const icon = themeToggleBtn.querySelector('i');
        const text = themeToggleBtn.querySelector('span');
        
        if (isDark) {
            icon.className = 'fa-solid fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fa-solid fa-moon';
            text.textContent = 'Dark Mode';
        }
    }
});
