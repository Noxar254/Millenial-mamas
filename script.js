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
    
    // Merchandise Slider Navigation
    function initMerchandiseSlider() {
        const merchandiseSlider = document.querySelector('.merchandise-slider');
        const prevButton = document.querySelector('.slider-prev');
        const nextButton = document.querySelector('.slider-next');
        
        if (merchandiseSlider && prevButton && nextButton) {
            const cardWidth = 275; // Card width + gap
            
            // Function to update button visibility
            function updateButtonVisibility() {
                const scrollLeft = merchandiseSlider.scrollLeft;
                const scrollWidth = merchandiseSlider.scrollWidth;
                const clientWidth = merchandiseSlider.clientWidth;
                
                // Check if content overflows (needs scrolling)
                const hasOverflow = scrollWidth > clientWidth;
                
                if (!hasOverflow) {
                    // Hide both buttons if no overflow
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'none';
                    return;
                }
                
                // Show/hide previous button
                if (scrollLeft <= 5) { // Small threshold to account for rounding
                    prevButton.style.display = 'none';
                } else {
                    prevButton.style.display = 'flex';
                }
                
                // Show/hide next button
                if (scrollLeft >= scrollWidth - clientWidth - 5) { // Small threshold
                    nextButton.style.display = 'none';
                } else {
                    nextButton.style.display = 'flex';
                }
            }
            
            // Initial button visibility check
            setTimeout(updateButtonVisibility, 100); // Small delay to ensure layout is complete
            
            // Update button visibility on scroll
            merchandiseSlider.addEventListener('scroll', updateButtonVisibility);
            
            // Update button visibility on window resize
            window.addEventListener('resize', () => {
                setTimeout(updateButtonVisibility, 100);
            });
            
            // Smooth scrolling with button updates
            prevButton.addEventListener('click', function() {
                merchandiseSlider.scrollBy({
                    left: -cardWidth,
                    behavior: 'smooth'
                });
                // Update buttons after scroll animation
                setTimeout(updateButtonVisibility, 300);
            });
            
            nextButton.addEventListener('click', function() {
                merchandiseSlider.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
                // Update buttons after scroll animation
                setTimeout(updateButtonVisibility, 300);
            });
            
            // Quick View Button Functionality
            const quickViewButtons = document.querySelectorAll('.btn-quick-view');
            quickViewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    const productImage = productCard.querySelector('.product-image img').src;
                    
                    openQuickViewModal(productTitle, productPrice, productImage);
                });
            });
            
            // Buy Now Button Functionality
            const buyNowButtons = document.querySelectorAll('.btn-buy-now');
            buyNowButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    
                    // Show added to cart message
                    showAddToCartMessage(productTitle, productPrice);
                });
            });
        }
    }
    
    // Quick View Modal
    function openQuickViewModal(title, price, imageSrc) {
        // Remove any existing modals
        const existingModal = document.querySelector('.quick-view-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="product-quick-view">
                        <div class="product-quick-image">
                            <img src="${imageSrc}" alt="${title}">
                        </div>
                        <div class="product-quick-details">
                            <h3 class="product-quick-title">${title}</h3>
                            <p class="product-quick-price">${price}</p>
                            <div class="product-quick-colors">
                                <span class="color-dot color-green" data-color="Green"></span>
                                <span class="color-dot color-pink" data-color="Pink"></span>
                                <span class="color-dot color-black" data-color="Black"></span>
                            </div>
                            <div class="product-quick-description">
                                <p>This high-quality ${title.toLowerCase()} showcases your support for the Millennial Mamas community. Made with durable and eco-friendly materials, it's perfect for everyday use while spreading awareness for our cause.</p>
                            </div>
                            <div class="product-quick-quantity">
                                <label>Quantity:</label>
                                <div class="quantity-selector">
                                    <button class="quantity-decrease">-</button>
                                    <input type="number" value="1" min="1" max="10">
                                    <button class="quantity-increase">+</button>
                                </div>
                            </div>
                            <div class="product-quick-actions">
                                <button class="btn-add-to-cart">Add to Cart</button>
                                <button class="btn-buy-now-modal">Buy Now</button>
                            </div>
                            <div class="product-quick-meta">
                                <p>All proceeds support our programs for mothers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to the DOM
        document.body.appendChild(modal);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Close modal events
        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Quantity selector functionality
        const quantityInput = modal.querySelector('.quantity-selector input');
        const decreaseBtn = modal.querySelector('.quantity-decrease');
        const increaseBtn = modal.querySelector('.quantity-increase');
        
        decreaseBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            if (quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
        
        // Color selector functionality
        const colorDots = modal.querySelectorAll('.color-dot');
        colorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                colorDots.forEach(d => d.classList.remove('selected'));
                dot.classList.add('selected');
            });
        });
        
        // Add to cart button
        const addToCartBtn = modal.querySelector('.btn-add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            const quantity = quantityInput.value;
            const selectedColor = modal.querySelector('.color-dot.selected')?.getAttribute('data-color') || 'Green';
            
            showAddToCartMessage(title, price, quantity, selectedColor);
            modal.remove();
            document.body.style.overflow = '';
        });
        
        // Buy now button
        const buyNowBtn = modal.querySelector('.btn-buy-now-modal');
        buyNowBtn.addEventListener('click', () => {
            alert(`Processing purchase for ${title}. You'll be redirected to checkout in a real implementation.`);
            modal.remove();
            document.body.style.overflow = '';
        });
        
        // Select first color by default
        colorDots[0].classList.add('selected');
    }
    
    // Add to Cart Message
    function showAddToCartMessage(title, price, quantity = 1, color = 'Green') {
        // Create cart notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <i class="fas fa-check-circle"></i>
                <div class="cart-notification-text">
                    <p class="cart-notification-title">${title} added to cart!</p>
                    <p class="cart-notification-details">${quantity} × ${price} (${color})</p>
                </div>
                <button class="cart-notification-close">&times;</button>
            </div>
            <div class="cart-notification-actions">
                <button class="btn-view-cart">View Cart</button>
                <button class="btn-checkout">Checkout</button>
            </div>
        `;
        
        // Add notification to the DOM
        document.body.appendChild(notification);
        
        // Animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.cart-notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // View Cart button
        notification.querySelector('.btn-view-cart').addEventListener('click', () => {
            alert('Cart page would open here in a real implementation.');
            notification.remove();
        });
        
        // Checkout button
        notification.querySelector('.btn-checkout').addEventListener('click', () => {
            alert('Checkout process would start here in a real implementation.');
            notification.remove();
        });
    }
    
    // Initialize the merchandise slider functionality
    document.addEventListener('DOMContentLoaded', function() {
        initMerchandiseSlider();
        initTestimonialsSection();
    });
    
    // Also initialize after window loads as a fallback
    window.addEventListener('load', function() {
        initMerchandiseSlider();
        initTestimonialsSection();
    });

    // Testimonials Section Functionality
    function initTestimonialsSection() {
        const testimonialsSlider = document.querySelector('.testimonials-slider');
        if (testimonialsSlider) {
            // Clone testimonials for seamless loop
            const testimonials = testimonialsSlider.children;
            const testimonialCount = testimonials.length;
            
            // Clone all testimonials and append them for seamless scrolling
            for (let i = 0; i < testimonialCount; i++) {
                const clone = testimonials[i].cloneNode(true);
                testimonialsSlider.appendChild(clone);
            }
            
            // Add interaction effects
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            testimonialCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Add click to pause/resume functionality
            testimonialsSlider.addEventListener('click', function() {
                if (this.style.animationPlayState === 'paused') {
                    this.style.animationPlayState = 'running';
                } else {
                    this.style.animationPlayState = 'paused';
                }
            });
        }
    }

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

    // Initialize founders section functionality
    initFoundersSection();

    // Founders Section Interactive Functionality
    function initFoundersSection() {
        // Animate founder cards on scroll
        const founderCards = document.querySelectorAll('.founder-card');
        const teamStats = document.querySelectorAll('.team-stat-number');
        const boardHighlights = document.querySelectorAll('.board-highlight');
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe founder cards
        founderCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(card);
        });
        
        // Enhanced hover effects for founder cards
        founderCards.forEach(card => {
            const founderImage = card.querySelector('.founder-image img');
            const founderBadge = card.querySelector('.founder-badge');
            const highlightTags = card.querySelectorAll('.highlight-tag');
            
            card.addEventListener('mouseenter', () => {
                // Enhanced image scaling
                founderImage.style.transform = 'scale(1.1)';
                founderBadge.style.transform = 'scale(1.1) rotate(5deg)';
                
                // Animate highlight tags
                highlightTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-3px)';
                        tag.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }, index * 100);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                founderImage.style.transform = 'scale(1.05)';
                founderBadge.style.transform = 'scale(1) rotate(0deg)';
                
                highlightTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.boxShadow = 'none';
                });
            });
        });
        
        // Animated counter for team stats
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        teamStats.forEach(stat => {
            statsObserver.observe(stat);
        });
        
        // Board highlights interactive effects
        boardHighlights.forEach((highlight, index) => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateX(-20px)';
            highlight.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const highlightObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        highlightObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            highlightObserver.observe(highlight);
            
            // Add hover pulse effect
            highlight.addEventListener('mouseenter', () => {
                const icon = highlight.querySelector('i');
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            highlight.addEventListener('mouseleave', () => {
                const icon = highlight.querySelector('i');
                icon.style.transform = 'scale(1)';
            });
        });
        
        // Team stats hover effects
        const teamStatItems = document.querySelectorAll('.team-stat-item');
        teamStatItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const number = item.querySelector('.team-stat-number');
                number.style.transform = 'scale(1.1)';
                number.style.color = '#ec4899';
                item.style.backgroundColor = '#f8fafc';
                item.style.borderRadius = '12px';
                item.style.padding = '20px';
                item.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                const number = item.querySelector('.team-stat-number');
                number.style.transform = 'scale(1)';
                number.style.color = '#22c55e';
                item.style.backgroundColor = 'transparent';
                item.style.padding = '15px';
            });
        });
        
        // View All Leadership button enhanced interaction
        const leadershipBtn = document.querySelector('.board-cta .btn');
        if (leadershipBtn) {
            leadershipBtn.addEventListener('mouseenter', () => {
                leadershipBtn.style.transform = 'translateY(-2px)';
                leadershipBtn.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
            });
            
            leadershipBtn.addEventListener('mouseleave', () => {
                leadershipBtn.style.transform = 'translateY(0)';
                leadershipBtn.style.boxShadow = 'none';
            });
            
            leadershipBtn.addEventListener('click', (e) => {
                // Add click ripple effect
                createRippleEffect(e, leadershipBtn);
            });
        }
    }

    // Counter animation function
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'k';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Ripple effect function
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // CSS animation styles (added dynamically)
    const foundersAnimationStyles = `
        .founder-card.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .board-highlight.animate-in {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .highlight-tag {
            transition: all 0.3s ease !important;
        }
        
        .team-stat-item {
            transition: all 0.3s ease !important;
            cursor: pointer;
        }
        
        .founder-badge {
            transition: all 0.3s ease !important;
        }
    `;

    // Add styles to head
    if (!document.querySelector('#founders-animations')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'founders-animations';
        styleSheet.textContent = foundersAnimationStyles;
        document.head.appendChild(styleSheet);
    }
});
