// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile navigation functionality
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-container');
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav-toggle';
        mobileNav.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.appendChild(mobileNav);
        
        mobileNav.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
            mobileNav.innerHTML = navLinks.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };

    // Check if we're on mobile and create mobile nav
    if (window.innerWidth <= 768) {
        createMobileNav();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const mobileNav = document.querySelector('.mobile-nav-toggle');
        if (window.innerWidth <= 768 && !mobileNav) {
            createMobileNav();
        } else if (window.innerWidth > 768 && mobileNav) {
            mobileNav.remove();
            document.querySelector('.nav-links').classList.remove('show');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to roadmap cards
    const cards = document.querySelectorAll('.roadmap-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = 'var(--hover-shadow)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const mobileNav = document.querySelector('.mobile-nav-toggle');
        
        if (navLinks && navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !mobileNav.contains(e.target)) {
            navLinks.classList.remove('show');
            mobileNav.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Add active class to current navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.querySelector('.theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle dropdown
    themeToggle.addEventListener('click', () => {
        themeDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
            themeDropdown.classList.remove('show');
        }
    });
    
    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeDropdown.classList.remove('show');
        });
    });
});
    