document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const printBtn = document.getElementById('print-btn');
    const printBtnBottom = document.getElementById('print-btn-bottom');
    const body = document.body;

    const handlePrint = (e) => {
        e.preventDefault();
        
        const element = document.querySelector('.resume-container');
        const isDark = body.classList.contains('dark-theme');
        
        // Force light theme for PDF generation to look professional
        if (isDark) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
        
        const opt = {
            margin:       [10, 10, 10, 10],
            filename:     'Diaa_Mohamed_CV.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save().then(() => {
            if (isDark) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
            }
        });
    };

    if (printBtn) {
        printBtn.addEventListener('click', handlePrint);
    }
    if (printBtnBottom) {
        printBtnBottom.addEventListener('click', handlePrint);
    }

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
