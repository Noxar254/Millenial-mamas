// Highlights Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeFilterTabs();
    initializePlayButtons();
    initializeAnimations();
    console.log('Highlights page loaded successfully');
});

// Filter functionality
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    console.log(`Found ${filterTabs.length} filter tabs and ${highlightCards.length} highlight cards`);

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            console.log(`Filtering by: ${filter}`);
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter cards with improved logic
            filterCards(filter, highlightCards);
        });
    });
    
    // Initialize with all cards visible
    filterCards('all', highlightCards);
}

function filterCards(filter, cards) {
    // Clear any existing timeouts
    cards.forEach(card => {
        if (card.timeoutId) {
            clearTimeout(card.timeoutId);
        }
    });
    
    let visibleCount = 0;
    
    cards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            visibleCount++;
            // Show card
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in with staggered delay
            card.timeoutId = setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50 + 100);
        } else {
            // Hide card
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            card.timeoutId = setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    console.log(`Showing ${visibleCount} cards for filter: ${filter}`);
    
    // Show message if no cards found
    showFilterMessage(filter, visibleCount);
}

function showFilterMessage(filter, count) {
    // Remove existing message
    const existingMessage = document.querySelector('.filter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (count === 0) {
        const message = document.createElement('div');
        message.className = 'filter-message';
        message.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>No highlights found for "${filter}". Try selecting a different filter.</p>
            </div>
        `;
        
        const grid = document.querySelector('.highlights-grid');
        grid.appendChild(message);
    }
}

// Play button functionality
function initializePlayButtons() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Get the video card
            const videoCard = this.closest('.highlight-card');
            const title = videoCard.querySelector('.highlight-title').textContent;
            
            // For now, show an alert - in a real implementation, this would open a video modal
            showVideoModal(title);
        });
    });
}

// Video modal functionality (placeholder)
function showVideoModal(title) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal">
            <div class="video-modal-header">
                <h3>${title}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video player would be embedded here</p>
                    <p class="video-note">In a real implementation, this would contain the actual video player (YouTube, Vimeo, etc.)</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Close video modal
window.closeVideoModal = function() {
    const modal = document.querySelector('.video-modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.video-modal').style.transform = 'translateY(-50px) scale(0.9)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
};

// Initialize scroll animations
function initializeAnimations() {
    const cards = document.querySelectorAll('.highlight-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide cards and set up animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Featured highlight functionality
document.addEventListener('DOMContentLoaded', function() {
    const featuredPlayBtn = document.querySelector('.featured-card .play-btn');
    
    if (featuredPlayBtn) {
        featuredPlayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showVideoModal('Millennial Mamas Annual Gala 2025 - Full Highlights');
        });
    }
    
    // Featured action buttons
    const watchHighlightsBtn = document.querySelector('.featured-actions .btn-primary');
    const viewGalleryBtn = document.querySelector('.featured-actions .btn-secondary');
    
    if (watchHighlightsBtn) {
        watchHighlightsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showVideoModal('Annual Gala 2025 - Complete Event Highlights');
        });
    }
    
    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to the gallery page
            window.location.href = 'gallery.html';
        });
    }
    
    // Add click handlers for all highlight links
    const highlightLinks = document.querySelectorAll('.highlight-link');
    highlightLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.highlight-card');
            const title = card.querySelector('.highlight-title').textContent;
            const category = card.getAttribute('data-category');
            
            handleHighlightClick(category, title, this);
        });
    });
});

// Handle different types of highlight clicks
function handleHighlightClick(category, title, element) {
    const linkText = element.textContent.toLowerCase();
    
    switch(category) {
        case 'videos':
            if (linkText.includes('watch') || linkText.includes('listen') || linkText.includes('subscribe')) {
                showVideoModal(title);
            }
            break;
        case 'stories':
            if (linkText.includes('read')) {
                showStoryModal(title);
            }
            break;
        case 'events':
            showEventDetailsModal(title);
            break;
        case 'upcoming':
            if (linkText.includes('register')) {
                showRegistrationModal(title);
            } else if (linkText.includes('join')) {
                showJoinEventModal(title);
            }
            break;
        default:
            showGenericModal(title);
    }
}

// Show gallery modal
function showGalleryModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal gallery-modal">
            <div class="video-modal-header">
                <h3>Annual Gala 2025 - Photo Gallery</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <img src="images/community.jpg" alt="Gala moment 1">
                    </div>
                    <div class="gallery-item">
                        <img src="images/mental health.jpg" alt="Gala moment 2">
                    </div>
                    <div class="gallery-item">
                        <img src="images/hangout.jpg" alt="Gala moment 3">
                    </div>
                    <div class="gallery-item">
                        <img src="images/our story.jpg" alt="Gala moment 4">
                    </div>
                </div>
                <p class="gallery-note">Sample gallery layout - in a real implementation, this would show actual event photos</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Show story modal
function showStoryModal(title) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal story-modal">
            <div class="video-modal-header">
                <h3>${title}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="story-content">
                    <div class="story-image">
                        <img src="images/salome.png" alt="Success story">
                    </div>
                    <div class="story-text">
                        <p>This is where the full success story would be displayed. In a real implementation, this content would be dynamically loaded based on the selected story.</p>
                        <blockquote>"The support I received from Millennial Mamas changed my life completely. I went from struggling to make ends meet to running a successful business that now employs 10 people."</blockquote>
                        <p>Success stories inspire and motivate other mothers in our community to pursue their dreams and overcome challenges.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Show event details modal
function showEventDetailsModal(title) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal event-modal">
            <div class="video-modal-header">
                <h3>${title}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="event-details">
                    <div class="event-summary">
                        <h4>Event Overview</h4>
                        <p>Detailed information about this past event would be shown here, including photos, testimonials, and impact metrics.</p>
                    </div>
                    <div class="event-impact">
                        <h4>Impact & Results</h4>
                        <div class="impact-stats">
                            <div class="impact-stat">
                                <span class="stat-number">85</span>
                                <span class="stat-label">Participants</span>
                            </div>
                            <div class="impact-stat">
                                <span class="stat-number">95%</span>
                                <span class="stat-label">Satisfaction Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Show registration modal for upcoming events
function showRegistrationModal(title) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal registration-modal">
            <div class="video-modal-header">
                <h3>Register for ${title}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="registration-form">
                    <p>To register for this event, please provide your information below:</p>
                    <form class="modal-form">
                        <div class="form-group">
                            <label for="reg-name">Full Name</label>
                            <input type="text" id="reg-name" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-email">Email Address</label>
                            <input type="email" id="reg-email" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-phone">Phone Number</label>
                            <input type="tel" id="reg-phone" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Complete Registration</button>
                    </form>
                    <p class="form-note">In a real implementation, this would submit to your registration system.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Show join event modal
function showJoinEventModal(title) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal join-modal">
            <div class="video-modal-header">
                <h3>Join ${title}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="join-content">
                    <h4>Event Details</h4>
                    <p>We're excited to have you join us for this upcoming event!</p>
                    <div class="event-info">
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <span>Date: July 20, 2025</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>Time: 10:00 AM - 4:00 PM</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Location: Community Center</span>
                        </div>
                    </div>
                    <div class="join-actions">
                        <button class="btn btn-primary" onclick="alert('Registration confirmed!')">Confirm Attendance</button>
                        <button class="btn btn-secondary" onclick="alert('Event added to calendar!')">Add to Calendar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Generic modal for other content
function showGenericModal(title) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="video-modal">
            <div class="video-modal-header">
                <h3>${title}</h3>
                <button class="video-modal-close" onclick="closeVideoModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-modal-content">
                <div class="generic-content">
                    <p>Detailed content for "${title}" would be displayed here in a real implementation.</p>
                    <p>This could include photos, videos, documents, or other relevant information.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalOverlay.querySelector('.video-modal').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation for external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto"], a[href$=".html"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            // Restore after a short delay (in real implementation, this would be handled by page load)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });
});
