// Wall of Fame Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Add interactive features to fame cards
    const fameCards = document.querySelectorAll('.fame-card');
    const wallOfFameScroll = document.querySelector('.wall-of-fame-scroll');
    
    // Enhanced card interactions with green theme
    fameCards.forEach((card, index) => {
        
        // Add green accent on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.2)';
            this.style.borderTop = '3px solid #22c55e';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            this.style.borderTop = 'none';
        });
        
        // Add click animation with green pulse effect
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(34, 197, 94, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add green glow effect
            this.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.4)';
            setTimeout(() => {
                this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }, 300);
        });
        
        // Enhanced button styling with green theme
        const fameBtn = card.querySelector('.fame-btn');
        if (fameBtn) {
            fameBtn.style.cssText = `
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 600;
                transition: all 0.3s ease;
                cursor: pointer;
                font-size: 10px;
                display: inline-flex;
                align-items: center;
                gap: 4px;
            `;
            
            fameBtn.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
            });
            
            fameBtn.addEventListener('mouseleave', function() {
                this.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        }
        
        // Add green accent to title on mobile
        const fameTitle = card.querySelector('.fame-title');
        if (fameTitle) {
            fameTitle.addEventListener('mouseenter', function() {
                this.style.color = '#22c55e';
                this.style.transition = 'color 0.3s ease';
            });
            
            fameTitle.addEventListener('mouseleave', function() {
                this.style.color = '#1a365d';
            });
        }
    });
    
    // Add CSS animation keyframes for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Mobile-specific green enhancements */
        @media (max-width: 480px) {
            .fame-card:hover {
                border-left: 4px solid #22c55e !important;
            }
            
            .fame-card.active {
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, rgba(255, 255, 255, 1) 100%) !important;
                border-left: 4px solid #22c55e !important;
            }
            
            .wall-of-fame-scroll {
                scroll-snap-type: x mandatory;
            }
            
            .fame-card {
                scroll-snap-align: start;
            }
        }
        
        /* Enhanced mobile interactions */
        .fame-card.touched {
            background: rgba(34, 197, 94, 0.05) !important;
            transform: scale(1.02) !important;
            transition: all 0.2s ease !important;
        }
        
        /* Green progress indicator for scroll */
        .scroll-progress {
            position: absolute;
            bottom: -2px;
            left: 0;
            height: 2px;
            background: #22c55e;
            transition: width 0.3s ease;
            z-index: 10;
        }
    `;
    document.head.appendChild(style);
    
    // Mobile touch interactions
    if (window.innerWidth <= 480) {
        fameCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touched');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touched');
                }, 200);
            });
        });
        
        // Add scroll progress indicator
        if (wallOfFameScroll) {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            wallOfFameScroll.parentElement.style.position = 'relative';
            wallOfFameScroll.parentElement.appendChild(progressBar);
            
            wallOfFameScroll.addEventListener('scroll', function() {
                const scrollLeft = this.scrollLeft;
                const scrollWidth = this.scrollWidth - this.clientWidth;
                const progress = (scrollLeft / scrollWidth) * 100;
                progressBar.style.width = `${progress}%`;
            });
        }
    }
    
    // Add intersection observer for card animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Add green accent when card comes into view
                setTimeout(() => {
                    entry.target.style.borderLeft = '2px solid #22c55e';
                }, 300);
            }
        });
    }, observerOptions);
    
    // Initially hide cards for animation
    fameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
        
        // Stagger the animation
        setTimeout(() => {
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`;
        }, 100);
    });
    
    // Auto-scroll hint for mobile users
    if (window.innerWidth <= 480 && wallOfFameScroll) {
        setTimeout(() => {
            wallOfFameScroll.scrollLeft = 50;
            setTimeout(() => {
                wallOfFameScroll.scrollLeft = 0;
            }, 800);
        }, 1000);
    }
    
    // Green themed success message for interactions
    function showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
    
    // Add click handlers for "Read Story" buttons
    document.querySelectorAll('.fame-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Check if this button has an onclick attribute (like Salome's story)
            if (this.hasAttribute('onclick')) {
                return; // Let the onclick handler handle it
            }
            
            e.preventDefault();
            showSuccessMessage('🌟 Story loading... Stay tuned for inspiration!');
        });
    });
    
    console.log('🌿 Wall of Fame enhanced with interactive green features!');
});
