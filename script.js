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

    // Support Section JavaScript Functionality
    const supportSection = document.querySelector('.support-section');
    const tierCards = document.querySelectorAll('.tier-card');
    const supportButtons = document.querySelectorAll('.support-btn');
    
    if (supportSection && tierCards.length > 0) {
        // Enhanced tier card interactions
        tierCards.forEach((card, index) => {
            // Staggered animation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 200); // Staggered delay
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(card);
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 20px 50px rgba(233, 30, 99, 0.2)';
                
                // Add glow effect to the border
                this.style.borderColor = '#e91e63';
                this.style.background = 'linear-gradient(135deg, #fff 0%, #fef7f8 100%)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-8px) scale(1)';
                this.style.boxShadow = '0 15px 40px rgba(233, 30, 99, 0.15)';
                this.style.borderColor = '#f3ccd6';
                this.style.background = '#fff';
            });
            
            // Card selection effect
            card.addEventListener('click', function() {
                // Remove selected class from all cards
                tierCards.forEach(c => c.classList.remove('selected'));
                
                // Add selected class to clicked card
                this.classList.add('selected');
                
                // Update button state
                const button = this.querySelector('.support-btn');
                button.style.background = '#2e7d32';
                button.textContent = 'Selected ✓';
                
                // Reset other buttons
                tierCards.forEach(c => {
                    if (c !== this) {
                        const otherButton = c.querySelector('.support-btn');
                        otherButton.style.background = '#2e7d32';
                        const originalTexts = ['Give Support', 'Join the Mission', 'Partner with Us'];
                        otherButton.textContent = originalTexts[Array.from(tierCards).indexOf(c)];
                    }
                });
                
                // Add selection animation
                this.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
        
        // Support button interactions
        supportButtons.forEach((button, index) => {
            const originalTexts = ['Give Support', 'Join the Mission', 'Partner with Us'];
            const amounts = ['$10', '$50', '$100+'];
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Button loading animation
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                this.disabled = true;
                this.style.background = '#666';
                
                // Simulate processing
                setTimeout(() => {
                    // Success state
                    this.innerHTML = '<i class="fas fa-heart"></i> Thank You!';
                    this.style.background = '#2e7d32';
                    
                    // Show success notification
                    showNotification(
                        `Thank you for your ${amounts[index]} donation! Your support helps transform lives.`,
                        'success'
                    );
                    
                    // Reset button after delay
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                        this.style.background = '#2e7d32';
                    }, 3000);
                }, 2000);
            });
            
            // Button hover effects
            button.addEventListener('mouseenter', function() {
                if (!this.disabled) {
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                    this.style.boxShadow = '0 8px 25px rgba(233, 30, 99, 0.3)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.disabled) {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = 'none';
                }
            });
        });
        
        // Add floating animation to tier amounts
        const tierAmounts = document.querySelectorAll('.tier-amount');
        tierAmounts.forEach(amount => {
            amount.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(2deg)';
                this.style.color = '#e91e63';
                this.style.textShadow = '2px 2px 4px rgba(233, 30, 99, 0.3)';
            });
            
            amount.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.color = '#2e7d32';
                this.style.textShadow = '1px 1px 2px rgba(46, 125, 50, 0.1)';
            });
        });
        
        // Custom amount input functionality
        function createCustomAmountModal() {
            const modal = document.createElement('div');
            modal.className = 'custom-amount-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Custom Donation Amount</h3>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Enter your preferred donation amount:</p>
                            <div class="custom-amount-input">
                                <span class="currency-symbol">$</span>
                                <input type="number" id="customAmount" placeholder="25" min="1" step="0.01">
                            </div>
                            <div class="quick-amounts">
                                <button class="quick-amount" data-amount="25">$25</button>
                                <button class="quick-amount" data-amount="75">$75</button>
                                <button class="quick-amount" data-amount="150">$150</button>
                                <button class="quick-amount" data-amount="250">$250</button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn-secondary modal-cancel">Cancel</button>
                            <button class="btn-primary modal-donate">Donate Now</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Modal interactions
            const closeBtn = modal.querySelector('.modal-close');
            const cancelBtn = modal.querySelector('.modal-cancel');
            const donateBtn = modal.querySelector('.modal-donate');
            const customInput = modal.querySelector('#customAmount');
            const quickAmounts = modal.querySelectorAll('.quick-amount');
            
            // Close modal events
            [closeBtn, cancelBtn].forEach(btn => {
                btn.addEventListener('click', () => modal.remove());
            });
            
            modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-overlay')) {
                    modal.remove();
                }
            });
            
            // Quick amount selection
            quickAmounts.forEach(btn => {
                btn.addEventListener('click', () => {
                    customInput.value = btn.dataset.amount;
                    quickAmounts.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
            });
            
            // Donate button
            donateBtn.addEventListener('click', () => {
                const amount = customInput.value;
                if (amount && amount > 0) {
                    modal.remove();
                    showNotification(
                        `Thank you for your $${amount} donation! Your generosity makes a difference.`,
                        'success'
                    );
                } else {
                    showNotification('Please enter a valid donation amount.', 'error');
                }
            });
            
            // Focus input
            customInput.focus();
        }
        
        // Add custom amount link to support section
        const customSupportText = document.querySelector('.custom-support');
        if (customSupportText) {
            customSupportText.innerHTML = `
                Want to support in a unique way? 
                <a href="#" class="custom-amount-link">Choose your amount</a> 
                or contribute what works for you — every effort matters.
            `;
            
            const customLink = customSupportText.querySelector('.custom-amount-link');
            customLink.addEventListener('click', (e) => {
                e.preventDefault();
                createCustomAmountModal();
            });
        }
        
        // Parallax effect for support section background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const supportSectionTop = supportSection.offsetTop;
            const supportSectionHeight = supportSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if support section is in viewport
            if (scrolled + windowHeight > supportSectionTop && scrolled < supportSectionTop + supportSectionHeight) {
                const parallaxSpeed = 0.5;
                const yPos = -(scrolled - supportSectionTop) * parallaxSpeed;
                supportSection.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    }

    // Donation success animation
    function animateDonationSuccess(button) {
        // Create success particles
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'success-particle';
            particle.innerHTML = '<i class="fas fa-heart"></i>';
            
            const rect = button.getBoundingClientRect();
            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i * 60) * Math.PI / 180;
            const distance = 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            particle.style.opacity = '0';
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
});
