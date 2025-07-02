// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');

    console.log('Mobile toggle element:', mobileToggle);
    console.log('Nav menu element:', navMenu);
    console.log('Dropdowns found:', dropdowns.length);

    // Check if elements exist
    if (!mobileToggle) {
        console.error('Mobile toggle button not found!');
        return;
    }
    
    if (!navMenu) {
        console.error('Nav menu not found!');
        return;
    }

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function(e) {
        console.log('Mobile toggle clicked!');
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle('active');
        console.log('Nav menu active class:', navMenu.classList.contains('active'));
        
        // Animate hamburger menu
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            console.log('Menu opening...');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            console.log('Menu closing...');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu) {
            link.addEventListener('click', function(e) {
                console.log('Dropdown link clicked, window width:', window.innerWidth);
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Toggling dropdown active state');
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Reset hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    console.log('Mobile menu initialization complete!');
});
