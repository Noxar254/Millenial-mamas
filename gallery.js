// Gallery JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    initializeGallery();
    initializeFilters();
    initializeLoadMore();
});

// Gallery Filter Functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(galleryItems, filter);
        });
    });
}

function filterGalleryItems(items, filter) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.classList.add('visible');
            setTimeout(() => {
                item.style.display = 'block';
            }, 50);
        } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Modal Functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
        
        // Add escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize Gallery
function initializeGallery() {
    // Add loading animation to images
    const images = document.querySelectorAll('.gallery-image img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('loaded');
        });
        
        // If image is already cached and loaded
        if (img.complete) {
            img.parentElement.classList.add('loaded');
        }
    });
    
    // Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more content
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // In a real application, you would fetch more data here
                showMessage('More events coming soon! Stay tuned for updates.', 'info');
                this.innerHTML = '<i class="fas fa-plus-circle"></i> Load More Events';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Gallery Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        const image = item.querySelector('.gallery-image img');
        
        item.addEventListener('mouseenter', function() {
            if (overlay) {
                overlay.style.opacity = '1';
            }
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (overlay) {
                overlay.style.opacity = '0';
            }
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add loading states to buttons
function addLoadingState(button, originalText, loadingText = 'Loading...') {
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Image lazy loading fallback for older browsers
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
    
    // Add animation classes for CSS transitions
    const elements = document.querySelectorAll('.gallery-item, .stat-item, .filter-btn');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });
});

// Make functions globally available for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
