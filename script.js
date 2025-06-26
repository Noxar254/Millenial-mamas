// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Enhanced floating animation with mouse interaction
    const floatingElements = document.querySelectorAll('.floating-element');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * 20 * speed;
            const y = (mouseY - 0.5) * 20 * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-content > *');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social media icons animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });

    // Enhanced dropdown hover effects
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        let timeout;

        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                clearTimeout(timeout);
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                }, 10);
            }
        });

        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }, 100);
            }
        });
    });

    // Preloader effect (optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const navbar = document.querySelector('.navbar');
        const heroContent = document.querySelector('.hero-content');
        
        navbar.style.opacity = '1';
        heroContent.style.opacity = '1';
    });

    // Resize handler for responsive behavior
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

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        // Any scroll-based animations can go here
    }, 16)); // 60fps

    // Cool counting animation for impact statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 80; // Smooth animation speed
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / 80;
                    
                    // Add animation class for visual effect
                    counter.style.transform = 'scale(1.1)';
                    counter.style.color = '#ff1493'; // Bright pink during animation
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            const displayValue = Math.floor(current);
                            
                            // Add + sign for certain numbers
                            if (target === 500 || target === 120 || target === 2000) {
                                counter.textContent = displayValue + '+';
                            } else {
                                counter.textContent = displayValue;
                            }
                            
                            setTimeout(updateCounter, stepTime);
                        } else {
                            // Final value with + sign where appropriate
                            if (target === 500 || target === 120 || target === 2000) {
                                counter.textContent = target + '+';
                            } else {
                                counter.textContent = target;
                            }
                            
                            // Reset styles after animation
                            counter.style.transform = 'scale(1)';
                            counter.style.color = '#e91e63'; // Return to original pink
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter); // Stop observing once animation is complete
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Initialize counting animations
    animateCounters();

    // Programs Section Animations
    function initProgramsAnimations() {
        const programCards = document.querySelectorAll('.program-card');
        
        // Intersection Observer for card animations
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation of cards
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initialize cards with hidden state
        programCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });

        // Add enhanced hover effects
        programCards.forEach(card => {
            const icon = card.querySelector('.program-icon');
            const features = card.querySelectorAll('.program-features li');
            
            card.addEventListener('mouseenter', () => {
                // Animate features list
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(5px)';
                        feature.style.transition = 'transform 0.2s ease';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset features list
                features.forEach(feature => {
                    feature.style.transform = 'translateX(0)';
                });
            });
        });

        // Smooth scroll for program CTAs
        const programCTAs = document.querySelectorAll('.program-cta');
        programCTAs.forEach(cta => {
            cta.addEventListener('click', (e) => {
                // Add click ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                cta.style.position = 'relative';
                cta.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Initialize programs animations
    initProgramsAnimations();

    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .program-features li {
            transition: transform 0.2s ease, color 0.3s ease;
        }
        
        .programs-grid {
            perspective: 1000px;
        }
        
        .program-card {
            transform-style: preserve-3d;
        }
    `;
    document.head.appendChild(style);

    console.log('Millennial Mamas website loaded successfully! 🎉');

    // Resource Cards Dynamic Scroll Indicators
    function initDynamicScrollIndicators() {
        const scrollContainers = document.querySelectorAll('[data-scroll-container]');
        
        scrollContainers.forEach(container => {
            const indicator = container.parentElement.querySelector('.scroll-indicator');
            if (!indicator) return;
            
            let lastScrollLeft = 0;
            let hideTimeout;
            let isInteracting = false;
            
            // Check if scrolling is possible
            function canScroll() {
                return container.scrollWidth > container.clientWidth;
            }
            
            // Update indicator position and visibility
            function updateIndicator(scrollDirection = null) {
                if (window.innerWidth >= 1024 || !canScroll()) {
                    indicator.style.display = 'none';
                    return;
                }
                
                const scrollLeft = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                // Show indicator
                indicator.style.display = 'flex';
                indicator.classList.remove('fade-out');
                
                // Determine direction and position
                if (scrollDirection === 'right' || (scrollDirection === null && scrollLeft < maxScroll * 0.5)) {
                    // Show right arrow
                    indicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    indicator.classList.remove('left');
                    indicator.classList.add('right');
                } else {
                    // Show left arrow
                    indicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
                    indicator.classList.remove('right');
                    indicator.classList.add('left');
                }
                
                // Auto-hide after delay
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    if (!isInteracting) {
                        indicator.classList.add('fade-out');
                    }
                }, 2000);
            }
            
            // Handle scroll events
            container.addEventListener('scroll', function() {
                const currentScrollLeft = container.scrollLeft;
                const direction = currentScrollLeft > lastScrollLeft ? 'right' : 'left';
                
                updateIndicator(direction);
                lastScrollLeft = currentScrollLeft;
            });
            
            // Handle touch events
            container.addEventListener('touchstart', function() {
                isInteracting = true;
                updateIndicator();
            });
            
            container.addEventListener('touchend', function() {
                isInteracting = false;
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    indicator.classList.add('fade-out');
                }, 1500);
            });
            
            // Handle mouse events (for desktop testing)
            container.addEventListener('mouseenter', function() {
                if (window.innerWidth < 1024) {
                    isInteracting = true;
                    updateIndicator();
                }
            });
            
            container.addEventListener('mouseleave', function() {
                if (window.innerWidth < 1024) {
                    isInteracting = false;
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        indicator.classList.add('fade-out');
                    }, 1000);
                }
            });
            
            // Initial setup
            setTimeout(() => {
                updateIndicator();
                // Auto-hide after initial display
                setTimeout(() => {
                    if (!isInteracting) {
                        indicator.classList.add('fade-out');
                    }
                }, 3000);
            }, 500);
        });
    }
    
    // Initialize dynamic scroll indicators
    initDynamicScrollIndicators();
    
    // Reinitialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initDynamicScrollIndicators, 250);
    });
    
    // Newsletter subscription functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate subscription process
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailInput.value = '';
                showNotification('Thank you for subscribing! Welcome to our community.', 'success');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Notification system for newsletter
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
});
